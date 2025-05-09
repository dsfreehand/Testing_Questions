import { mount } from "cypress/react18";
import Quiz from "../../client/src/components/Quiz";
import "@testing-library/cypress/add-commands";

/// <reference types="cypress" />

describe("Quiz Component", () => {
  beforeEach(() => {
    // Intercept the GET request to '/api/questions' and provide mock data from a fixture
    cy.intercept("GET", "/api/questions", { fixture: "mockQuestions.json" }).as(
      "getQuestions"
    );

    // Mount the Quiz component (assuming you are using something like Cypress Component Testing)
    mount(<Quiz />);
  });

  it("loads and displays questions after clicking 'Start Quiz'", () => {
    // Verify the initial state of the quiz (e.g., 'Start Quiz' button should be visible)
    cy.get("button").contains("Start Quiz").should("be.visible");

    // Click the 'Start Quiz' button
    cy.get("button").contains("Start Quiz").click();

    // Wait for the network request to the API endpoint '/api/questions' to finish
    cy.wait("@getQuestions", { timeout: 10000 }).then((interception) => {
      // Log the intercepted request for debugging
      console.log("Intercepted Request:", interception);

      // Verify the request was triggered and the response is correct
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.have.length.greaterThan(0);
    });

    // Verify that the questions are displayed after the API request
    cy.get(".question").should("have.length", 3); // Example: expecting 3 questions from the mock

    // Verify the structure of the first question (adjust selectors as needed)
    cy.get(".question")
      .first()
      .should("contain.text", "What is the capital of France?");
    cy.get(".question").first().find("button").should("have.length", 4); // 4 possible answers
  });

  it("handles no questions from API", () => {
    // Intercept the request with an empty response (no questions)
    cy.intercept("GET", "/api/questions", { body: [] }).as("getQuestions");

    // Click the 'Start Quiz' button
    cy.get("button").contains("Start Quiz").click();

    // Wait for the request and check if the response is empty
    cy.wait("@getQuestions", { timeout: 10000 }).then((interception) => {
      console.log("Intercepted Empty Response:", interception);
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.have.length(0);
    });

    // Verify that an appropriate message is displayed when no questions are returned
    cy.get(".no-questions")
      .should("be.visible")
      .and("contain.text", "No questions available");
  });

  it("handles error in fetching questions", () => {
    // Simulate an error in fetching the questions (e.g., 500 error)
    cy.intercept("GET", "/api/questions", { statusCode: 500 }).as(
      "getQuestions"
    );

    // Click the 'Start Quiz' button
    cy.get("button").contains("Start Quiz").click();

    // Wait for the request and check the error response
    cy.wait("@getQuestions", { timeout: 10000 }).then((interception) => {
      console.log("Intercepted Error Response:", interception);
      expect(interception.response.statusCode).to.eq(500);
    });

    // Verify that an error message is shown
    cy.get(".error-message")
      .should("be.visible")
      .and("contain.text", "Failed to load questions");
  });
});

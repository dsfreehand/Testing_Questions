import "@testing-library/cypress/add-commands";

describe("Quiz App End-to-End", () => {
  beforeEach(() => {
    // Visit the app before each test
    cy.visit("http://localhost:3000");
  });

  it("should start the quiz and display the first question", () => {
    // Click the 'Start Quiz' button
    cy.contains("button", "Start Quiz").click();

    // Check that the first question appears
    cy.contains("What is the capital of France?").should("exist");

    // Check each answer option
    cy.contains("Berlin").should("exist");
    cy.contains("Madrid").should("exist");
    cy.contains("Paris").should("exist");
    cy.contains("Rome").should("exist");
  });

  it("should allow the user to select an answer and proceed to the next question", () => {
    // Start the quiz
    cy.contains("button", "Start Quiz").click();

    // Select an answer
    cy.contains("Paris").click();

    // Click 'Next'
    cy.contains("button", "Next").click();

    // Check that the next question appears
    cy.contains("What is 2 + 2?").should("exist");

    // Check each answer option for the second question
    cy.contains("3").should("exist");
    cy.contains("4").should("exist");
    cy.contains("5").should("exist");
  });
});

import mockQuestions from "../../fixtures/mockQuestions.json";
import type { Question, Answer } from "../types";

// Function to retrieve mock questions from fixtures
export const getMockQuestions = (): Question[] => {
  return mockQuestions.map((question, index) => ({
    ...question,
    _id: `mock-${index}`,
  }));
};

// Function to validate answer selection logic
export const isAnswerCorrect = (
  question: Question,
  answerText: string
): boolean => {
  return question.answers.some(
    (ans: Answer) => ans.text === answerText && ans.isCorrect
  );
};

// Function to generate a mock quiz state for controlled testing
export const createMockQuizState = (): {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  quizCompleted: boolean;
} => {
  return {
    questions: getMockQuestions(),
    currentQuestionIndex: 0,
    score: 0,
    quizCompleted: false,
  };
};

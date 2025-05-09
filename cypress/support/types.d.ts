interface Answer {
  text: string;
  isCorrect: boolean;
}

interface Question {
  _id: string;
  question: string;
  answers: Answer[];
}

interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  quizCompleted: boolean;
}

export type { Question, Answer, QuizState, Quiz };

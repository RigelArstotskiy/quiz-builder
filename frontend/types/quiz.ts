export type QuestionType = 'boolean' | 'input' | 'checkbox';

export interface QuizListItem {
  id: number;
  title: string;
  createdAt: string;
  _count: {
    questions: number;
  };
}

export interface Question {
  id: number;
  type: 'boolean' | 'input' | 'checkbox';
  text: string;
  options: string | null;
}

export interface Quiz {
  id: number;
  title: string;
  createdAt: string;
  questions: Question[];
}

export interface CreateQuestion {
  text: string;
  type: QuestionType;
  options?: string[];
}

export interface CreateQuizForm {
  title: string;
  questions: {
    text: string;
    type: 'boolean' | 'input' | 'checkbox';
    options?: string[];
  }[];
}

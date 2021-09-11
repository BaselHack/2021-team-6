import { Question } from './question.model';

export interface Deck {
  name: string;
  questions: Question[];
}

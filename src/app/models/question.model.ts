import { Answer } from './answer.model';

export interface Question {
  type: string;
  deckIds: number[];
  question: string;
  answer?: Answer;
}

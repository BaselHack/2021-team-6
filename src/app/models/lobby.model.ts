import { Answer } from './answer.model';
import { UserGuess } from './Guess.model';
import { Question } from './question.model';

export interface Lobby {
  public: boolean;
  questions?: Question[];
  answers?: Answer[];
  userGuesses?: UserGuess[];
  state: number;
  index?: number;
  users: User[];
}

export interface User {
  id: string;
  username: string;
  isHost: boolean;
}

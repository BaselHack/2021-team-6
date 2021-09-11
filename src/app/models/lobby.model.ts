import { Question } from './question.model';

export interface Lobby {
  public: boolean;
  questions?: Question[];
  state: number;
  index?: number;
  users: User[];
}

export interface User {
  id: string;
  username: string;
  isHost: boolean;
}

export interface Answer {
  answer: string;
  userID: string;
  guesses?: [{ id: number }];
}

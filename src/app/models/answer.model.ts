export interface Answer {
  answer: string;
  ownerID: string;
  guesses: [{ id: number }];
}

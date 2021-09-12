export interface UserGuess {
  userID: string;
  guesses: { answer: string; userId: string }[];
}

export interface GuessChart {
  answer: string;
  dimensions?: [number, number];
  data: {
    name: string;
    value: number;
    correct?: boolean;
  }[];
  color?: { name: string; value: string }[];
}

export interface UserGuess {
  userID: string;
  guesses:
   { answer: string,
    userId: string}[]

}


export interface GuessChart {
  answer: string;
  data: {
    name: string;
    value: number;
  }[];
}

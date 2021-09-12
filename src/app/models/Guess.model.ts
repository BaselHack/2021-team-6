export interface UserGuess {
  userID: string;
  guesses:
   { answer: string,
    userId: string}[]
  
}

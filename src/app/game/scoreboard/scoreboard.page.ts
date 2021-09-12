import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LobbyService } from '../../services/lobby.service';
import { Lobby } from '../../models/lobby.model';
import { Question } from '../../models/question.model';
import { Subscription } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';
import { GuessChart } from 'src/app/models/Guess.model';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.page.html',
  styleUrls: ['./scoreboard.page.scss'],
})
export class ScoreboardPage implements OnInit, OnDestroy {
  public lobby: Lobby;
  public lobbyCode;
  public questions: Question[];
  public currentQuestion: Question;
  private lobbySubscription: Subscription;
  private dimensions;

  public guessChart: GuessChart[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private lobbyService: LobbyService
  ) {}

  ngOnInit() {
    this.lobbyCode = this.lobbyService.getLobbyCode();
    this.lobbySubscription = this.lobbyService.getLobby().subscribe((lobby) => {
      this.lobby = lobby;
      this.questions = lobby.questions;

      let formattedGuesses = new Map<string, Map<string, number>>();

      this.lobby.userGuesses.forEach(userGuess => {
        console.log(userGuess);
        userGuess.guesses.forEach(guess => {
          let guessChart: GuessChart = this.guessChart.find(x => x.answer === guess.answer);
          if (!guessChart) {
            let newGuessChart: GuessChart = {answer: guess.answer, data: [{name: this.getUsername(guess.userId), value: 1}]}
            this.guessChart.push(newGuessChart);
          } else {
            let guessData = guessChart.data.find(x => x.name === this.getUsername(guess.userId));
            let index = guessChart.data.findIndex(x => x.name === this.getUsername(guess.userId));
            if(!guessData) {
              guessChart.data.push({name: this.getUsername(guess.userId), value: 1});
            } else {
              guessData.value++;
              guessChart.data[index] = guessData;
              console.log('else');
            }
          }
        });
      });
      console.log(this.guessChart);
      formattedGuesses.forEach((userGuess, question) => {
        console.log(question, userGuess);
      })
    });
  }

  getUsername(userID: string) {
    return this.lobby.users?.find((x) => x.id === userID)?.username;
  }

  getDimensions(guess: GuessChart) {
    return [guess.data.length * 50, window.innerWidth];
  }

  ngOnDestroy() {
    this.lobbySubscription.unsubscribe();
  }
}

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
  public guessChart: GuessChart[] = [];
  private lobbySubscription: Subscription;

  constructor(private lobbyService: LobbyService) {}

  ngOnInit() {
    this.lobbyCode = this.lobbyService.getLobbyCode();
    this.lobbySubscription = this.lobbyService.getLobby().subscribe((lobby) => {
      this.lobby = lobby;
      this.questions = lobby.questions;

      const formattedGuesses = new Map<string, Map<string, number>>();

      this.lobby.userGuesses.forEach((userGuess) => {
        console.log(userGuess);
        userGuess.guesses.forEach((guess) => {
          const guessChart: GuessChart = this.guessChart.find(
            (x) => x.answer === guess.answer
          );
          if (!guessChart) {
            const newGuessChart: GuessChart = {
              answer: guess.answer,
              data: [{ name: this.getUsername(guess.userId), value: 1 }],
            };
            this.guessChart.push(newGuessChart);
          } else {
            const guessData = guessChart.data.find(
              (x) => x.name === this.getUsername(guess.userId)
            );
            const index = guessChart.data.findIndex(
              (x) => x.name === this.getUsername(guess.userId)
            );
            if (!guessData) {
              guessChart.data.push({
                name: this.getUsername(guess.userId),
                value: 1,
              });
            } else {
              guessData.value++;
              guessChart.data[index] = guessData;
              console.log('else');
            }
            guessChart.dimensions = this.getDimensions(guessChart);
          }
        });
      });

      formattedGuesses.forEach((userGuess, question) => {
        console.log(question, userGuess);
      });
    });
  }

  barCustomColors(guess) {
    // console.log(guess)
    return [
      // { name: "Phil", value: '#aa0808' },
      { name: 'xx', value: '#aa0808' },
      { name: 'Megi', value: '#07aa08' },
      { name: 'User d', value: '#aa0808' },
      { name: 'User e', value: '#aa0808' },
    ];
  }

  getUsername(userID: string) {
    return this.lobby.users?.find((x) => x.id === userID)?.username;
  }

  getDimensions(guess: GuessChart): [number, number] {
    const chartMargins = 26;
    return [window.innerWidth - 50, guess.data.length * 50 + chartMargins];
  }

  ngOnDestroy() {
    this.lobbySubscription.unsubscribe();
  }
}

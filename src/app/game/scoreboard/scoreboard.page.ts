import { Component, OnDestroy, OnInit } from '@angular/core';
import { LobbyService } from '../../services/lobby.service';
import { Lobby } from '../../models/lobby.model';
import { Question } from '../../models/question.model';
import { Subscription } from 'rxjs';
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
  public barColors;
  private lobbySubscription: Subscription;
  private initialized = false;

  constructor(private lobbyService: LobbyService) {}

  ngOnInit() {
    this.lobbyCode = this.lobbyService.getLobbyCode();
    this.lobbySubscription = this.lobbyService.getLobby().subscribe((lobby) => {
      this.lobby = lobby;
      this.questions = lobby.questions;

      if (!this.initialized) {
        this.initChartdata();
        this.initialized = true;
      }
    });
  }

  initChartdata() {
    this.lobby.userGuesses.forEach((userGuess) => {
      console.log(userGuess);
      userGuess.guesses.forEach((guess) => {
        const guessChart: GuessChart = this.guessChart.find(
          (x) => x.answer === guess.answer
        );

        const answer = this.lobby.answers.find(
          (a) => a.userID === guess.userId
        );
        const correct = answer.answer === guess.answer;

        if (!guessChart) {
          const newGuessChart: GuessChart = {
            answer: guess.answer,
            data: [
              {
                name: this.getUsername(guess.userId),
                value: 1,
                correct,
              },
            ],
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
              correct,
            });
          } else {
            guessData.value++;
            guessChart.data[index] = guessData;
            console.log('else');
          }
          guessChart.dimensions = this.getDimensions(guessChart);
          guessChart.color = this.barCustomColors(guessChart);
        }
      });
    });
  }

  barCustomColors(guess: GuessChart) {
    return guess.data.map((answer) =>
      answer.correct
        ? { name: answer.name, value: '#5ebf2a' }
        : { name: answer.name, value: '#bf2a2a' }
    );
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

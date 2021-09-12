import { Component, OnDestroy, OnInit } from '@angular/core';
import { LobbyService } from '../../services/lobby.service';
import { Lobby, User } from '../../models/lobby.model';
import { Question } from '../../models/question.model';
import { Subscription } from 'rxjs';
import { GuessChart } from 'src/app/models/Guess.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

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
  public user: User;
  private lobbySubscription: Subscription;
  private initialized = false;
  private index;

  constructor(
    private lobbyService: LobbyService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.lobbyCode = this.lobbyService.getLobbyCode();
    this.lobbySubscription = this.lobbyService.getLobby().subscribe((lobby) => {
      console.log('this.lobby', this.lobby);
      console.log('lobby', lobby);
      if (this.lobby && this.lobby.index !== lobby.index) {
        this.router.navigate(['answer-question'], {
          queryParamsHandling: 'preserve',
        });
      }
      this.lobby = lobby;
      this.questions = lobby.questions;
      this.user = this.userService.getUser(lobby);

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
        const correct = answer && answer.answer === guess.answer;

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

  nextQuestion() {
    console.log(this.lobby.questions.length - 1);
    console.log(this.lobby.index);
    if (this.lobby.questions.length - 1 !== this.lobby.index) {
      this.lobbyService.nextQuestion(this.lobby.index + 1).then((_) => {
        this.router.navigate(['answer-question'], {
          queryParamsHandling: 'preserve',
        });
      });
    }
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

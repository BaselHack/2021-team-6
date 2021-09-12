import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LobbyService } from '../../services/lobby.service';
import { Lobby } from '../../models/lobby.model';
import { Question } from '../../models/question.model';
import { Subscription } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';

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
  private guesses = [
    {answer:'Answer a',
      data: [
        { name: "a", value: 70 },
        { name: "b", value: 20 },
        { name: "c", value: 10 },
        { name: "d", value: 0 },
        { name: "e", value: 0 }
      ]
    },
    {answer:'Answer b',
      data: [
        { name: "a", value: 50 },
        { name: "b", value: 30 },
        { name: "c", value: 10 },
        { name: "d", value: 10 },
        { name: "e", value: 0 }
      ]
    },
    {
      answer:'Answer c',
      data: [
        { name: "a", value: 50 },
        { name: "b", value: 20 },
        { name: "c", value: 10 },
        { name: "d", value: 10 },
        { name: "e", value: 10 }
      ]},

  ];

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
          userGuess.guesses.forEach(guess => {
            if(formattedGuesses.has(guess.answer)) {
              let nestedMap = formattedGuesses.get(guess.answer);
              if(nestedMap.has(this.getUsername(guess.userId))) {
                nestedMap.set(this.getUsername(guess.userId), nestedMap.get(this.getUsername(guess.userId)) + 1);
              } else {
                const guessMap = new Map<string, number>();
                guessMap.set(this.getUsername(guess.userId), 1);
                formattedGuesses.set(guess.answer, guessMap);
              }
            } else {
              const guessMap = new Map<string, number>();
              guessMap.set(this.getUsername(guess.userId), 1);
              formattedGuesses.set(guess.answer, guessMap);
            }
          });
      });

      formattedGuesses.forEach((userGuess, question) => {
        console.log(question, userGuess);
      })
    });
  }

  getUsername(userID: string) {
    return this.lobby.users?.find((x) => x.id === userID)?.username;
  }

  ngOnDestroy() {
    this.lobbySubscription.unsubscribe();
  }
}

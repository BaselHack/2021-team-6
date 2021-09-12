import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LobbyService } from '../../services/lobby.service';
import { Lobby } from '../../models/lobby.model';
import { Question } from '../../models/question.model';
import { Subscription } from 'rxjs';

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
      console.log('lobbyupdated');
      this.lobby = lobby;
      this.questions = lobby.questions;
    });
  }

  ngOnDestroy() {
    this.lobbySubscription.unsubscribe();
  }
}

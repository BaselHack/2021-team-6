import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LobbyService} from "../../services/lobby.service";
import {Lobby} from "../../models/lobby.model";
import {Question} from "../../models/question.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.page.html',
  styleUrls: ['./scoreboard.page.scss'],
})
export class ScoreboardPage implements OnInit {
  public lobby: Lobby;
  public lobbyCode;
  public questions: Question[];
  public currentQuestion: Question;
  private lobbySubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private lobbyService: LobbyService,
  ) { }

  ngOnInit() {
    this.lobbyCode = this.lobbyService.getLobbyCode();
    this.lobbySubscription = this.lobbyService.getLobby().subscribe((lobby) => {
      console.log('lobbyupdated');
      this.lobby = lobby;
      this.questions = lobby.questions;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Answer } from 'src/app/models/answer.model';
import { Lobby, User } from 'src/app/models/lobby.model';
import { Question } from 'src/app/models/question.model';
import { LobbyService } from 'src/app/services/lobby.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rate-answers',
  templateUrl: './rate-answers.page.html',
  styleUrls: ['./rate-answers.page.scss'],
})
export class RateAnswersPage implements OnInit {
  lobby: Lobby;
  selectedQuestion: Question;
  answers: Answer[];
  ownUser: User;
  users: User[];

  constructor(
    private lobbyService: LobbyService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.lobbyService.getLobby().subscribe((lobby) => {
      console.log('lobbyupdated');
      this.lobby = lobby;
      this.selectedQuestion = lobby.questions[lobby.index];
      this.answers = lobby.answers;
      this.users = lobby.users;
      this.ownUser = this.userService.getUser(lobby);
      console.log(this.ownUser);
    });
  }
}

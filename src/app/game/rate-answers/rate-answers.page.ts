import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Answer } from 'src/app/models/answer.model';
import { UserGuess } from 'src/app/models/Guess.model';
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
  ownUser: User;
  users: User[];
  rateAnswerForm: FormGroup;

  constructor(
    private lobbyService: LobbyService,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.rateAnswerForm = this.fb.group({answers: this.fb.array([])});

    this.lobbyService.getLobby().subscribe((lobby) => {
      console.log('lobbyupdated');
      this.lobby = lobby;
      this.selectedQuestion = lobby.questions[lobby.index];
      this.users = lobby.users;
      this.ownUser = this.userService.getUser(lobby);
      console.log(this.ownUser);

      this.lobby.answers.forEach(answer => {
          console.log(this.answers);
          if(answer.userID !== this.ownUser.id) {
            this.answers.push(this.fb.group({
              userID: [''],
              answer: [answer.answer],
            }));
          }
        });
    });
  }

  rateAnswer() {
    let userGuess: UserGuess = {
      userID: this.ownUser.id,
      guesses: []
    }

    for(let i = 0; i < this.answers.length; i++) {
      console.log('userID: ', this.userIdByIndex(i).value);
      console.log('answer: ', this.answerByIndex(i).value);
      userGuess.guesses.push({
        answer: this.answerByIndex(i).value,
        userId: this.userIdByIndex(i).value
      });
    }

    this.lobbyService.addGuess(userGuess).then(_ => {
      this.router.navigate(['scoreboard'], {queryParamsHandling: 'preserve'});
    });
  }

  get answers(): FormArray {
    return <FormArray> this.rateAnswerForm.get('answers');
  }

  userIdByIndex(index: number) {
    return this.answers.at(index).get('userID');
  }

  answerByIndex(index: number) {
    return this.answers.at(index).get('answer');
  }


}

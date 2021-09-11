import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private router: Router, private questionSvc: QuestionService) {}

  public onCreateLobby(): void {
    console.log('Lobby creation pending...');
    this.router.navigateByUrl('/create-lobby');
  }

  public onJoinLobby(): void {
    console.log('Lobby join pending...');
    this.router.navigateByUrl('/join-lobby');
  }

  public onUpdateQuestions(): void {
    console.log('Adding all local questions to repository');
    this.questionSvc.addAllLocalQuestions();
  }
}

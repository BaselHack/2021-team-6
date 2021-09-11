import { Component, OnInit } from '@angular/core';
import { LobbyService } from 'src/app/services/lobby.service';
import { QuestionService } from 'src/app/services/question.service';
import {Lobby} from "../../models/lobby.model";
import {Question} from "../../models/question.model";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { CountdownEvent } from 'ngx-countdown';

@Component({
  selector: 'app-answer-question',
  templateUrl: './answer-question.page.html',
  styleUrls: ['./answer-question.page.scss'],

})
export class AnswerQuestionPage implements OnInit {
  public lobby: Lobby;
  public lobbyCode;
  public questions: Question[];
  public currentQuestion: Question;
  public answerQuestionForm: FormGroup;

  constructor(private router: Router,private lobbyService: LobbyService, private questionService: QuestionService, public fb: FormBuilder,) {}

  ngOnInit() {
    // this.lobbyCode = this.lobbyService.lobbyCode;
    // this.lobbyService.getLobby(this.lobbyCode).subscribe(lobby => {
    //   this.lobby = lobby;
    // });

    this.answerQuestionForm = this.fb.group({
      answer: ['', [Validators.required]],
    });

    this.questionService.getAllQuestions().subscribe(questions =>{
      this.questions = questions;
      console.log(questions);
      this.currentQuestion = questions[0];
    })
  }

  public onAnswerQuestion(): void {}

  public onCountDownDone(event: CountdownEvent): void {
    if(event.action === 'done'){
      const answer = this.answer.value;
      console.log('Countdown done...')
      console.log(answer)
      this.router.navigate(['rate-answers'], {} );
    }
  }

  get answer() { return this.answerQuestionForm.get('answer'); }

}

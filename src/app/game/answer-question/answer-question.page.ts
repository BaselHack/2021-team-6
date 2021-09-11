import { Component, OnInit } from '@angular/core';
import { LobbyService } from 'src/app/services/lobby.service';
import { QuestionService } from 'src/app/services/question.service';
import { Lobby } from '../../models/lobby.model';
import { Question } from '../../models/question.model';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountdownEvent } from 'ngx-countdown';
import { Answer } from 'src/app/models/answer.model';

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
  public submitted = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private lobbyService: LobbyService,
    public fb: FormBuilder
  ) {}

  ngOnInit() {
    this.lobbyCode = this.lobbyService.getLobbyCode();
    this.lobbyService.getLobby().subscribe((lobby) => {
      console.log('lobbyupdated');
      this.lobby = lobby;
      this.questions = lobby.questions;
    });

    this.answerQuestionForm = this.fb.group({
      answer: ['', [Validators.required]],
    });
  }

  public onAnswerQuestion(): void {}

  public onCountDownDone(event: CountdownEvent): void {
    if (event.action === 'done') {
      const userId = this.route.snapshot.queryParamMap.get('userId');
      const answerText = this.answer.value;
      console.log('Countdown done...');
      const answer: Answer = {
        answer: answerText,
        userID: userId,
      };

      this.lobbyService
        .addAnswer(answer)
        .finally(() => {
          console.log(answer);
          // todo: fix this properly
          setTimeout(() => {
            this.router
              .navigate(['/rate-answers'], { queryParamsHandling: 'preserve' })
              .then((log) => console.log(log))
              .catch((error) => console.error(error));
          }, 200);
        })
        .catch((error) => console.error(`whatever: ${error}`));
    }
  }

  get answer() {
    return this.answerQuestionForm.get('answer');
  }
}

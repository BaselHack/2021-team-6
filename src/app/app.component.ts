import { Component, OnInit } from '@angular/core';
import { Question } from './models/question.model';
import { QuestionService } from './services/question.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}
}

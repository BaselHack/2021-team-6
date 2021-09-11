import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(public afs: AngularFirestore, private http: HttpClient) {}

  public createQuestion(question: Question): void {
    this.afs.collection('questions').add(question);
  }

  public addAllLocalQuestions(): void {
    const question: Question = {
      type: 'get-to-know',
      deckIds: [],
      question: 'Where are you from?',
    };

    // const questions
    this.createQuestion(question);
  }
}

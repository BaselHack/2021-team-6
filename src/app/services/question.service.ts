import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Question } from '../models/question.model';
import {Lobby} from "../models/lobby.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(public afs: AngularFirestore, private http: HttpClient) {}

  public createQuestion(question: Question): void {
    this.afs.collection('questions').add(question);
  }

  public addAllLocalQuestions(): void {
    const questions = this.http
      .get('assets/questions.json')
      .subscribe((q: Question[]) => {
        for (const question of q) {
          this.createQuestion(question);
        }
      });
  }

  public getAllQuestions(): Observable<Question[]> {
    const questionRef: AngularFirestoreCollection<Question> = this.afs.collection('questions');
    return questionRef.valueChanges();
  }
}

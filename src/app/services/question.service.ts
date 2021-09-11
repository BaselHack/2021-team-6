import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
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
    const questions = this.http
      .get('assets/questions.json')
      .subscribe((q: Question[]) => {
        for (const question of q) {
          this.createQuestion(question);
        }
      });
  }

  public getQuestionWithID(questionID: string): Observable<Question> {
    const lobbyRef: AngularFirestoreDocument<Question> = this.afs.doc(
      `lobbies/` + questionID
    );
    return lobbyRef.valueChanges();
  }
}

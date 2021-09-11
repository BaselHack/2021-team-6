import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Deck } from '../models/deck.model';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  constructor(private afs: AngularFirestore, private http: HttpClient) {}

  public getAllDecks(): Observable<Deck[]> {
    return this.afs.collection<Deck>('decks').valueChanges();
  }

  public createDecks(): void {
    this.http.get('assets/questions.json').subscribe((decks: Deck[]) => {
      for (const deck of decks) {
        this.afs.collection('decks').add(deck);
      }
    });
  }
}

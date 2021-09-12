import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Lobby, User } from '../models/lobby.model';
import firebase from 'firebase/app';
import { Answer } from '../models/answer.model';
import { ActivatedRoute } from '@angular/router';
import { UserGuess } from '../models/Guess.model';

@Injectable({
  providedIn: 'root',
})
export class LobbyService {
  private lobbyCode: string;

  constructor(public afs: AngularFirestore, private route: ActivatedRoute) {}

  public createLobby(lobbyCode: string, lobby: Lobby) {
    this.lobbyCode = lobbyCode;
    return this.afs.collection('lobbies').doc(lobbyCode).set(lobby);
  }

  public getLobby(): Observable<Lobby> {
    const lobbyRef: AngularFirestoreDocument<Lobby> = this.afs.doc(
      `lobbies/` + this.getLobbyCode()
    );
    return lobbyRef.valueChanges();
  }

  public joinLobby(lobbyCode: string, user: User) {
    this.lobbyCode = lobbyCode;
    return this.afs
      .collection('lobbies')
      .doc(lobbyCode)
      .update({
        users: firebase.firestore.FieldValue.arrayUnion(user),
      });
  }

  public leaveLobby(code: string, user: User) {
    this.lobbyCode = null;
    return this.afs
      .collection('lobbies')
      .doc(code)
      .update({
        users: firebase.firestore.FieldValue.arrayRemove(user),
      });
  }

  public destroyLobby(code: string) {
    this.lobbyCode = null;
    return this.afs.collection('lobbies').doc(code).delete();
  }

  public updateState(newState: number): void {
    this.afs.collection('lobbies').doc(this.getLobbyCode()).update({
      state: newState,
    });
  }

  public nextQuestion(newIndex: number) {
    return this.afs.collection('lobbies').doc(this.getLobbyCode()).update({
      answers: [],
      userGuesses: [],
      state: 1,
      index: newIndex
    });
  }

  public addAnswer(answer: Answer) {
    return this.afs
      .collection('lobbies')
      .doc(this.getLobbyCode())
      .update({
        answers: firebase.firestore.FieldValue.arrayUnion(answer),
      });
  }

  public addGuess(userGuess: UserGuess) {
    return this.afs
      .collection('lobbies')
      .doc(this.getLobbyCode())
      .update({
        userGuesses: firebase.firestore.FieldValue.arrayUnion(userGuess),
      });
  }

  public getLobbyCode() {
    if(this.lobbyCode === '' || this.lobbyCode === undefined) {
      this.lobbyCode = this.route.snapshot.queryParamMap.get('lobbyCode');
    }
    return this.lobbyCode;
  }
}

import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Lobby, User } from '../models/lobby.model';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class LobbyService {
  public lobbyCode: string;

  constructor(public afs: AngularFirestore) {}

  public createLobby(lobbyCode: string, lobby: Lobby) {
    this.lobbyCode = lobbyCode;
    return this.afs.collection('lobbies').doc(lobbyCode).set(lobby);
  }

  public getLobby(lobbyCode: string): Observable<Lobby> {
    const lobbyRef: AngularFirestoreDocument<Lobby> = this.afs.doc(
      `lobbies/` + lobbyCode
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
}

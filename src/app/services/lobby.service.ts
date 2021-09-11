import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, } from '@angular/fire/firestore';
import { Lobby } from '../models/lobby.model';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  constructor(public afs: AngularFirestore) { }

  public createLobby(lobby: Lobby) {
    return this.afs.collection('lobbies').add(lobby);
  }
}

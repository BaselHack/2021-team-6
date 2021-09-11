import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, } from '@angular/fire/firestore';
//import { Lobby } from '../models/lobby';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  constructor(public afs: AngularFirestore) { }

  public createCampaign(lobby: Lobby) {
    return this.afs.collection('lobbies').add(lobby);
  }
}

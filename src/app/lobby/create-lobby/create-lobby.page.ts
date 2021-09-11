import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Lobby } from 'src/app/models/lobby.model';
import { LobbyService } from 'src/app/services/lobby.service';

@Component({
  selector: 'app-create-lobby',
  templateUrl: './create-lobby.page.html',
  styleUrls: ['./create-lobby.page.scss'],
})
export class CreateLobbyPage implements OnInit {

  constructor(public lobbyService: LobbyService) { }

  ngOnInit() {
  }


  createLobby() {
    const lobby: Lobby = {
      public: true,
      users: [
        {username: "Max"}
      ]
    }
    this.lobbyService.createLobby(lobby);
  }

}

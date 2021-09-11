import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Lobby } from 'src/app/models/lobby.model';
import { LobbyService } from 'src/app/services/lobby.service';

@Component({
  selector: 'app-create-lobby',
  templateUrl: './create-lobby.page.html',
  styleUrls: ['./create-lobby.page.scss'],
})
export class CreateLobbyPage implements OnInit {

  createLobbyForm: FormGroup;

  constructor(public lobbyService: LobbyService, public fb: FormBuilder,) { }

  ngOnInit() {
    this.createLobbyForm = this.fb.group({
      'public': [false],
      'username': ['', [Validators.required]],
    });
  }


  createLobby() {
    const lobby: Lobby = {
      public: this.public.value,
      users: [
        {username: this.username.value}
      ]
    }
    this.lobbyService.createLobby(lobby);
  }

  get public() { return this.createLobbyForm.get('public'); }
  get username() { return this.createLobbyForm.get('username'); }

}

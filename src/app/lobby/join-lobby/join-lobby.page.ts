import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/lobby.model';
import { LobbyService } from 'src/app/services/lobby.service';

@Component({
  selector: 'app-join-lobby',
  templateUrl: './join-lobby.page.html',
  styleUrls: ['./join-lobby.page.scss'],
})
export class JoinLobbyPage implements OnInit {
  joinLobbyForm: FormGroup;

  constructor(private router: Router, private lobbyService: LobbyService, public fb: FormBuilder,) {}

  ngOnInit() {
    this.joinLobbyForm = this.fb.group({
      username: ['', [Validators.required]],
      code: ['', [Validators.required]],
    });
  }

  public onJoin(): void {

    const user: User = {
      username: this.username.value,
      isHost: false
    };
    this.lobbyService.joinLobby(this.code.value, user).then(docRef => {
      console.log(`Lobby to join: ${this.code}`);
      this.router.navigate(['view-lobby', this.code.value]);
    })
    .catch(error => {
      console.error('Error adding document: ', error);
    });;

  }

  get code() { return this.joinLobbyForm.get('code'); }
  get username() { return this.joinLobbyForm.get('username'); }
}

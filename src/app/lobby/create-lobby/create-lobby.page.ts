import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Deck } from 'src/app/models/deck.model';
import { Lobby } from 'src/app/models/lobby.model';
import { DeckService } from 'src/app/services/deck.service';
import { LobbyService } from 'src/app/services/lobby.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-lobby',
  templateUrl: './create-lobby.page.html',
  styleUrls: ['./create-lobby.page.scss'],
})
export class CreateLobbyPage implements OnInit {
  createLobbyForm: FormGroup;
  decks: Deck[];

  constructor(
    public lobbyService: LobbyService,
    public fb: FormBuilder,
    public router: Router,
    public deckSvc: DeckService
  ) {}

  ngOnInit() {
    this.createLobbyForm = this.fb.group({
      public: [false],
      username: ['', [Validators.required]],
      deck: ['', [Validators.required]],
    });

    this.deckSvc.getAllDecks().subscribe((decks) => {
      this.decks = decks;
    });
  }

  createLobby() {
    const userId = uuidv4();

    const lobbyCode = (Math.floor(Math.random() * 10000) + 10000)
      .toString()
      .substring(1);

    const lobby: Lobby = {
      public: this.public.value,
      state: 0,
      index: 0,
      questions: this.deck.questions,
      users: [
        {
          id: userId,
          username: this.username.value,
          isHost: true,
        },
      ],
    };
    this.lobbyService
      .createLobby(lobbyCode, lobby)
      .then((docRef) => {
        this.router.navigate(['view-lobby', lobbyCode], { queryParams: { userId: userId } });
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  }

  get public() {
    return this.createLobbyForm.get('public');
  }
  get username() {
    return this.createLobbyForm.get('username');
  }

  get deck() {
    const index = this.createLobbyForm.get('deck').value;
    return this.decks[index];
  }
}

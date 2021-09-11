import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Deck } from 'src/app/models/deck.model';
import { Lobby } from 'src/app/models/lobby.model';
import { Question } from 'src/app/models/question.model';
import { DeckService } from 'src/app/services/deck.service';
import { LobbyService } from 'src/app/services/lobby.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-view-lobby',
  templateUrl: './view-lobby.page.html',
  styleUrls: ['./view-lobby.page.scss'],
})
export class ViewLobbyPage implements OnInit {
  public lobbyCode: string;
  public isHost = true;
  public lobby: Lobby;

  public decks: Deck[];

  constructor(
    private lobbyService: LobbyService,
    private router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private deckSvc: DeckService,
    private questionsSvc: QuestionService
  ) {}

  ngOnInit() {
    this.lobbyCode = this.route.snapshot.paramMap.get('lobbyCode');
    this.lobbyService.getLobby(this.lobbyCode).subscribe((lobby) => {
      this.lobby = lobby;
    });
  }

  public onStartGame(): void {
    console.log('Game started...');
    this.router.navigateByUrl('/answer-question');
  }

  // public getQuestionsForDeck(index: number): Question[] {
  //   const deck = this.decks[index];

  //   const questions: Question[] = [];
  //   for (const questionID of deck.questionIDs) {
  //     this.questionsSvc.getQuestionWithID(questionID).subscribe((q) => {
  //       questions.push(q);
  //     });
  //   }

  //   console.log(questions);
  //   return questions;
  // }
}

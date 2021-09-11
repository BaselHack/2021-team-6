import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Deck } from 'src/app/models/deck.model';
import { Lobby, User } from 'src/app/models/lobby.model';
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
  public user: User;

  public decks: Deck[];

  constructor(
    private lobbyService: LobbyService,
    private router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private deckSvc: DeckService,
    private questionsSvc: QuestionService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.lobbyCode = this.lobbyService.getLobbyCode();
    const userId = this.route.snapshot.queryParamMap.get('userId');

    this.lobbyService.getLobby(this.lobbyCode).subscribe(
      (lobby) => {
        this.lobby = lobby;
        if (lobby) {
          this.user = this.lobby.users?.find((x) => x.id === userId);
        } else if (!this.user.isHost) {
          this.presentAlert();
        }
        if (lobby.state === 1) {
          this.router.navigate(['answer-question'], { queryParamsHandling: 'preserve' });
        }
      },
      (error) => {
        if (!this.user.isHost) {
          this.presentAlert();
        }
      }
    );
  }

  leaveLobby() {
    if (this.user.isHost) {
      this.lobbyService.destroyLobby(this.lobbyCode).then((_) => {
        this.router.navigateByUrl('/home');
      });
    } else {
      this.lobbyService.leaveLobby(this.lobbyCode, this.user).then((_) => {
        this.router.navigateByUrl('/home');
      });
    }
  }

  public onStartGame(): void {
    console.log('Game started...');
    this.lobbyService.updateState(1);
    this.router.navigate(['/answer-question'], {
      queryParamsHandling: 'preserve',
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Lobby closed by host',
      message: 'The lobby has been closed by the host',
      buttons: ['OK'],
    });
    await alert.present();
    this.router.navigateByUrl('/home');
  }
}

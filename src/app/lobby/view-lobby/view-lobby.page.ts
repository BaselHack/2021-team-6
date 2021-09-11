import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LobbyService } from 'src/app/services/lobby.service';

@Component({
  selector: 'app-view-lobby',
  templateUrl: './view-lobby.page.html',
  styleUrls: ['./view-lobby.page.scss'],
})
export class ViewLobbyPage implements OnInit {
  public lobbyCode = '1234';
  public isHost = true;

  constructor(private lobbySvc: LobbyService, private router: Router) {}

  ngOnInit() {
    // this.lobbySvc.lobbyCode.subscribe((code) => {
    //   this.lobbyCode = code;
    // });
  }

  public onStartGame(): void {
    console.log('Game started...');
    this.router.navigateByUrl('/answer-question');
  }
}

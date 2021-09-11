import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Lobby } from 'src/app/models/lobby.model';
import { LobbyService } from 'src/app/services/lobby.service';

@Component({
  selector: 'app-view-lobby',
  templateUrl: './view-lobby.page.html',
  styleUrls: ['./view-lobby.page.scss'],
})
export class ViewLobbyPage implements OnInit {
  public lobbyCode: string;
  public isHost = true;
  public lobby: Lobby;

  constructor(private lobbyService: LobbyService, private router: Router, private route: ActivatedRoute,public fb: FormBuilder,) {}

  ngOnInit() {
    this.lobbyCode = this.route.snapshot.paramMap.get("lobbyCode");
    this.lobbyService.getLobby(this.lobbyCode).subscribe(lobby => {
      this.lobby = lobby;
    })
  }


  public onStartGame(): void {
    console.log('Game started...');
    this.router.navigateByUrl('/answer-question');
  }
}

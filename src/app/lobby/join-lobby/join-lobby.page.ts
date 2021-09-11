import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-lobby',
  templateUrl: './join-lobby.page.html',
  styleUrls: ['./join-lobby.page.scss'],
})
export class JoinLobbyPage implements OnInit {
  public code = '';

  constructor(private router: Router) {}

  ngOnInit() {}

  public onJoin(): void {
    console.log(`Lobby to join: ${this.code}`);
    this.router.navigateByUrl('/view-lobby');
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lobby, User } from '../models/lobby.model';
import { LobbyService } from './lobby.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private activeUser: User = null;

  constructor(private route: ActivatedRoute) {}

  public getUser(lobby: Lobby): User {
    if (this.activeUser === null) {
      const userId = this.route.snapshot.queryParamMap.get('userId');
      this.activeUser = lobby.users?.find((x) => x.id === userId);
      return this.activeUser;
    }
  }

  public setUser(user: User): void {
    this.activeUser = user;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/models/lobby.model';
import { LobbyService } from 'src/app/services/lobby.service';
import { UserService } from 'src/app/services/user.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-join-lobby',
  templateUrl: './join-lobby.page.html',
  styleUrls: ['./join-lobby.page.scss'],
})
export class JoinLobbyPage implements OnInit {
  joinLobbyForm: FormGroup;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private lobbyService: LobbyService,
    public fb: FormBuilder,
    private userSvc: UserService
  ) {}

  ngOnInit() {
    this.joinLobbyForm = this.fb.group({
      username: ['', [Validators.required]],
      code: ['', [Validators.required]],
    });
  }

  public onJoin(): void {
    const userId = uuidv4();

    const user: User = {
      id: userId,
      username: this.username.value,
      isHost: false,
    };

    this.userSvc.setUser(user);

    this.lobbyService
      .joinLobby(this.code.value, user)
      .then((docRef) => {
        console.log(`Lobby to join: ${this.code.value}`);
        const queryParams = `?userId=${userId}&lobbyCode=${this.code.value}`;
              this.navCtrl.navigateRoot('/view-lobby' + queryParams, { animated: true, animationDirection: 'forward' });

        // this.router.navigate(['view-lobby'], {
        //   queryParams: { userId: userId, lobbyCode: this.code.value },
        // });
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  }

  get code() {
    return this.joinLobbyForm.get('code');
  }
  get username() {
    return this.joinLobbyForm.get('username');
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoinLobbyPageRoutingModule } from './join-lobby-routing.module';

import { JoinLobbyPage } from './join-lobby.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoinLobbyPageRoutingModule
  ],
  declarations: [JoinLobbyPage]
})
export class JoinLobbyPageModule {}

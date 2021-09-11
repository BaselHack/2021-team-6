import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewLobbyPageRoutingModule } from './view-lobby-routing.module';

import { ViewLobbyPage } from './view-lobby.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewLobbyPageRoutingModule
  ],
  declarations: [ViewLobbyPage]
})
export class ViewLobbyPageModule {}

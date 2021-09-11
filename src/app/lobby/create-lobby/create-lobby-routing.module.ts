import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateLobbyPage } from './create-lobby.page';

const routes: Routes = [
  {
    path: '',
    component: CreateLobbyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateLobbyPageRoutingModule {}

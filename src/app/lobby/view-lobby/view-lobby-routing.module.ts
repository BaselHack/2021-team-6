import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewLobbyPage } from './view-lobby.page';

const routes: Routes = [
  {
    path: '',
    component: ViewLobbyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewLobbyPageRoutingModule {}

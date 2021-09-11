import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RateAnswersPage } from './rate-answers.page';

const routes: Routes = [
  {
    path: '',
    component: RateAnswersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RateAnswersPageRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RateAnswersPageRoutingModule } from './rate-answers-routing.module';

import { RateAnswersPage } from './rate-answers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RateAnswersPageRoutingModule
  ],
  declarations: [RateAnswersPage]
})
export class RateAnswersPageModule {}

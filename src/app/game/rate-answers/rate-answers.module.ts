import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RateAnswersPageRoutingModule } from './rate-answers-routing.module';

import { RateAnswersPage } from './rate-answers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RateAnswersPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RateAnswersPage]
})
export class RateAnswersPageModule {}

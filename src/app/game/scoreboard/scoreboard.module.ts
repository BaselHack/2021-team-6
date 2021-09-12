import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CountdownModule } from 'ngx-countdown';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { IonicModule } from '@ionic/angular';
import { ScoreboardPageRoutingModule } from './scoreboard-routing.module';

import { ScoreboardPage } from './scoreboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScoreboardPageRoutingModule,
    CountdownModule,
    NgxChartsModule,
  ],
  declarations: [ScoreboardPage]
})
export class ScoreboardPageModule {}

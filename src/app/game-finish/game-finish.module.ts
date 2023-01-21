import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GameFinishPageRoutingModule } from './game-finish-routing.module';

import { GameFinishPage } from './game-finish.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GameFinishPageRoutingModule
  ],
  declarations: [GameFinishPage]
})
export class GameFinishPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Game2PageRoutingModule } from './game2-routing.module';

import { Game2Page } from './game2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Game2PageRoutingModule
  ],
  declarations: [Game2Page]
})
export class Game2PageModule {}

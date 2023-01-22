import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Game2PageRoutingModule } from './game2-routing.module';

import { Game2Page } from './game2.page';
import { LottieModule } from 'ngx-lottie';
export function playerFactory() {
  return import('lottie-web');
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Game2PageRoutingModule,
    LottieModule.forRoot({player:playerFactory})

  ],
  declarations: [Game2Page]
})
export class Game2PageModule {}

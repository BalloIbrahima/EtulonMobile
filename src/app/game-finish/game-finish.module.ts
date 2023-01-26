import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GameFinishPageRoutingModule } from './game-finish-routing.module';

import { GameFinishPage } from './game-finish.page';
import { LottieModule } from 'ngx-lottie';
import { httpInterceptorProviders } from '../Helpers/http.interceptor';
export function playerFactory() {
  return import('lottie-web');
}
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GameFinishPageRoutingModule,
    LottieModule.forRoot({player:playerFactory})

  ],
  providers: [httpInterceptorProviders],

  declarations: [GameFinishPage]
})
export class GameFinishPageModule {}

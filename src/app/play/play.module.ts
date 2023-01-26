import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayPageRoutingModule } from './play-routing.module';

import { PlayPage } from './play.page';
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
    PlayPageRoutingModule,
    LottieModule.forRoot({player:playerFactory})
  ],
  providers: [httpInterceptorProviders],
  declarations: [PlayPage]
})
export class PlayPageModule {}

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Home1PageRoutingModule } from './home1-routing.module';

import { Home1Page } from './home1.page';
import { LottieModule } from 'ngx-lottie';

export function playerFactory() {
  return import('lottie-web');
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Home1PageRoutingModule,
    LottieModule.forRoot({player:playerFactory})
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [Home1Page]
})
export class Home1PageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VocalPageRoutingModule } from './vocal-routing.module';

import { VocalPage } from './vocal.page';
import { httpInterceptorProviders } from 'src/app/Helpers/http.interceptor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VocalPageRoutingModule
  ],
  providers: [httpInterceptorProviders],

  declarations: [VocalPage]
})
export class VocalPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewConseilPageRoutingModule } from './new-conseil-routing.module';

import { NewConseilPage } from './new-conseil.page';
import { httpInterceptorProviders } from '../Helpers/http.interceptor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewConseilPageRoutingModule
  ],
  providers: [httpInterceptorProviders],
  declarations: [NewConseilPage]
})
export class NewConseilPageModule {}

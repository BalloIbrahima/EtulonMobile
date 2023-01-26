import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComptePageRoutingModule } from './compte-routing.module';

import { ComptePage } from './compte.page';
import { httpInterceptorProviders } from '../Helpers/http.interceptor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComptePageRoutingModule
  ],
  providers: [httpInterceptorProviders],
  declarations: [ComptePage]
})
export class ComptePageModule {}

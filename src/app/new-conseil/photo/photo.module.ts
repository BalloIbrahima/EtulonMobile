import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhotoPageRoutingModule } from './photo-routing.module';

import { PhotoPage } from './photo.page';
import { httpInterceptorProviders } from 'src/app/Helpers/http.interceptor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhotoPageRoutingModule
  ],
  providers: [httpInterceptorProviders],
  declarations: [PhotoPage]
})
export class PhotoPageModule {}

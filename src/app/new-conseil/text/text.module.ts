import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TextPageRoutingModule } from './text-routing.module';

import { TextPage } from './text.page';
import { httpInterceptorProviders } from 'src/app/Helpers/http.interceptor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TextPageRoutingModule
  ],
  providers: [httpInterceptorProviders],
  declarations: [TextPage]
})
export class TextPageModule {}

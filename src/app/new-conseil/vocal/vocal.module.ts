import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VocalPageRoutingModule } from './vocal-routing.module';

import { VocalPage } from './vocal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VocalPageRoutingModule
  ],
  declarations: [VocalPage]
})
export class VocalPageModule {}

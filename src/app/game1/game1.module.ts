import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Game1PageRoutingModule } from './game1-routing.module';

import { Game1Page } from './game1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Game1PageRoutingModule
  ],
  declarations: [Game1Page]
})
export class Game1PageModule {}

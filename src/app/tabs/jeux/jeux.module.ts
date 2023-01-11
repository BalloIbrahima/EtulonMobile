import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JeuxPageRoutingModule } from './jeux-routing.module';

import { JeuxPage } from './jeux.page';
import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    JeuxPageRoutingModule
  ],
  declarations: [JeuxPage]
})
export class JeuxPageModule {}

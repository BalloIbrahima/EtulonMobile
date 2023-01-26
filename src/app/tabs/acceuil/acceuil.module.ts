import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcceuilPageRoutingModule } from './acceuil-routing.module';

import { AcceuilPage } from './acceuil.page';
import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';
import { httpInterceptorProviders } from 'src/app/Helpers/http.interceptor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    AcceuilPageRoutingModule
  ],
  providers: [httpInterceptorProviders],
  declarations: [AcceuilPage]
})
export class AcceuilPageModule {}

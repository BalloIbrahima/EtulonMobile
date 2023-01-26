import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilPageRoutingModule } from './profil-routing.module';

import { ProfilPage } from './profil.page';
import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';
import { httpInterceptorProviders } from 'src/app/Helpers/http.interceptor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    ProfilPageRoutingModule
  ],
  providers: [httpInterceptorProviders],
  declarations: [ProfilPage]
})
export class ProfilPageModule {}

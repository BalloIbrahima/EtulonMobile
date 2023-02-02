import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConseilPageRoutingModule } from './conseil-routing.module';

import { ConseilPage } from './conseil.page';
import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';
import { httpInterceptorProviders } from 'src/app/Helpers/http.interceptor';
import { Media } from '@ionic-native/media/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    ConseilPageRoutingModule
  ],
  providers: [httpInterceptorProviders],
  declarations: [ConseilPage]
})
export class ConseilPageModule {}

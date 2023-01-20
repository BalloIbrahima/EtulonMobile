import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VocalPage } from './vocal.page';

const routes: Routes = [
  {
    path: '',
    component: VocalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VocalPageRoutingModule {}

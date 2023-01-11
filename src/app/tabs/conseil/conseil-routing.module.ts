import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConseilPage } from './conseil.page';

const routes: Routes = [
  {
    path: '',
    component: ConseilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConseilPageRoutingModule {}

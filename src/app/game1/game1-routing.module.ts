import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Game1Page } from './game1.page';

const routes: Routes = [
  {
    path: '',
    component: Game1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Game1PageRoutingModule {}

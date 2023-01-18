import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Game2Page } from './game2.page';

const routes: Routes = [
  {
    path: '',
    component: Game2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Game2PageRoutingModule {}

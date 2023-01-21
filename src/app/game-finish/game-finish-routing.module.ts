import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameFinishPage } from './game-finish.page';

const routes: Routes = [
  {
    path: '',
    component: GameFinishPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameFinishPageRoutingModule {}

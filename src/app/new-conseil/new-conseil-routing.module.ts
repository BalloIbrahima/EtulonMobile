import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewConseilPage } from './new-conseil.page';

const routes: Routes = [
  {
    path: '',
    component: NewConseilPage,
    children: [
      {
        path: 'text',
        loadChildren: () => import('./text/text.module').then( m => m.TextPageModule)
      },
      {
        path: 'photo',
        loadChildren: () => import('./photo/photo.module').then( m => m.PhotoPageModule)
      },
      {
        path: 'video',
        loadChildren: () => import('./video/video.module').then( m => m.VideoPageModule)
      },
      {
        path: 'vocal',
        loadChildren: () => import('./vocal/vocal.module').then( m => m.VocalPageModule)
      },
      {
        path: '',
        redirectTo: 'text',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'text',
    pathMatch: 'full'

  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewConseilPageRoutingModule {}

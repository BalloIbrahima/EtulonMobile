import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'acceuil',
        loadChildren: () => import('./acceuil/acceuil.module').then( m => m.AcceuilPageModule)
      },
      {
        path: 'jeux',
        loadChildren: () => import('./jeux/jeux.module').then( m => m.JeuxPageModule)
      },
      {
        path: 'profil',
        loadChildren: () => import('./profil/profil.module').then( m => m.ProfilPageModule)
      },
      {
        path: 'conseil',
        loadChildren: () => import('./conseil/conseil.module').then( m => m.ConseilPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/acceuil',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/acceuil',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}

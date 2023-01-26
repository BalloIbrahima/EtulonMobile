import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { InscriptionGuard } from './guards/inscription/inscription.guard';
import { TabsGuard } from './guards/tabs/tabs.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate:[TabsGuard]
  },
  {
    path: 'home1',
    loadChildren: () => import('./home1/home1.module').then( m => m.Home1PageModule)
  },
  {
    path: 'home2',
    loadChildren: () => import('./home2/home2.module').then( m => m.Home2PageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'inscription',
    loadChildren: () => import('./inscription/inscription.module').then( m => m.InscriptionPageModule),
    canActivate:[InscriptionGuard]
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'game1/:id',
    loadChildren: () => import('./game1/game1.module').then( m => m.Game1PageModule)
  },
  {
    path: 'game2',
    loadChildren: () => import('./game2/game2.module').then( m => m.Game2PageModule)
  },
  {
    path: 'play',
    loadChildren: () => import('./play/play.module').then( m => m.PlayPageModule)
  },
  {
    path: 'compte',
    loadChildren: () => import('./compte/compte.module').then( m => m.ComptePageModule)
  },
  {
    path: 'new-conseil',
    loadChildren: () => import('./new-conseil/new-conseil.module').then( m => m.NewConseilPageModule)
  },
  {
    path: 'game-finish',
    loadChildren: () => import('./game-finish/game-finish.module').then( m => m.GameFinishPageModule)
  },
  // {
  //   path: '',
  //   redirectTo:'home1',
  //   pathMatch:'full'
  // },
  {
    path: '**',
    redirectTo:'',
    pathMatch:'full'

  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

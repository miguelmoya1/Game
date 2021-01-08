import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IsLogged } from './shared/guard/logged.guard';
import { NotLogged } from './shared/guard/not-logged.guard';

const routes: Routes = [
  { path: '', redirectTo: 'game', pathMatch: 'full' },
  {
    path: 'game',
    // canActivate: [IsLogged],
    loadChildren: () => import('./game/game.module').then((m) => m.GameModule),
  },
  { path: '**', redirectTo: 'game', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

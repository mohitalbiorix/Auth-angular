import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WarningComponent } from './shared/component/warning/warning.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
  },
  {
    path: '**',
    component:WarningComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

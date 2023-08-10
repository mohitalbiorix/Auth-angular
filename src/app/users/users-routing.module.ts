import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { authGuard } from '../auth/guard/auth.guard';
import { userResolver } from '../shared/resolver/user.resolver';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    canActivate: [authGuard],
    resolve: {
      users: userResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}

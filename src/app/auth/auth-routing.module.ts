import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { autoredirectGuard } from './guard/autoredirect.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate:[autoredirectGuard]
  },
  {
    path:'signup',
    component:RegisterComponent,
    canActivate:[autoredirectGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

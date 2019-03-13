import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticateComponent } from './authenticate/authenticate.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '',   redirectTo: '/authenticate', pathMatch: 'full' },
  { path: 'authenticate', component: AuthenticateComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

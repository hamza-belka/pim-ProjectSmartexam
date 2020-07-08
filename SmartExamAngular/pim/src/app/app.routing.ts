import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HomeComponent } from './home/home.component';

export const AppsRoutes: Routes = [

  {
    path: '',
  redirectTo: '/login' ,
  pathMatch: 'full'

}, {
  path: 'login',
  component: HomeComponent,
 
},
  {
    path: 'admin',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  }, {
    path: 'dashboard',
    component: AdminLayoutComponent,
    children: [
        {
      path: 'dashboard',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},
  {
    path: '**',
    redirectTo: 'login'
  }
]

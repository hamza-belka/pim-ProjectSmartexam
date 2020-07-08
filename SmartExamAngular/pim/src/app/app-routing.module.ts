
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MyDialogComponent } from './my-dialog/my-dialog.component';

import { deletepopup, TableComponent } from './pages/table/table.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserComponent } from './pages/user/user.component';
import { TypographyComponent } from './pages/typography/typography.component';
import { IconsComponent } from './pages/icons/icons.component';
import { MapsComponent } from './pages/maps/maps.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { HomeRoutingModule } from './home/home-routing.module';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';



const AppRoutes: Routes = [
  {
    path: 'login',
    redirectTo: '/login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: HomeComponent,
    children: [
        {
      path: '',
      loadChildren: './home/home-routing.module#HomeRoutingModule'
  }]},
    /**/ {
      path: 'admin',
      component: AdminLayoutComponent,
      children: [
          {
        path: '',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }
    
    ]}
    //{ path: 'home',           component: HomeComponent }
  ]
@NgModule({
 
  imports: [

    
    AdminLayoutModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    
    
    
  ],
  exports:[
    
    RouterModule
  ],
  
 
  entryComponents: [
    MyDialogComponent,
    deletepopup,
    HomeComponent
]
})
export class AppRoutingModule { }

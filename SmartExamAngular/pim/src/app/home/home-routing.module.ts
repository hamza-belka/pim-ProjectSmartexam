
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';









const homeRoutes: Routes = [

    {
    path: 'login',
    component: HomeComponent
  }
    
    ]
@NgModule({
 
  imports: [
    
    RouterModule.forRoot(homeRoutes,{
      useHash: true
    }),
    
    
    
  ],
  exports:[
    
    RouterModule
  ]
})
export class HomeRoutingModule { }

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';

import { ToastrModule } from "ngx-toastr";
import { MatCardModule, MatSnackBar } from '@angular/material'
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
//import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import {MatInputModule} from '@angular/material/input'
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MyDialogComponent } from './my-dialog/my-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule} from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import { deletepopup, TableComponent } from './pages/table/table.component';
import { HomeComponent } from './home/home.component';
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserComponent } from './pages/user/user.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { HomeRoutingModule } from './home/home-routing.module';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';
import {MatDatepickerModule,
  MatNativeDateModule} from '@angular/material';
import { ExcelviewerComponent } from './excelviewer/excelviewer.component'; 



@NgModule({
  declarations: [
    
    AppComponent,
    AdminLayoutComponent,
    MyDialogComponent,
    HomeComponent,
    deletepopup,
    ExcelviewerComponent
    
    /*DashboardComponent,
    UserComponent,
    TableComponent,
    NotificationsComponent*/
    ],
  imports: [
    MatNativeDateModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    HomeRoutingModule,
    AppRoutingModule,
    BrowserModule,
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCardModule,
    FormsModule, 
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatFormFieldModule,
    PdfViewerModule
   
    
  ],
  
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent],
  entryComponents: [
    MyDialogComponent,
    deletepopup
    
]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { adminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { adminComponent } from './admin.component';
import { AdminmenuComponent } from './adminmenu/adminmenu.component';
import { ManagepackageComponent } from './managepackage/managepackage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    adminComponent,
    AdminmenuComponent,
    ManagepackageComponent,
  ],
  imports: [
    CommonModule,
    adminRoutingModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  bootstrap: [adminComponent]
})
export class AdminModule { }

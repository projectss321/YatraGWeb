import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { adminComponent } from './admin.component';
import { ManagepackageComponent } from './managepackage/managepackage.component';
const routes: Routes = [

  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'admin', redirectTo: 'admin/dashboard', pathMatch: 'full' },
  {
    path: 'admin', component: adminComponent,
    children: [
      { path: 'package', component: ManagepackageComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class adminRoutingModule { }

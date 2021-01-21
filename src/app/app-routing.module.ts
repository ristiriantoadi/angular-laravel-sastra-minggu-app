import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { GuestComponent } from './guest/guest.component';
import { LaporanPemuatanAdminComponent } from './laporan-pemuatan-admin/laporan-pemuatan-admin.component';
import { LaporanPemuatanUserComponent } from './laporan-pemuatan-user/laporan-pemuatan-user.component';
import { NotifikasiComponent } from './notifikasi/notifikasi.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReportComponent } from './report/report.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:'',component:GuestComponent},
  {path:'admin',component:AdminComponent,children:[
    {path:'laporan_pemuatan',component:LaporanPemuatanAdminComponent},
    {path:'report',component:ReportComponent}
  ]},
  {path:'user',component:UserComponent,children:[
    {path:'laporan_pemuatan',component:LaporanPemuatanUserComponent},
    {path:'notifikasi',component:NotifikasiComponent}
  ]},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

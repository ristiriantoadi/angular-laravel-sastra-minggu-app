import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuardAdminService } from './auth-guard-admin.service';
import { AuthGuardGuestService } from './auth-guard-guest.service';
import { AuthGuardUserService } from './auth-guard-user.service';
import { GuestComponent } from './guest/guest.component';
import { KaryaSayaComponent } from './karya-saya/karya-saya.component';
import { LaporanPemuatanAdminComponent } from './laporan-pemuatan-admin/laporan-pemuatan-admin.component';
import { LaporanPemuatanUserComponent } from './laporan-pemuatan-user/laporan-pemuatan-user.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:'',component:GuestComponent,canActivate: [AuthGuardGuestService]},
  {path:'admin',component:AdminComponent,canActivate: [AuthGuardAdminService],children:[
    {path:'laporan_pemuatan',component:LaporanPemuatanAdminComponent}
  ]},
  {path:'user',component:UserComponent,canActivate: [AuthGuardUserService],children:[
    {path:'laporan_pemuatan',component:LaporanPemuatanUserComponent},
    {path:'karya_saya',component:KaryaSayaComponent}
  ]},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

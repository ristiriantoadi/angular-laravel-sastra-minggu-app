import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuestComponent } from './guest/guest.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { LaporanPemuatanAdminComponent } from './laporan-pemuatan-admin/laporan-pemuatan-admin.component';
import { LaporanPemuatanUserComponent } from './laporan-pemuatan-user/laporan-pemuatan-user.component';
import { ReportComponent } from './report/report.component';
import { NotifikasiComponent } from './notifikasi/notifikasi.component';
import { AddEntriModalComponent } from './add-entri-modal/add-entri-modal.component';
import { EditEntriModalComponent } from './edit-entri-modal/edit-entri-modal.component';
import {NgxPaginationModule} from "ngx-pagination";
import { PencarianComponent } from './pencarian/pencarian.component'

@NgModule({
  declarations: [
    AppComponent,
    GuestComponent,
    AdminComponent,
    UserComponent,
    PageNotFoundComponent,
    NavbarComponent,
    ModalLoginComponent,
    RegisterModalComponent,
    LaporanPemuatanAdminComponent,
    LaporanPemuatanUserComponent,
    ReportComponent,
    NotifikasiComponent,
    AddEntriModalComponent,
    EditEntriModalComponent,
    PencarianComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN'
    }),
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

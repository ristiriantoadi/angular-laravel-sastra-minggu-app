import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LaporanPemuatanService } from '../laporan-pemuatan.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-karya-saya',
  templateUrl: './karya-saya.component.html',
  styleUrls: ['./karya-saya.component.css']
})
export class KaryaSayaComponent implements OnInit {

  entris
  totalRecords
  currentPage=1

  @Output() public notificationsRead = new EventEmitter();

  constructor(private laporanPemuatanService:LaporanPemuatanService, private notificationService:NotificationService) { }

  ngOnInit(): void {
    this.laporanPemuatanService.getEntriSpecificUserPengarang().subscribe(data=>{
      this.entris=data.entris;
    },
    error=>{
      console.log(error)
    })
  }

}

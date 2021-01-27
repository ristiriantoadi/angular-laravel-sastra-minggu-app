import { Component, OnInit } from '@angular/core';
import { LaporanPemuatanService } from '../laporan-pemuatan.service';

@Component({
  selector: 'app-laporan-pemuatan-user',
  templateUrl: './laporan-pemuatan-user.component.html',
  styleUrls: ['./laporan-pemuatan-user.component.css']
})
export class LaporanPemuatanUserComponent implements OnInit {

  entris
  totalRecords
  currentPage=1

  constructor(private laporanPemuatanService:LaporanPemuatanService) { }

  ngOnInit(): void {
    this.updateDataLaporanPemuatan()
  }

  updateDataLaporanPemuatan(){
    this.laporanPemuatanService.getLaporanPemuatan()
    .subscribe(data=>{
      this.entris = data.entris
      this.totalRecords = this.entris.length;
      console.log(this.entris);
    },
    error=>{
      console.log(error)
    })
  }

}

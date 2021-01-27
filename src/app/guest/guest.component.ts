import { Component, OnInit } from '@angular/core';
import { IEntri } from '../IEntri';
import { LaporanPemuatanService } from '../laporan-pemuatan.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  entris=[]
  totalRecords
  currentPage=1

  constructor(private laporanPemuatanService:LaporanPemuatanService) { }

  ngOnInit(): void {
    this.laporanPemuatanService.getLaporanPemuatan()
    .subscribe(data=>{
      this.entris = data.entris
      this.totalRecords = this.entris.length;
    },
    error=>{
      console.log(error)
    })
  }
  

}

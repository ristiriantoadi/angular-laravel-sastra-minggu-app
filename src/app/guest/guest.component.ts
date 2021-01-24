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

  constructor(private laporanPemuatanService:LaporanPemuatanService) { }

  ngOnInit(): void {
    this.laporanPemuatanService.getLaporanPemuatan()
    .subscribe(data=>{
      // this.employees = data
      // console.log(this.employees)
      this.entris = data.entris;
      console.log(this.entris)
    },
    error=>{
      console.log(error)
    })
  }

}

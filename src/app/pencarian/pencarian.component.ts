import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LaporanPemuatanService } from '../laporan-pemuatan.service';

@Component({
  selector: 'app-pencarian',
  templateUrl: './pencarian.component.html',
  styleUrls: ['./pencarian.component.css']
})
export class PencarianComponent implements OnInit {

  pencarianForm

  @Output() public searchDone = new EventEmitter();


  constructor(private formBuilder: FormBuilder,private laporanPemuatanService:LaporanPemuatanService) {}

  ngOnInit(): void {

    const date = new Date()
    const tanggalMuatAwal = `${date.getFullYear()}-01-01`
    const tanggalMuatAkhir = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`
    console.log(tanggalMuatAkhir)

    this.pencarianForm = this.formBuilder.group({
      namaJudulMedia: '',
      tanggalMuatAwal,
      tanggalMuatAkhir
    });
  }

  onSubmit(){

    const dataPencarian = {
      namaJudulMedia:this.pencarianForm.value.namaJudulMedia,
      tanggalMuatAwal:this.pencarianForm.value.tanggalMuatAwal,
      tanggalMuatAkhir:this.pencarianForm.value.tanggalMuatAkhir
    }

    this.laporanPemuatanService.search(dataPencarian).subscribe(data=>{
      console.log(data.entris)
      this.searchDone.emit({
        event:'search done',
        data:data.entris
      })
    },
    error=>{
      console.log(error)
    })    
  }

}

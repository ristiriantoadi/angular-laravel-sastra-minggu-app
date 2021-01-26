import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-pencarian',
  templateUrl: './pencarian.component.html',
  styleUrls: ['./pencarian.component.css']
})
export class PencarianComponent implements OnInit {

  pencarianForm = this.formBuilder.group({
    namaJudulMedia: null,
    tanggalMuatAwal: null,
    tanggalMuatAkhir:null
  });


  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
  }

}

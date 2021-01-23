import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { IEntri } from '../IEntri';
import { LaporanPemuatanService } from '../laporan-pemuatan.service';


@Component({
  selector: 'app-add-entri-modal',
  templateUrl: './add-entri-modal.component.html',
  styleUrls: ['./add-entri-modal.component.css']
})
export class AddEntriModalComponent implements OnInit {

  // @Input() name;//this is not necessary by the way
  fileBuktiPemuatan:File;
  dataEntri:IEntri={
    judul: null,
    namaPengarang:null,
    media:null,
    tanggalMuat:null,
    jenisKarya:null,
    buktiPemuatan:null
  };
  addEntriForm = this.formBuilder.group({
    judul: null,
    namaPengarang:null,
    media:null,
    tanggalMuat:null,
    jenisKarya:null,
    buktiPemuatan:null    
  });

  constructor(private formBuilder: FormBuilder,public activeModal:NgbActiveModal, private laporanPemuatanService:LaporanPemuatanService) {}


  ngOnInit(): void {
  }

  onSubmit(){
    this.dataEntri.judul = this.addEntriForm.value.judul;
    this.dataEntri.namaPengarang = this.addEntriForm.value.namaPengarang;
    this.dataEntri.media = this.addEntriForm.value.media;
    this.dataEntri.tanggalMuat = this.addEntriForm.value.tanggalMuat;
    this.dataEntri.jenisKarya = this.addEntriForm.value.jenisKarya;
    this.dataEntri.buktiPemuatan = this.fileBuktiPemuatan;
    this.laporanPemuatanService.addEntri(this.dataEntri,this);
  }

  handleFileInput(files: FileList) {
    console.log(files.item(0));
    this.fileBuktiPemuatan=files.item(0);
  }

  close(){
    this.activeModal.close('success');
  }

}

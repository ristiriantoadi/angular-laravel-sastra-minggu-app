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
  idPengarang=-1
  // namaPengarangTemp=""
  pengarangs = []
  dataEntri:IEntri={
    judul: null,
    namaPengarang:null,
    media:null,
    tanggalMuat:null,
    jenisKarya:null,
    buktiPemuatan:null,
    idPengarang:null
  };
  addEntriForm = this.formBuilder.group({
    judul: null,
    namaPengarang:null,
    media:null,
    tanggalMuat:null,
    jenisKarya:'cerpen',
    buktiPemuatan:null,   
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
    this.dataEntri.idPengarang = this.idPengarang;
    console.log("data entri id pengarang: "+this.dataEntri.idPengarang)
    this.laporanPemuatanService.addEntri(this.dataEntri,this);
  }

  handleFileInput(files: FileList) {
    console.log(files.item(0));
    this.fileBuktiPemuatan=files.item(0);
  }

  close(){
    this.activeModal.close('success');
  }

  getPengarangs(){
    console.log("get pengarang")
    this.laporanPemuatanService.getPengarangs(this.addEntriForm.value.namaPengarang).subscribe(data=>{
      this.pengarangs = data.pengarangs
    },
    error=>{
      console.log(error)
    })
  }

  namaPengarangChosen(){
    console.log("nama pengarang chosen")
    
    //get the namaPengarang value from form
    var namaPengarangChosen = this.addEntriForm.value.namaPengarang

    //search through the pengarangs data to see what pengarang match
    this.pengarangs.forEach((pengarang)=>{
      if(namaPengarangChosen == pengarang.nama_lengkap){
        this.idPengarang = pengarang.id
      }
    })

    console.log("id pengarang: "+this.idPengarang)
    
  }

}

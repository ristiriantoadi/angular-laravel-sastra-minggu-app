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

  fileBuktiPemuatan:File;
  
  idPengarang=0

  errorFileBukanGambar=false;
  errorJudulKosong=false;
  errorNamaPengarangKosong=false;
  errorMediaKosong = false;
  errorTanggalMuatKosong = false;
  errorBuktiPemuatanKosong = false;

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

    //reset error message
    this.errorBuktiPemuatanKosong=false;
    this.errorFileBukanGambar=false;
    this.errorJudulKosong=false;
    this.errorMediaKosong=false;
    this.errorNamaPengarangKosong=false;
    this.errorTanggalMuatKosong=false;

    //cek apakah form tidak lengkap
    if(this.addEntriForm.value.judul == '' || this.addEntriForm.value.namaPengarang == '' 
    || this.addEntriForm.value.media == '' || this.addEntriForm.value.tanggalMuat == ''
    || this.fileBuktiPemuatan == null || this.addEntriForm.value.judul == null || this.addEntriForm.value.namaPengarang == null 
    || this.addEntriForm.value.media == null || this.addEntriForm.value.tanggalMuat == null){
      if(this.addEntriForm.value.judul == '' || this.addEntriForm.value.judul == null){
        this.errorJudulKosong = true;
      }

      if(this.addEntriForm.value.namaPengarang == '' || this.addEntriForm.value.namaPengarang == null){
        this.errorNamaPengarangKosong = true;
      }
      
      if(this.addEntriForm.value.media == '' || this.addEntriForm.value.media == null){
        this.errorMediaKosong = true;
      }

      if(this.addEntriForm.value.tanggalMuat == '' || this.addEntriForm.value.tanggalMuat == null){
        this.errorTanggalMuatKosong = true;
      }

      if(this.fileBuktiPemuatan == null){
        this.errorBuktiPemuatanKosong = true;
      }

      return;
    }

    //cek apakah file adalah gambar
    if(!this.isFileGambar()){
      this.errorFileBukanGambar=true;
      return;
    }
    
    this.dataEntri.judul = this.addEntriForm.value.judul;
    this.dataEntri.namaPengarang = this.addEntriForm.value.namaPengarang;
    this.dataEntri.media = this.addEntriForm.value.media;
    this.dataEntri.tanggalMuat = this.addEntriForm.value.tanggalMuat;
    this.dataEntri.jenisKarya = this.addEntriForm.value.jenisKarya;
    this.dataEntri.buktiPemuatan = this.fileBuktiPemuatan;
    this.dataEntri.idPengarang = this.idPengarang;

    this.laporanPemuatanService.addEntri(this.dataEntri,this);
  }

  isFileGambar(){
    var format=this.fileBuktiPemuatan.name.split(".")[1]
    if(format == "jpg" || format == "png" || format == "jpeg"){
      return true;
    }
    return false;
  }

  handleFileInput(files: FileList) {
    this.fileBuktiPemuatan=files.item(0);
  }

  close(){
    this.activeModal.close('success');
  }

  getPengarangs(){
    this.laporanPemuatanService.getPengarangs(this.addEntriForm.value.namaPengarang).subscribe(data=>{
      this.pengarangs = data.pengarangs
    },
    error=>{
      console.log(error)
    })
  }

  namaPengarangChosen(){
    
    //get the namaPengarang value from form
    var namaPengarangChosen = this.addEntriForm.value.namaPengarang

    //search through the pengarangs data to see what pengarang match
    var pengarangMatch=false
    this.pengarangs.forEach((pengarang)=>{
      if(namaPengarangChosen == pengarang.nama_lengkap){
        this.idPengarang = pengarang.id
        pengarangMatch=true
      }
    })
    if(pengarangMatch==false){
      this.idPengarang=0
    }
    
  }

}

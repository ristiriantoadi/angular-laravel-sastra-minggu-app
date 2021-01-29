import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { LaporanPemuatanService } from '../laporan-pemuatan.service';


@Component({
  selector: 'app-edit-entri-modal',
  templateUrl: './edit-entri-modal.component.html',
  styleUrls: ['./edit-entri-modal.component.css']
})
export class EditEntriModalComponent implements OnInit {
  
  pengarangs=[]
  idPengarang=0
  fileBuktiPemuatan
  namaPengarangChanged=false
  errorFileBukanGambar=false;
  errorJudulKosong=false;
  errorNamaPengarangKosong=false;
  errorMediaKosong = false;
  errorTanggalMuatKosong = false;
  @Input() entri;
  editEntriForm = this.formBuilder.group({
    judul: '',
    namaPengarang:'',
    media:'',
    tanggalMuat:'',
    jenisKarya:'',
    buktiPemuatan:'',   
  });

  constructor(public activeModal:NgbActiveModal,private formBuilder: FormBuilder, 
              private laporanPemuatanService:LaporanPemuatanService) {}

  ngOnInit(): void {
    this.editEntriForm.controls['judul'].setValue(this.entri.judul_karya);
    this.editEntriForm.controls['namaPengarang'].setValue(this.entri.nama_pengarang);
    this.editEntriForm.controls['media'].setValue(this.entri.media);
    this.editEntriForm.controls['tanggalMuat'].setValue(this.entri.tanggal_muat);
    this.editEntriForm.controls['jenisKarya'].setValue(this.entri.jenis_karya);
  }

  handleFileInput(files: FileList) {
    // console.log(files.item(0));
    this.fileBuktiPemuatan=files.item(0);
  }

  namaPengarangChosen(){
    //get the namaPengarang value from form
    var namaPengarangChosen = this.editEntriForm.value.namaPengarang
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
    this.namaPengarangChanged=true
  }

  getPengarangs(){
    this.laporanPemuatanService.getPengarangs(this.editEntriForm.value.namaPengarang).subscribe(data=>{
      this.pengarangs = data.pengarangs
    },
    error=>{
      console.log(error)
    })
  }

  onSubmit(){
    //reset error message
    this.errorFileBukanGambar=false;
    this.errorJudulKosong=false;
    this.errorMediaKosong=false;
    this.errorNamaPengarangKosong=false;
    this.errorTanggalMuatKosong=false;
    //cek apakah form tidak lengkap
    if(this.editEntriForm.value.judul == '' || this.editEntriForm.value.namaPengarang == '' 
    || this.editEntriForm.value.media == '' || this.editEntriForm.value.tanggalMuat == ''
    || this.editEntriForm.value.judul == null || this.editEntriForm.value.namaPengarang == null 
    || this.editEntriForm.value.media == null || this.editEntriForm.value.tanggalMuat == null){
      if(this.editEntriForm.value.judul == '' || this.editEntriForm.value.judul == null){
        this.errorJudulKosong = true;
      }
      if(this.editEntriForm.value.namaPengarang == '' || this.editEntriForm.value.namaPengarang == null){
        this.errorNamaPengarangKosong = true;
      }
      if(this.editEntriForm.value.media == '' || this.editEntriForm.value.media == null){
        this.errorMediaKosong = true;
      }
      if(this.editEntriForm.value.tanggalMuat == '' || this.editEntriForm.value.tanggalMuat == null){
        this.errorTanggalMuatKosong = true;
      }
      return;
    }
    //cek apakah file adalah gambar
    if(this.fileBuktiPemuatan){
      if(!this.isFileGambar()){
        this.errorFileBukanGambar=true;
        return;
      }
    }
    if(!this.namaPengarangChanged){ 
      this.idPengarang = this.entri.user_id_pengarang
    }
    const entri = {
      judul:this.editEntriForm.value.judul,
      namaPengarang:this.editEntriForm.value.namaPengarang,
      media:this.editEntriForm.value.media,
      tanggalMuat:this.editEntriForm.value.tanggalMuat,
      jenisKarya:this.editEntriForm.value.jenisKarya,
      fileBuktiPemuatan:this.fileBuktiPemuatan,
      id:this.entri.id,
      idPengarang:this.idPengarang
    }
    this.laporanPemuatanService.editEntri(entri)
    .subscribe(data=>{
      this.activeModal.close("success")
    },
    error=>{
      console.log(error)
    })
  }

  isFileGambar(){
    var format=this.fileBuktiPemuatan.name.split(".")[1]
    if(format == "jpg" || format == "png" || format == "jpeg"){
      return true;
    }
    return false;
  }

}

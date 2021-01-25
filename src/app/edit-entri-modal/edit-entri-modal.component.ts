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
  idPengarang

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
    
    console.log(this.editEntriForm.value.judul)
  }

  handleFileInput(files: FileList) {
    console.log(files.item(0));
    // this.file=files.item(0);
  }

  namaPengarangChosen(){
    
    //get the namaPengarang value from form
    var namaPengarangChosen = this.editEntriForm.value.namaPengarang

    //search through the pengarangs data to see what pengarang match
    this.pengarangs.forEach((pengarang)=>{
      if(namaPengarangChosen == pengarang.nama_lengkap){
        this.idPengarang = pengarang.id
      }
    })
    
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
    console.log("submit")
  }

}

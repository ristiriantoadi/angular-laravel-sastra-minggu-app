import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-add-entri-modal',
  templateUrl: './add-entri-modal.component.html',
  styleUrls: ['./add-entri-modal.component.css']
})
export class AddEntriModalComponent implements OnInit {

  // @Input() name;//this is not necessary by the way
  AddEntriForm = this.formBuilder.group({
    judul: null,
    namaPengarang:null,
    media:null,
    tanggalMuat:null,
    jenisKarya:null    
  });

  constructor(private formBuilder: FormBuilder,public activeModal:NgbActiveModal) {}


  ngOnInit(): void {
  }

  onSubmit(){
    // console.log(this.loginForm.value.username)
    // console.log(this.loginForm.value.password)
    // this.loginForm.reset();
  }

}

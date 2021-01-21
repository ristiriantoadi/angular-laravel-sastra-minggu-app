import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent implements OnInit {

  error=false

  registerForm = this.formBuilder.group({
    username: '',
    password: '',
    konfirmasiPassword:''
  });

  constructor(private formBuilder: FormBuilder,public activeModal:NgbActiveModal) {}

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.registerForm.value.username)
    console.log(this.registerForm.value.password)
    console.log(this.registerForm.value.konfirmasiPassword)
    this.registerForm.reset();
  }

}

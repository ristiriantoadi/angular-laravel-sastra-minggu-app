import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent implements OnInit {

  error=false
  errorUsername=false
  errorKonfirmasiPassword=false
  
  errorUsernameKosong=false
  errorNamaLengkapKosong=false
  errorPasswordKosong=false
  errorKonfirmasiPasswordKosong=false

  registerForm = this.formBuilder.group({
    username: '',
    namaLengkap:'',
    password: '',
    konfirmasiPassword:''
  });

  constructor(private formBuilder: FormBuilder,public activeModal:NgbActiveModal,private auth:AuthService) {}

  ngOnInit(): void {
  }

  onSubmit(){
    
    //reset error message
    this.errorKonfirmasiPassword = false;
    this.errorUsername = false;
    
    this.errorPasswordKosong=false;
    this.errorKonfirmasiPasswordKosong = false;
    this.errorUsernameKosong = false;
    this.errorNamaLengkapKosong = false;
    

    //form tidak lengkap
    if(this.registerForm.value.username == '' || this.registerForm.value.namaLengkap == ''
    || this.registerForm.value.password == '' || this.registerForm.value.konfirmasiPassword == ''){
      if(this.registerForm.value.username == ''){
        this.errorUsernameKosong = true;
      }
      if(this.registerForm.value.namaLengkap == ''){
        this.errorNamaLengkapKosong = true;
      }
      if(this.registerForm.value.password == ''){
        this.errorPasswordKosong = true;
      }
      if(this.registerForm.value.konfirmasiPassword == ''){
        this.errorKonfirmasiPasswordKosong = true;
      }
      return;
    }

    //konfirmasi password salah
    if(this.registerForm.value.password != this.registerForm.value.konfirmasiPassword){
      this.errorKonfirmasiPassword = true;
      return;
    }

    this.auth.register(this.registerForm.value.username,
                        this.registerForm.value.password,
                        this.registerForm.value.namaLengkap)
  }

}

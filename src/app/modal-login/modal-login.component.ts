import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {

  error=false;
  errorUsernameKosong=false
  errorPasswordKosong=false

  loginForm = this.formBuilder.group({
    username: null,
    password: null
  });

  constructor(public activeModal:NgbActiveModal,private formBuilder: FormBuilder, private authService:AuthService) {}


  ngOnInit(): void {
  }

  showError(){
    this.error=true
  }

  closeModal(){
    this.activeModal.dismiss('Cross click')
  }

  onSubmit(){
    //reset error
    this.error=false;
    this.errorPasswordKosong=false;
    this.errorUsernameKosong = false;

    //cek apakah form lengkap
    if(this.loginForm.value.username == null || this.loginForm.value.password == null 
      ||this.loginForm.value.username == '' || this.loginForm.value.password == ''){
      console.log("Form tidak lengkap")
      
      if(this.loginForm.value.username == '' || this.loginForm.value.username == null){
        this.errorUsernameKosong = true;
      }
      if(this.loginForm.value.password == '' || this.loginForm.value.password == null){
        this.errorPasswordKosong = true;
      }
      return;
    }

    this.authService.authenticate(this.loginForm.value.username,this.loginForm.value.password,this);
    
  }

}

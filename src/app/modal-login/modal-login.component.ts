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

  // @Input() name;

  loginForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  constructor(public activeModal:NgbActiveModal,private formBuilder: FormBuilder, private authService:AuthService) {}


  ngOnInit(): void {
  }

  closeModal(){
    this.activeModal.dismiss('Cross click')
  }

  onSubmit(){
    this.authService.authenticate(this.loginForm.value.username,this.loginForm.value.password,this);
    // this.loginForm.reset();
  }

}

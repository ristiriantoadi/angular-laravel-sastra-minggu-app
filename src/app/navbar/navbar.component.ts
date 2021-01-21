import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth.service';
import { ModalLoginComponent } from '../modal-login/modal-login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  collapsed = true;
  loggedIn
  username

  constructor(private modalService: NgbModal, private auth:AuthService) {

  }

  ngOnInit(): void {
    if(this.auth.isAuthenticated("admin") || this.auth.isAuthenticated("user")){
      this.loggedIn = true;
      this.username = this.auth.getUsername()
    }else{
      this.loggedIn=false;
    }
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  openLoginModal(){
    const modalRef = this.modalService.open(ModalLoginComponent);
    modalRef.componentInstance.name = 'World';
  }

}

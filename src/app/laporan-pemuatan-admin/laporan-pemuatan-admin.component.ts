import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEntriModalComponent } from '../add-entri-modal/add-entri-modal.component';

@Component({
  selector: 'app-laporan-pemuatan-admin',
  templateUrl: './laporan-pemuatan-admin.component.html',
  styleUrls: ['./laporan-pemuatan-admin.component.css']
})
export class LaporanPemuatanAdminComponent implements OnInit {

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
  }

  openAddEntriModal(){
    const modalRef = this.modalService.open(AddEntriModalComponent,{ size: 'xl',centered:true});
    // modalRef.componentInstance.name = 'World';//this is not necessary
  }

}

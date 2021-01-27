import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEntriModalComponent } from '../add-entri-modal/add-entri-modal.component';
import { LaporanPemuatanService } from '../laporan-pemuatan.service';

@Component({
  selector: 'app-laporan-pemuatan-user',
  templateUrl: './laporan-pemuatan-user.component.html',
  styleUrls: ['./laporan-pemuatan-user.component.css']
})
export class LaporanPemuatanUserComponent implements OnInit {

  entris
  totalRecords
  currentPage=1

  constructor(private modalService: NgbModal,private laporanPemuatanService:LaporanPemuatanService) { }

  ngOnInit(): void {
    this.updateDataLaporanPemuatan()
  }

  updateDataLaporanPemuatan(){
    this.laporanPemuatanService.getLaporanPemuatan()
    .subscribe(data=>{
      this.entris = data.entris
      this.totalRecords = this.entris.length;
      console.log(this.entris);
    },
    error=>{
      console.log(error)
    })
  }

  openAddEntriModal(){
    //open modal
    const modalRef = this.modalService.open(AddEntriModalComponent,{ size: 'xl',centered:true});
    
    //callback when adding entri is done
    modalRef.result.then((result) => {
      this.updateDataLaporanPemuatan();
    }, (reason) => {
      console.log('Dismissed action: ' + reason);
    });
  }

  acceptTaskbarEvent(event){
    if(event.event == "open addEntriModal"){
      this.openAddEntriModal()
    }else if(event.event == "search done"){
      this.entris = event.data
    }
  }

}

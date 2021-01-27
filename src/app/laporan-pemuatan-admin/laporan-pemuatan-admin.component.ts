import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEntriModalComponent } from '../add-entri-modal/add-entri-modal.component';
import { EditEntriModalComponent } from '../edit-entri-modal/edit-entri-modal.component';
import { LaporanPemuatanService } from '../laporan-pemuatan.service';

@Component({
  selector: 'app-laporan-pemuatan-admin',
  templateUrl: './laporan-pemuatan-admin.component.html',
  styleUrls: ['./laporan-pemuatan-admin.component.css']
})
export class LaporanPemuatanAdminComponent implements OnInit {

  constructor(private modalService: NgbModal,private laporanPemuatanService:LaporanPemuatanService) {}

  entris=[]
  totalRecords
  currentPage=1

  ngOnInit(): void {
    this.updateDataLaporanPemuatan();
  }

  
  updateDataLaporanPemuatan(){
    this.laporanPemuatanService.getLaporanPemuatan()
    .subscribe(data=>{
      this.entris = data.entris
      this.totalRecords = this.entris.length;
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

  acceptTaskbarEvent(message){
    if(message.event == "open addEntriModal"){
      this.openAddEntriModal()
    }else if(message.event == "search done"){
      this.entris = message.data
    }
  }

  
  hapusEntri(id:any){
    if(confirm("Anda yakin ingin menghapus entri?")){
      this.laporanPemuatanService.hapusEntri(id).subscribe(data=>{
        this.updateDataLaporanPemuatan()
      },
      error=>{
        console.log(error)
      })
    }
  }

  editEntri(id:any){
    this.laporanPemuatanService.getEntriEdit(id)
    .subscribe(data=>{
      //open modal edit entri
      const modalRef = this.modalService.open(EditEntriModalComponent);
      modalRef.componentInstance.entri = data.entri;
      modalRef.result.then((result) => {
        this.updateDataLaporanPemuatan();
      }, (reason) => {
        console.log('Dismissed action: ' + reason);
      });
    },
    error=>{
      console.log(error)
    })
  }

  

}

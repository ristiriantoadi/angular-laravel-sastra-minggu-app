import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable,throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LaporanPemuatanService {

  constructor(private http:HttpClient) { }

  addEntri(entri,modal){
    //create form data object
    const formData: FormData = new FormData();
    formData.append('judul', entri.judul);
    formData.append('namaPengarang', entri.namaPengarang);
    formData.append('media', entri.media);
    formData.append('tanggalMuat', entri.tanggalMuat);
    formData.append('jenisKarya', entri.jenisKarya);
    formData.append('fileBuktiPemuatan', entri.buktiPemuatan);
    formData.append('idPengarang', entri.idPengarang);

    //send request to add new entri 
    this.http.post<any>("api/laporan_pemuatan/add",formData,{ withCredentials: true }).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error || "server error")
      })
    ).subscribe(data=>{
      if(data.message == "success"){
        modal.close();
      }
    },
    error=>{
      console.log(error)
    })
  }
  
  //get all entri of laporan pemuatan
  getLaporanPemuatan():Observable<any>{
    return this.http.get<any>("api/laporan_pemuatan").pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error || "server error")
      })
    )
  }      

  //get list of pengarang when adding new entri
  getPengarangs(nama):Observable<any>{
    return this.http.get<any>("api/laporan_pemuatan/add/get_list_pengarang?nama-pengarang="+nama).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error || "server error")
      })
    )
  }

  hapusEntri(id:any):Observable<any>{
    return this.http.post("api/laporan_pemuatan/delete",{id},{withCredentials:true}).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error || "server error")
      })
    )
  }

  //get entri to be edited
  getEntriEdit(id):Observable<any>{
    return this.http.get<any>("api/laporan_pemuatan/edit?id="+id).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error || "server error")
      })
    )
  }

}

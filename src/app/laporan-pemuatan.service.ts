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
    const formData: FormData = new FormData();
    formData.append('judul', entri.judul);
    formData.append('namaPengarang', entri.namaPengarang);
    formData.append('media', entri.media);
    formData.append('tanggalMuat', entri.tanggalMuat);
    formData.append('jenisKarya', entri.jenisKarya);
    formData.append('fileBuktiPemuatan', entri.buktiPemuatan);
    this.http.post<any>("api/laporan_pemuatan/add",formData,{ withCredentials: true }).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error || "server error")
      })
    ).subscribe(data=>{
      if(data.message == "success"){
        modal.close();
        // this.getLaporanPemuatan();
      }
    },
    error=>{
      console.log(error)
    })
  }

  getLaporanPemuatan():Observable<any>{
    return this.http.get<any>("api/laporan_pemuatan").pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error || "server error")
      })
    )
  }      
}

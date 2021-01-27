import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpClient,private authService:AuthService) { }

  getNotifications():Observable<any>{ //http request done in here
    return this.http.get<any>("/api/user/notifications",{withCredentials:true}).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error || "server error")
      })
    )
  }

  readNotifications():Observable<any>{ //http request done in here
    return this.http.post<any>("/api/user/notifications",{},{withCredentials:true}).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error || "server error")
      })
    )
  }

}

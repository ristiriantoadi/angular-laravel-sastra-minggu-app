import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IUser } from './IUser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IRegisterMessage } from './IRegisterMessage';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router, private http:HttpClient) { }

  public setUserData(user){
    localStorage.setItem("username",user.username)
    localStorage.setItem("namaLengkap",user.namaLengkap)
    localStorage.setItem("role",user.role)
    localStorage.setItem("id",user.id.toString())
  }

  public authenticate(username,password,loginModal){
    this.http.get('/sanctum/csrf-cookie').pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error || "server error")
      })
    ).subscribe(data=>{
        this.http.post<IUser>('/login',{username,password},{ withCredentials: true }).pipe(
        catchError((error:HttpErrorResponse)=>{
          return throwError(error || "server error")
        })
      ).subscribe(user=>{
        
        this.setUserData(user)
        if(user.role === "admin"){
          this.router.navigate(['admin','laporan_pemuatan']);
        }else{
          this.router.navigate(['user','laporan_pemuatan'])
        }

        loginModal.closeModal();
        loginModal.loginForm.reset();

      },
        error=>{
          console.log(error)
          loginModal.loginForm.reset();
          loginModal.showError();
      })
    },
    error=>{
      console.log(error)
      loginModal.loginForm.reset();
      loginModal.showError();
    })
  }

  getUsername(){
    return localStorage.getItem("username");
  }

  getUserId(){
    return localStorage.getItem("id");
  }

  logout(){
    return this.http.post("/logout",{},{ withCredentials: true }).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error || "server error")
      })
    ).subscribe(data=>{
        localStorage.removeItem("role")
        localStorage.removeItem("username")
        localStorage.removeItem("namaLengkap")
        localStorage.removeItem("id")
        this.router.navigate([''])
    },
    error=>{
      console.log(error)
    })
  }

  public register(username,password,namaLengkap,registerModal){
    
    //send request to /sanctum/csrf-cookie and then the register/user endpoint
    this.http.get('/sanctum/csrf-cookie').pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error || "server error")
      })
    ).subscribe(data=>{
      this.http.post<IRegisterMessage>("/register/user",{username,password,namaLengkap},{ withCredentials: true }).pipe(
        catchError((error:HttpErrorResponse)=>{
          return throwError(error || "server error")
        })
      ).subscribe(data=>{
        if(data.message == "username tidak tersedia"){
          registerModal.showErrorUsernameTidakTersedia()
        }else if(data.message == "success"){
          this.setUserData(data.user)
          this.router.navigate(['user','laporan_pemuatan'])
          registerModal.closeModal();
          registerModal.registerForm.reset();
        }
      },
      error=>{
        console.log(error)
      })
    },
    error=>{
      console.log(error)
    })
  }  

  public isAuthenticated(role){
    if(localStorage.getItem("role") == role)
      return true
    return false
  }
}

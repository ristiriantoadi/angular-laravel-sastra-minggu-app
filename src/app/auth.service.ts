import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IUser } from './IUser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router, private http:HttpClient) { }

  //ini pake satu method authenticate aja, toh mau user mau admin, endpoint-nya sama2 login
  //balikan dari servernya mestinya Auth:user(), terus dari situ diliat rolenya, dan diredirect
  //berdasarkan role itu, entah ke AdminComponent atau ke UserComponent

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

        localStorage.setItem("username",user.username)
        localStorage.setItem("namaLengkap",user.namaLengkap)
        localStorage.setItem("role",user.role)
        localStorage.setItem("id",user.id.toString())
        
        if(user.role === "admin"){
          this.router.navigate(['admin']);
        }else{
          this.router.navigate(['user'])
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

  logout(){
    return this.http.post("/logout",{},{ withCredentials: true }).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error || "server error")
      })
    ).subscribe(data=>{
        console.log(data)
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

  public register(username,password,namaLengkap){
    console.log("register")
    console.log("Username: "+username)
    console.log("Password: "+password)
    console.log("Nama Lengkap: "+namaLengkap)

    this.http.post("/register/user",{username,password,namaLengkap},{ withCredentials: true }).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error || "server error")
      })
    ).subscribe(data=>{
      console.log(data)
    },
    error=>{
      console.log(error)
    })
    
  }

  public isAuthenticated(role){
    // if(localStorage.getItem("loggedIn") == "true"){
    if(localStorage.getItem("role") == role)
      return true
    return false
  }

  // public isAuthenticatedUser(){
  //   if(localStorage.getItem("role") == "user")
  //     return true
    
  //   return false
  // }

  // public logout(){
  //   localStorage.removeItem("role")
  //   this.router.navigate(['/login'])
  // }
}

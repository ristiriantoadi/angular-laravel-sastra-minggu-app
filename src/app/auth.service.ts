import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router, private http:HttpClient) { }

  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  //ini pake satu method authenticate aja, toh mau user mau admin, endpoint-nya sama2 login
  //balikan dari servernya mestinya Auth:user(), terus dari situ diliat rolenya, dan diredirect
  //berdasarkan role itu, entah ke AdminComponent atau ke UserComponent

  public authenticateAdmin(username,password){
    
    this.http.get('/sanctum/csrf-cookie').pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error || "server error")
      })
    ).subscribe(data=>{
      console.log(this.getCookie("laravel_session"))
        this.http.post('/login',{username,password},{ withCredentials: true }).pipe(
        catchError((error:HttpErrorResponse)=>{
          return throwError(error || "server error")
        })
      ).subscribe(data=>{
        console.log(data)
      },
        error=>{
          console.log(error)
      })
    },
    error=>{
      console.log(error)
    })
  }

  public authenticateUser(){
    //do all the sending to server authentication thing here
    // localStorage.setItem("loggedIn", "true");
    localStorage.setItem("role","user")
    this.router.navigate(['/user'])
  }

  // public isAuthenticatedAdmin(){
  //   // if(localStorage.getItem("loggedIn") == "true"){
  //   if(localStorage.getItem("role") == "admin")
  //     return true
  //   return false
  // }

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

  public logout(){
    localStorage.removeItem("role")
    this.router.navigate(['/login'])
  }
}

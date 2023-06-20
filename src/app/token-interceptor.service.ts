import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HttpHeaders} from '@angular/common/http'
import { Observable,of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private route: ActivatedRoute, 
    private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.url.indexOf('/login') == -1 && req.url.indexOf('/saveuser') == -1 ){
      if(window.localStorage.getItem('token') == undefined){
        this.router.navigate(['login']);
      throw console.error();
      
      }
      else{
      req= req.clone({
        setHeaders: {Authorization: `Bearer ${window.localStorage.getItem('token')}`}
       })
      return next.handle(req)
      }
      }
      else{
        return next.handle(req)
      }
      
  }
}
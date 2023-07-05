import { Injectable } from '@angular/core';
import { LoginI } from '../../models/login.interface';
import {ResponsiveI} from '../../models/response.interface'
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from "./user"
import { catchError } from 'rxjs/operators';
import { throwError  as observableThrowError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = 'http://localhost:3001/api/';

  currentUserLoginOn : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({_id:'', email:''})
  constructor(private http:HttpClient) { }



  loginByemail(from:LoginI):Observable<ResponsiveI>{
    let direccion = this.url + "login"
    return this.http
                    .post<ResponsiveI>(direccion,from)
                    .pipe(
                      catchError(this.errorHandle)
                    )
  }

  errorHandle(error: HttpErrorResponse){
    return observableThrowError(error.message)
  }

}

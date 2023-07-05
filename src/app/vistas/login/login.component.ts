import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ApiService } from '../../servicios/api/api.service'
import { LoginI } from  '../../models/login.interface'
import  {ResponsiveI} from '../../models/response.interface'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   public loginForm = new FormGroup({
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    getToken: new FormControl('true',Validators.required)
  })
constructor ( private api:ApiService, private roter: Router){}

errorStatus:boolean = false;
errorMsj = ""
mensaje= ""
user={}
token:any


  ngOnInit(): void {
    
  }

  onLogin(form:any){
    this.api.loginByemail(form).subscribe(data => {
      let dataResponse:ResponsiveI = data
      localStorage.setItem("token", dataResponse.token)
      console.log
      this.roter.navigate(["dashboard"])
    }, error => {this.errorMsj=error
    
      if (this.errorMsj.length == 0){
        console.log("dentro del if")
        this.roter.navigate(["dashboard"])
        
   
       }else{
         console.log("fuera del if")
         this.mensaje= "Ingrese los datos correctos"
       }
    })
    
  }
}

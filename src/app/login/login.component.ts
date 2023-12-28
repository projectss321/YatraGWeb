import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AlertEnum, Global, message } from '../Globals/global';
import { first } from 'rxjs';
import { HelperService } from '../services/helperservice.service';
import { AlertService } from '../services/alert.service';
import { userRegistration } from '../models/registration';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  user:any = "";
  pass: any = "";
  public userModel: userRegistration = new userRegistration();
  constructor(private http:HttpClient, private helperservice: HelperService, private alertservice : AlertService, private router: Router){

  }

  ngOnInit(): void {
    localStorage.clear();
  }
  userName = new FormControl(this.user, Validators.required);
  password = new FormControl(this.pass, Validators.required)

  onLogin(){
    this.userModel.emailid = this.userName.value;
    this.userModel.password = this.password.value;
this.http.post(Global.baseUrl + "user/login", this.userModel).pipe(first()).subscribe((res:any) => {
if(!this.helperservice.isnullOrEmpty(res) && !this.helperservice.isnullOrEmpty(res?.Data) && res.status == "1"){
   this.helperservice.setInLocalStorage('loggedUserInfo',res?.Data);
   this.helperservice.setInLocalStorage('isloogedin', "1", false);
  this.alertservice.Alert(AlertEnum.Info, message.login);
  this.router.navigateByUrl("/Home");
}else{
  this.alertservice.Alert(AlertEnum.Info, message.invalidid);
}
});
  }
}

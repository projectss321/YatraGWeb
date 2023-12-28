import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { otp, userRegistration } from '../models/registration';
import { HttpClient } from '@angular/common/http';
import { AlertEnum, Global, message } from '../Globals/global';
import { commonfunction } from '../Globals/commonfunction';
import { first } from 'rxjs';
import { HelperService } from '../services/helperservice.service';
import { AlertService } from '../services/alert.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { OtpComponent } from '../otp/otp.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class RegistrationComponent implements OnInit {
  userName: string = "";
  usermobile: number = 0;
  userpassword: string = "";
  public userRegistration: userRegistration = new userRegistration();

  constructor(private http: HttpClient
    , private _helperservice: HelperService
    , private alertservice: AlertService
    , private modalservice: NgbModal
    , private _router: Router
  ) {

  }
  ngOnInit() {

  }
  user = new FormControl(this.userName,[Validators.required]);
  mobile = new FormControl(this.usermobile,[Validators.required,Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]);
  password = new FormControl(this.userpassword,[Validators.required]);
  //,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}') 
  // At least 6 characters in length
  // Lowercase letters
  // Uppercase letters
  // Numbers Special characters
  onSubmit() {
    this.userRegistration.emailid = this.user.value;
    this.userRegistration.mobile = this.mobile.value;
    this.userRegistration.password = this.password.value;

    this.http.post(Global.baseUrl + "user/saveUpdateUser", this.userRegistration).pipe(first()).subscribe((res: any) => {
      if (!this._helperservice.isnullOrZero(res) && res.status == "1" && res.message == "user inserted") {
        this.sendOtp();
      } else {
        this.alertservice.Alert(AlertEnum.Info, message.nodata);
      }
    });
  }
  sendOtp() {
    this.http.post(Global.baseUrl + "user/sendOtp", this.userRegistration).pipe(first()).subscribe((res: any) => {
      if (!this._helperservice.isnullOrEmpty(res) && res.status == "1") {
        const modalref = this.modalservice.open(OtpComponent, commonfunction.NgbModalOptions());
        modalref.componentInstance.data = { data: this.userRegistration }
        modalref.result.then((res) => {
          if(res.status == "1"){
            this._router.navigateByUrl("/login");
          }
        });
        //this.alertservice.Alert(AlertEnum.Info, "otp sent on your email id");
      }else{
        this.alertservice.Alert(AlertEnum.Error, message.servererror);
      }
    });

  }

}

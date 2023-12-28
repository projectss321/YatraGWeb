import { Component, Input, OnInit } from '@angular/core';
import { HelperService } from '../services/helperservice.service';
import { AlertEnum, Global, message } from '../Globals/global';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';
import { otp } from '../models/registration';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  @Input() data: any;
  otpEmail:string = "";
  otp: any;
  public otpmodel: otp = new otp();

  constructor(private helperservice: HelperService, private http: HttpClient, private _helperservice: HelperService, private alertservice: AlertService, private _router: Router, private activeModal : NgbActiveModal){
    
  }

  ngOnInit(): void {
    $('.modal-backdrop').remove();
    this.otpEmail = (this.data?.data?.emailid).substr(-4);
    
  }
  otpConfig = {
    length:6,
    allowNumbersOnly:true,
    disableAutoFocus: false,
    inputStyles:{'width':'30px', 'height':'30px','font-size':'20px'}
  }
  onOtpChange(e:any){
    this.otp = e;
    if(!this.helperservice.isnullOrEmpty(this.otp) && this.otp.length == this.otpConfig.length){
       this.verifyOtp();
    }
  }
  verifyOtp() {
    this.otpmodel.emailid = this.data?.data?.emailid;
    this.otpmodel.mobile = this.data?.data.mobile;
    this.otpmodel.otp = this.otp;
    this.otpmodel.isdelete = 0;
    this.http.post(Global.baseUrl + "user/verifyOtp", this.otpmodel).pipe(first()).subscribe((res: any) => {
      if (!this._helperservice.isnullOrEmpty(res) && res.status == "1") {
        let data = {
          status : 1
        }
        this.activeModal.close(data);
        //this.alertservice.Alert(AlertEnum.Success, message.otpverified);
       
      }else{
        this.alertservice.Alert(AlertEnum.Error, message.invalidOtp);
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from '../services/helperservice.service';
import { HttpClient } from '@angular/common/http';
import { AlertEnum, Global, message } from '../Globals/global';
import { HttpService } from '../services/http.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit{
  compName:string = "YatraG";
  stateData: any = [];
  cityData: any = [];
  userloggedinData: any;
  statecityData: any;
  fromplace;
  toplace;
  from="From";
  constructor(private helperService : HelperService, private httpservice:HttpService, private alertservice:AlertService){
    //this.cityData = this.helperService.getFromLocalStorage("cityList");
  }
  ngOnInit(): void {
    // this.getCitiesList();

  }

//   saveBookingForm = new FormGroup({
//     fromplacelinkid: new FormControl('',[Validators.required]),
//     toplacelinkid: new FormControl('',[Validators.required]),
//       fromDate: new FormControl('',[Validators.required]),
//       toDate: new FormControl('',[Validators.required])
//   });

//   submitBookingForm(){
//     this.httpservice.postMethod(Global.saveBooking, this.saveBookingForm.value).subscribe((res:any) => {
//   if(!this.helperService.isnullOrEmpty(res)){
//     this.alertservice.Alert(AlertEnum.Success, message.bookingsuccess)
//   }else{
//     this.alertservice.Alert(AlertEnum.Error, message.servererror);
//   }
  
//     });
    
//   }
//   getCitiesList(){
//     if(this.helperService.isnullOrEmpty(this.cityData?.length) || this.cityData?.length < 1){
//     this.httpservice.getMethod(Global.getcity).subscribe((res:any) => {
//       if(!this.helperService.isnullOrEmpty(res?.Data) && res.status == "1"){
//         this.cityData = res.Data;
//        this.helperService.setInLocalStorage("cityList", res);
//         }else{
//           this.alertservice.Alert(AlertEnum.Warning,message.nodata);
//         }
//     });
//   }
// }
}


























// this.http.get("https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/cities.json").subscribe((res:any) => {
//     this.cityData = res.filter(x => x.country_id == 101);
    
//     this.http.post(Global.baseUrl + "stateCity/saveUpdateCity",this.cityData).subscribe((res:any) => {
//       this.stateData = res;
//   });
// });

// this.http.get("https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/states%2Bcities.json").subscribe((res:any) => {
//     this.statecityData = res;
// });

// this.http.get("https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/states.json").subscribe((res:any) => {
//     this.stateData = res.filter(x => x.country_code == "IN" && x.country_id == 101);;


// });
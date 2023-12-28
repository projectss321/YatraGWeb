import { DatePipe } from '@angular/common';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',

})
export class HelperService implements OnInit {

  packageData:any;
  constructor(private datePipe: DatePipe) { 

  }
  ngOnInit(): void {

  }
  isnullOrEmpty(value: string) {
    if (value === "" || value === null || value === undefined || value === 'undefined') {
      return true;
    } else {
      return false;
    }
  }

  isnullOrZero(value: any) {
    if (value == "" || value == null || value == undefined || value == 'undefined' || value == 0 || Number.isNaN(value)) {
      return true;
    } else {
      return false;
    }
  }

  setInLocalStorage(key: string, Data: any, isStringfy: boolean = true) {
    if (isStringfy) {
      localStorage.setItem(key, JSON.stringify(Data));
    } else {
      localStorage.setItem(key, Data);
    }
  }

  setInLocalStorageEnc(key: string, Data: any, isStringfy: boolean = true) {
    if (isStringfy) {
      localStorage.setItem(key, btoa(JSON.stringify(Data)));
    } else {
      localStorage.setItem(key, Data);
    }
  }

  getFromLocalStorage(key: string, isParse: boolean = true) {
    let data;
    if (isParse) {
      data = localStorage.getItem(key);
      data = JSON.parse(data);
    } else {
      data = localStorage.getItem(key);
    }
    return data;
  }
  getFromLocalStorageDec(key: string, isParse: boolean = true) {
    let data;
    if (isParse) {
      data = localStorage.getItem(key);
      if(!this.isnullOrEmpty(data)){
      data = JSON.parse(atob(data));
      }
    } else {
      data = localStorage.getItem(key);
    }
    return data;
  }

  dateformat(date: any) {
    //   var date = new Date();
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  isValidForm(formInput:Array<any>){
    var result;
    formInput.forEach(element => {
        if(element.status == "INVALID"){
         // result = element.getAttribute('formControlName');
          return;
        }else{
          result = true;
        }
    });
    return result;
  }
}

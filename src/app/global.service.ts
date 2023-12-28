import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})



export class GlobalService {

    globalTxt ={
    succcess: "testing for success action",
    compEmail: "support@yatraclub.com",
    compMobile: 999999999,
    compName: "yatraclub"
  }
  constructor() { 
    
  }

}

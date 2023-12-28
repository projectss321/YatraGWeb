import { Injectable, OnInit } from '@angular/core';
import { AlertEnum } from '../Globals/global';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from '../alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService implements OnInit {

  constructor(private modalservice:NgbModal) { }

  ngOnInit(): void {
    
  }

  Alert(type:string, message:any) : any{
    if(type == AlertEnum.Success || type == AlertEnum.Info || type == AlertEnum.Warning || type == AlertEnum.Error){
      const alertBox = this.modalservice.open(AlertComponent, {size: 'sm'});
       alertBox.componentInstance.data = {type:type,message:message};
      //  setTimeout(() => {
      //   alertBox.close(); 
      //  }, 4000);
       return alertBox
    }
  }
}

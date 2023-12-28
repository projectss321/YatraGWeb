import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homelayout',
  templateUrl: './homelayout.component.html',
  styleUrls: ['./homelayout.component.scss']
})
export class HomelayoutComponent implements OnInit{
  isShow: boolean = true;
  constructor(private router: Router){
  }
  ngOnInit() : void{

    setInterval(() => {
      let currenturl = this.router.url;
      if(currenturl == "/login" || currenturl == "/signup" || currenturl == "/registration" || currenturl.includes("/admin")){
        this.isShow = false;
      }else{
        this.isShow = true;
      }
    }, 200);

  }
}

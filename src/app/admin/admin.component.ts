import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class adminComponent {
  title = 'yatraG';
  isShow: boolean = true;

  constructor(private router: Router){

  }

  ngOnInit(){

  }
}

import { Component } from '@angular/core';
import { HelperService } from '../services/helperservice.service';
import { path } from '../Globals/global';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent {

  packageData:any;
  imgsrc = path.imgPath;
  constructor(private helperservice: HelperService){
  }
  ngOnInit(){
    this.packageData = this.helperservice.packageData;
  }
}

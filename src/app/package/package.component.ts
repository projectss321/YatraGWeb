import { Component } from '@angular/core';
import { HelperService } from '../services/helperservice.service';
import { path } from '../Globals/global';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent {

  packageData = [];
  imgsrc = "https://source.unsplash.com/random/200x200?sig=1";//path.imgPath;
  constructor(private helperservice: HelperService){
  }
  ngOnInit(){
    let data = [{
      fare: 35000,
      destination : {name: "Jai Mata Di Travellers", header: "Specialist in provide best Services and exprience!", img: this.imgsrc},
      vehicledetail: {seater: 7, vehiclename: "Ertiga"}
    },
    {
      fare: 35000,
      destination : {name: "Jai Mata Di Travellers", header: "Specialist in provide best Services and exprience!", img: this.imgsrc},
      vehicledetail: {seater: 7, vehiclename: "Ertiga"}
    },
    {
      fare: 35000,
      destination : {name: "Jai Mata Di Travellers", header: "Specialist in provide best Services and exprience!", img: this.imgsrc},
      vehicledetail: {seater: 7, vehiclename: "Ertiga"}
    },
    {
      fare: 35000,
      destination : {name: "Jai Mata Di Travellers", header: "Specialist in provide best Services and exprience!", img: this.imgsrc},
      vehicledetail: {seater: 7, vehiclename: "Ertiga"}
    },
    {
      fare: 35000,
      destination : {name: "Jai Mata Di Travellers", header: "Specialist in provide best Services and exprience!", img: this.imgsrc},
      vehicledetail: {seater: 7, vehiclename: "Ertiga"}
    },
    {
      fare: 35000,
      destination : {name: "Jai Mata Di Travellers", header: "Specialist in provide best Services and exprience!", img: this.imgsrc},
      vehicledetail: {seater: 7, vehiclename: "Ertiga"}
    },
    {
      fare: 35000,
      destination : {name: "Jai Mata Di Travellers", header: "Specialist in provide best Services and exprience!", img: this.imgsrc},
      vehicledetail: {seater: 7, vehiclename: "Ertiga"}
    },
    {
      fare: 35000,
      destination : {name: "Jai Mata Di Travellers", header: "Specialist in provide best Services and exprience!", img: this.imgsrc},
      vehicledetail: {seater: 7, vehiclename: "Ertiga"}
    },
    {
      fare: 35000,
      destination : {name: "Jai Mata Di Travellers", header: "Specialist in provide best Services and exprience!", img: this.imgsrc},
      vehicledetail: {seater: 7, vehiclename: "Ertiga"}
    },
    {
      fare: 35000,
      destination : {name: "Jai Mata Di Travellers", header: "Specialist in provide best Services and exprience!", img: this.imgsrc},
      vehicledetail: {seater: 7, vehiclename: "Ertiga"}
    },
    {
      fare: 35000,
      destination : {name: "Jai Mata Di Travellers", header: "Specialist in provide best Services and exprience!", img: this.imgsrc},
      vehicledetail: {seater: 7, vehiclename: "Ertiga"}
    },
    {
      fare: 35000,
      destination : {name: "Jai Mata Di Travellers", header: "Specialist in provide best Services and exprience!", img: this.imgsrc},
      vehicledetail: {seater: 7, vehiclename: "Ertiga"}
    },
    {
      fare: 35000,
      destination : {name: "Jai Mata Di Travellers", header: "Specialist in provide best Services and exprience!", img: this.imgsrc},
      vehicledetail: {seater: 7, vehiclename: "Ertiga"}
    },
    {
      fare: 35000,
      destination : {name: "Jai Mata Di Travellers", header: "Specialist in provide best Services and exprience!", img: this.imgsrc},
      vehicledetail: {seater: 7, vehiclename: "Ertiga"}
    },
    {
      fare: 35000,
      destination : {name: "Jai Mata Di Travellers", header: "Specialist in provide best Services and exprience!", img: this.imgsrc},
      vehicledetail: {seater: 7, vehiclename: "Ertiga"}
    }
  ]
    this.packageData = data;//this.helperservice.packageData;
  }
}

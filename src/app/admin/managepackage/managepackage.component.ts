import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { AlertEnum, Global, limits, message } from 'src/app/Globals/global';
import { cityDetail } from 'src/app/models/citymaster';
import { HelperService } from 'src/app/services/helperservice.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-managepackage',
  templateUrl: './managepackage.component.html',
  styleUrls: ['./managepackage.component.scss']
})
export class ManagepackageComponent {
  isCitySelected: boolean = false;
  cityData: any;
  alertservice: any;
  cityDetailData: any;
  selectedCityDetailData: any;
  cityLinkid: any;
  selectedCityData: any;
  isAddorEdit: string;
  isCityExist: boolean = true;
  cityDetailModel: any;
  value: any;
  dataset: any;
  name: any;
  dragEvents = ['dragenter', 'dragover', 'dragleave', 'drop'];
  dragHighlight = ['dragenter', 'dragover'];
  dragUnighlight = ['dragleave', 'drop'];
  inputRange: any = document.querySelectorAll('.editor input');

  dropArea = document.getElementById('drop-area');
  iconElement = document.querySelector('.circle');
  editorElement = document.querySelector('.editor');
  selectedFiles: Array<any> = [];
  fileToUpload:any;
  formData = new FormData();
  header:string; subhead:string; subhead2:string; subhead3:string; cityDesc:string;
  constructor(private helperService: HelperService, private httpservice: HttpService, private _http: HttpClient) {
    this.cityData = this.helperService.getFromLocalStorageDec("cityList");
    this.cityDetailData = this.helperService.getFromLocalStorage("cityDetailData");
    this.cityDetailModel = new cityDetail();
  }
  ngOnInit() {
    this.getCitiesList();
  }



  mainHead = new FormControl(["", Validators.required]);
  subHead = new FormControl(["", Validators.required]);
  subHead2 = new FormControl(["", Validators.required]);
  subHead3 = new FormControl(["", Validators.required]);
  cityDescription = new FormControl();

  // uploadFile = (files) => {
  //   if (files.length === 0) {
  //     return;
  //   }
  //   let fileToUpload = <File>files[0];
  //   const formData = new FormData();
  //   formData.append('file', fileToUpload, fileToUpload.name);
    
  //   this._http.post('https://localhost:5001/api/upload', formData, {reportProgress: true, observe: 'events'}).subscribe((res) => {
        
  //   });
  // }

  preventDefaults = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  selectCity(citylinkid: any) {
    if (citylinkid.target.value.length > 8) {
      this.findCityDetailData();
    } else {
      this.alertservice.alert(AlertEnum.Error, message.servererror)
    }
  }
  getCitiesList() {
    if (this.helperService.isnullOrEmpty(this.cityData?.length) || this.cityData?.length < 1) {
      this.httpservice.getMethod(Global.getcity).pipe(first()).subscribe((res: any) => {
        if (!this.helperService.isnullOrEmpty(res?.Data) && res.status == "1") {
          this.cityData = res.Data;
          this.helperService.setInLocalStorageEnc("cityList", this.cityData);
        } else {
          //this.alertservice.Alert(AlertEnum.Warning, message.nodata);
        }
      });
    }
  }

  getPackageData() {
    if (this.helperService.isnullOrEmpty(this.cityDetailData)) {
      this.httpservice.getMethod(Global.getCityDetail).pipe(first()).subscribe((result) => {
        if (!this.helperService.isnullOrEmpty(result.Data) && result.status == "1") {
          this.cityDetailData = result.Data;
          this.helperService.setInLocalStorage("cityDetailData", this.cityDetailData);
        } else {
          this.alertservice.Alert(AlertEnum.Warning, message.noCityDetailData);
        }
      });
    }
  }

  findCityDetailData() {
    this.selectedCityDetailData = this.cityDetailData.find(x => x.citylinkid == this.cityLinkid);
    this.selectedCityData = this.cityData.find(x => x.linkid == this.cityLinkid);
    if (!this.helperService.isnullOrEmpty(this.selectedCityDetailData)) {
      this.isCitySelected = true;
      this.isAddorEdit = "Update ";
      this.cityDetailModel.isEdit = 1;
      this.cityDetailModel.linkid = this.selectedCityData.citydetaillinkid;
      this.cityDetailModel.citylinkid = this.cityLinkid;
    } else {
      this.isCityExist = false;
      this.isCitySelected = true;
      this.isAddorEdit = "Add ";
      this.cityDetailModel.isEdit = 0;
      this.alertservice.Alert(AlertEnum.Warning, message.nodata);
    }
  }

  handleFiles (files: FileList) {

    if(files.length > 0){
        for (let i = 0; i < files.length; i++) {
          this.selectedFiles.push(files[i]);
        }
        this.uploadImage();
    }else{
      this.alertservice.alert(AlertEnum.Warning, message.imageUploadLimit) 
    }

  
    
    }
    uploadImage(){
      const frmData: FormData = new FormData();
    //this.selectedFiles.forEach((element) => frmData.append('fileList', element));
    this.httpservice.postMethod(Global.SaveUpdateCityDetail,  this.selectedFiles).pipe(first()).subscribe((res) => {
      if(!this.helperService.isnullOrEmpty(res)){

      }
    }); 

    // if(this.selectedFiles.length > 0){
    //   this.selectedFiles = [...this.selectedFiles];
    //   this.selectedFiles.forEach((element) => {
    //     const formData: FormData = new FormData();
    //     formData.append(element.name, element);
    //     this.cityDetailModel.img.push(element);
    //   });
    //   const formData: FormData = new FormData();
    //   this.selectedFiles.forEach((element) => formData.append('file', element));
    // }else{
    //   this.alertservice.alert(AlertEnum.Warning, message.imageUploadLimit) 
    // }
  };

  saveData(){
    this.cityDetailModel.header = this.mainHead.value;
    this.cityDetailModel.subheader = this.subHead.value;
    this.cityDetailModel.subheader2 = this.subHead2.value;
    this.cityDetailModel.subheader3 = this.subHead3.value;

    
  }

  handleDrop = (e) => {
    let dt = e.dataTransfer;
    let files = dt.files;

    console.log('files', files);

    this.handleFiles(files);
  };

  handleUpdate() {
    console.log(this.value);
    const suffix = this.dataset.unit;
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
  }

  finalEvents() {
    this.inputRange.forEach(input => input.addEventListener('change', this.handleUpdate));
    this.inputRange.forEach(input => input.addEventListener('mousemove', this.handleUpdate));

    this.dragEvents.forEach(eventName => {
      this.dropArea.addEventListener(eventName, this.preventDefaults, false)
    });

    this.dragHighlight.forEach(eventName => {
      this.dropArea.addEventListener(eventName, this.highlight, false)
    });

    this.dragUnighlight.forEach(eventName => {
      this.dropArea.addEventListener(eventName, this.unhighlight, false)
    });


    this.dropArea.addEventListener('drop', this.handleDrop, false);
  }
  
  highlight = () => {
    this.iconElement.classList.add('highlight');
  };

  unhighlight = () => {
    this.iconElement.classList.remove('highlight');
  };

  previewFile = (file) => {
    const editorElement = document.querySelector('.editor');
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      let img = document.createElement('img');
      img.src = reader.result as string;
      document.getElementById('gallery').appendChild(img);
      editorElement.classList.add('is-visible');
    }
  };
}


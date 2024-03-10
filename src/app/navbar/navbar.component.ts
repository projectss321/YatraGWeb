import { Component, ViewChild } from '@angular/core';
import { HelperService } from '../services/helperservice.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { AlertService } from '../services/alert.service';
import { AlertEnum, Global, message } from '../Globals/global';
import { first } from 'rxjs';
import { commonfunction } from '../Globals/commonfunction';
import { ActivatedRoute, Router } from '@angular/router';
import { PackageComponent } from '../package/package.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  userloggedinData: any;
  userName: string = "";
  isLoggedin: boolean = false;
  cityData: any = [];
  fromCityData: any = [];
  compName: string = "YatraG";
  stateData: any = [];
  statecityData: any;
  fromPlace;
  toPlace;
  from = "From";
  fromDT;
  toDT;
  adultsCount;
  childsCount;
  packageData: any;
  cityDetailData: any;
  packageFinalData: any = [];
  @ViewChild(PackageComponent) PackageComponent: PackageComponent
  map: google.maps.Map;
  FromLocationData: any;
  ToLocationData: any;
  totalDistance:any;
  constructor(private helperService: HelperService, private httpservice: HttpService, private alertservice: AlertService, private route: Router, private activateroute: ActivatedRoute) {
    this.userloggedinData = this.helperService.getFromLocalStorageDec("loggedUserInfo");
    this.packageData = this.helperService.getFromLocalStorageDec("packageData");
    this.cityDetailData = this.helperService.getFromLocalStorage("cityDetailData");
    this.cityData = this.helperService.getFromLocalStorageDec("cityList");
    this.fromCityData = this.cityData?.filter(x => x.state_id == 4021);
  }
  ngOnInit() {
    this.getPackageData();
    setInterval(() => {
      if (!this.helperService.isnullOrEmpty(this.userloggedinData)) {
        this.isLoggedin = true;
        this.userName = this.userloggedinData.userName;
      }
    }, 1000);
    this.getCitiesList();
    this.locate()
  }
  fromPlaceLinkid = new FormControl('', [Validators.required]);
  toPlaceLinkid = new FormControl('', [Validators.required]);
  fromDate = new FormControl('', [Validators.required]);
  toDate = new FormControl('', [Validators.required]);
  totalAdults = new FormControl('', [Validators.required]);
  totalChilds = new FormControl('', [Validators.required]);


  getPackageData() {
    if (this.helperService.isnullOrEmpty(this.packageData) || this.helperService.isnullOrEmpty(this.cityDetailData)) {
      if (this.helperService.isnullOrEmpty(this.packageData)) {
        this.httpservice.getMethod(Global.getPackage).pipe(first()).subscribe((res) => {
          if (!this.helperService.isnullOrEmpty(res.Data) && res.status == "1") {
            this.packageData = res.Data;
            this.helperService.setInLocalStorageEnc("packageData", this.packageData);
          } else {
            this.alertservice.Alert(AlertEnum.Warning, message.noPackageData);
          }
        });
      }
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
    //   this.httpservice.postMethod(Global.saveBooking, this.saveBookingForm.value).subscribe((res:any) => {
    // if(!this.helperService.isnullOrEmpty(res)){
    //   this.alertservice.Alert(AlertEnum.Success, message.bookingsuccess)
    // }else{
    //   this.alertservice.Alert(AlertEnum.Error, message.servererror);
    // }

    //   });

  }

  getPackage() {
    this.packageFinalData = [];
    this.helperService.packageData = [];
    let fromplace = this.cityData.find(x => x.linkid == this.fromPlaceLinkid.value);  //will be find from cityDetailData
    if (this.helperService.isnullOrEmpty(fromplace)) {
      this.alertservice.Alert(AlertEnum.Info, message.currentlynotavailable);
      return;
    }
    let toplace = this.cityDetailData.find(x => x.citylinkid == this.toPlaceLinkid.value); //will be find from cityDetailData
    if (this.helperService.isnullOrEmpty(toplace)) {
      this.alertservice.Alert(AlertEnum.Info, message.currentlynopackage);
      return;
    }
    else {
      let fromlat = fromplace?.latitude;
      let fromlong = fromplace?.longitude;
      let tolat = toplace?.latitude;
      let tolong = toplace?.longitude;
      let distance = (+(commonfunction.distanceCalc(fromlat, fromlong, tolat, tolong) + 20).toFixed(2) * 2);
      let tripdays = commonfunction.getDateDifference(this.fromDate.value, this.toDate.value);
      let vehicledetail = this.packageData.filter(x => x.seater >= +this.totalAdults.value);

      vehicledetail.forEach(element => {
        let totalFare = (distance * element?.ratepkm) + (tripdays * 500);

        let packageData = {
          vehicledetail: element,
          destination: toplace,
          fare: totalFare.toFixed(2),
          distance: distance,
          tripdays: tripdays
        }
        this.packageFinalData.push(packageData);
      });
      this.activateroute.params.subscribe(val => {
        this.helperService.packageData = this.packageFinalData;
        this.route.navigate(["/package"]);
      });

    }
  }
  getCitiesList() {
    if (this.helperService.isnullOrEmpty(this.cityData?.length) || this.cityData?.length < 1) {
      this.httpservice.getMethod(Global.getcity).subscribe((res: any) => {
        if (!this.helperService.isnullOrEmpty(res?.Data) && res.status == "1") {
          this.cityData = res.Data;
          this.fromCityData = this.cityData.filter(x => x.state_id == 4021);
          this.helperService.setInLocalStorageEnc("cityList", this.cityData);
        } else {
          this.alertservice.Alert(AlertEnum.Warning, message.nodata);
        }
      });
    }
  }

  ngAfterViewInit() {
    // ---------Responsive-navbar-active-animation-----------
    function test() {
      var tabsNewAnim = $('#navbarSupportedContent');
      var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
      var activeItemNewAnim = tabsNewAnim.find('.active');
      var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
      var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
      var itemPosNewAnimTop = activeItemNewAnim.position();
      var itemPosNewAnimLeft = activeItemNewAnim.position();
      $(".hori-selector").css({
        "top": itemPosNewAnimTop.top + "px",
        "left": itemPosNewAnimLeft.left + "px",
        "height": activeWidthNewAnimHeight + "px",
        "width": activeWidthNewAnimWidth + "px"
      });
      $("#navbarSupportedContent").on("click", "li", function (e) {
        $('#navbarSupportedContent ul li').removeClass("active");
        $(this).addClass('active');
        var activeWidthNewAnimHeight = $(this).innerHeight();
        var activeWidthNewAnimWidth = $(this).innerWidth();
        var itemPosNewAnimTop = $(this).position();
        var itemPosNewAnimLeft = $(this).position();
        $(".hori-selector").css({
          "top": itemPosNewAnimTop.top + "px",
          "left": itemPosNewAnimLeft.left + "px",
          "height": activeWidthNewAnimHeight + "px",
          "width": activeWidthNewAnimWidth + "px"
        });
      });
    }
    $(document).ready(function () {
      setTimeout(function () { test(); });
    });
    $(window).on('resize', function () {
      setTimeout(function () { test(); }, 500);
    });
    $(".navbar-toggler").click(function () {
      $(".navbar-collapse").slideToggle(300);
      setTimeout(function () { test(); });
    });



    // --------------add active class-on another-page move----------
    jQuery(document).ready(function ($) {
      // Get current path and find target link
      var path = window.location.pathname.split("/").pop();

      // Account for home page with empty path
      if (path == '') {
        path = 'index.html';
      }

      var target = $('#navbarSupportedContent ul li a[href="' + path + '"]');
      // Add active class to target link
      target.parent().addClass('active');
    });


  }
  locate() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        var currentLatitude = position.coords.latitude;
        var currentLongitude = position.coords.longitude;
        const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
        this.map = new Map(document.getElementById("map") as HTMLElement, {
          center: { lat: currentLatitude, lng: currentLongitude },
          zoom: 13,
        });
      });
    }
  }
  FromLocation() {
    var input = document.getElementById('fromloc') as HTMLInputElement;
    var autocomplete = new google.maps.places.Autocomplete(input);
    let self = this;
    google.maps.event.addListener(autocomplete, 'place_changed', async function () {
      var place = autocomplete.getPlace();
      self.FromLocationData = place
      // const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      // this.map = new Map(document.getElementById("map") as HTMLElement, {
      //   center: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() },
      //   zoom: 13,
      // });
    });
  }
  ToLocation() {
    var input = document.getElementById('toloc') as HTMLInputElement;
    var autocomplete = new google.maps.places.Autocomplete(input);
    let self = this;
    google.maps.event.addListener(autocomplete, 'place_changed', async function () {
      var place = autocomplete.getPlace();
      self.ToLocationData = place
      // const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      // this.map = new Map(document.getElementById("map") as HTMLElement, {
      //   center: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() },
      //   zoom: 13,
      // });
    });
  }
  GetDirection() {
    let self = this;
    var Uimaps = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({
      draggable: true,
      map: Uimaps
    });

    directionsService.route({
      origin: { lat: self.FromLocationData.geometry.location.lat(), lng: self.FromLocationData.geometry.location.lng() },
      destination: { lat: self.ToLocationData.geometry.location.lat(), lng: self.ToLocationData.geometry.location.lng() },
      // waypoints: [{ location: c }],
      travelMode: google.maps.TravelMode.DRIVING

    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
        self.computeTotalDistance(response)
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
  computeTotalDistance(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    console.log(total)
    this.totalDistance=total+" KM"
  }
}

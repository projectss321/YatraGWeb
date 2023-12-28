import { Component } from '@angular/core';


@Component({
  selector: 'app-adminmenu',
  templateUrl: './adminmenu.component.html',
  styleUrls: ['./adminmenu.component.scss']
})
export class AdminmenuComponent {

  ngOnInit() {
  }


  ngAfterViewInit(){
  
  }
  collapse(){
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
  });
  }

}

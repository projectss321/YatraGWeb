import { Component, Input, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit{
  @Input() data: any;
 

  ngOnInit(): void {
    $('.modal-backdrop').remove();
    setTimeout(() => {
      $(".custom-alert").removeClass("hidden").attr("aria-hidden", 'false');
      $(".custom-alert").animate({left: '100%'}, "slow");
    //   $(".custom-alert").slideToggle(10000,() => {
    //     $(this).remove();
    // });
  }, 3000);
  }

}

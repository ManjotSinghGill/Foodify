import { Component, OnInit } from '@angular/core';
import { NgxOtpInputConfig } from "ngx-otp-input";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor(){}

    
  ngOnInit(): void {
  }

  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 6,
  };

}

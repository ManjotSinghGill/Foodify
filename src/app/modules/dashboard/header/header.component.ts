import { Component, OnInit } from '@angular/core';
import { NgxOtpInputConfig } from "ngx-otp-input";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  baseUrl = environment.baseUrl;
  isLogged: any;
  phone:any = '';
  token: any;
  phoneNumber: any;
  OneTimePass: any;
  tempData: any;
  user: any;
  data: any ={
    phone: "",
    otp: ""
  };
  constructor(private http: HttpClient, public router:Router, private auth: AuthService){}
  
    
  ngOnInit(): void {
    let temp: any = localStorage.getItem('user');
    this.user = JSON.parse(temp);
  }

  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 6,
  };

  isLoggedIn(){
    return !!localStorage.getItem('token');
  }
  
  send_otp(){
    this.phoneNumber = document.getElementById('mobile');
    this.data.phone = this.phoneNumber.value;
    this.data.otp = '123456';

    let url = this.baseUrl + "/customer/send_otp/?phone=" + this.data.phone;
    this.http.get(url,).subscribe( res => {
      console.log(res);
    })
  }

  login(){
    let url = this.baseUrl + '/customer/login/?phone=' + this.data.phone + '&otp=123456';;
    this.http.post(url,this.data).subscribe( res => {
      this.tempData = res;
      localStorage.setItem('token', this.tempData.token);
      localStorage.setItem('isLogged', 'true');
      localStorage.setItem('user', JSON.stringify(this.tempData.user));
      this.user = this.tempData.user;
    })
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.setItem('isLogged', 'false');
    window.alert("You have been logged out!")
  }

  toggleButton(){
    let login: any = document.getElementById("loginBtn");
    let logout: any = document.getElementById("logoutBtn");

    if(logout.style.display == 'none'){
      login.style.display = "none";
      logout.style.display = "inline-block";
    }
    else{
      login.style.display = "inline-block";
      logout.style.display = "none";
    }

  }
}

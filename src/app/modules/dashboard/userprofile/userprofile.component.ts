import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  baseUrl = environment.baseUrl;
  customerData: any;
  token = "Bearer " + localStorage.getItem("token");

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    let url = this.baseUrl + '/customer/1/';
    this.http.get<any>(url, {
      headers: new HttpHeaders({
        'Authorization': this.token,
      })
    }).subscribe( res => {
      console.log(res)
      this.customerData = res;
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  baseUrl = environment.baseUrl;
  restauratnDetail: any;
  token = "Bearer " + localStorage.getItem("token");

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    let url = this.baseUrl + '/restaurantdetail/';
    this.http.get<any>(url, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    }).subscribe( res => {
      this.restauratnDetail = res.data;
    })
  }

  sendId(id: any){
    console.log(id)
  }
  
  //Price Slider
  rangevalue = 0;
  valueChanged(e: any) {
    this.rangevalue = e.target.value;
  }

}

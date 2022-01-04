import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  baseUrl = environment.baseUrl;
  restDetailArray: any;
  foodArray: any = [];
  isLogged = localStorage.getItem('isLogged');
  token = "Bearer " + localStorage.getItem("token");
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    if(this.isLogged == 'true'){
      this.getRestaurant();
      this.getFoodList();
    }
  }

  getRestaurant(){
    let url = this.baseUrl + '/restaurantdetail/';
    this.http.get<any>(url, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    }).subscribe( res => {
      this.restDetailArray = res.data;
    })
  }

  getFoodList(){
    for (let index = 1; index < 5; index++) {
      let url = this.baseUrl + '/menuitems/?restaurant=' + String(index);
      this.http.get<any>(url, {
        headers: new HttpHeaders({
          'Authorization': this.token
        })
      }).subscribe( res => {
        for (let index = 0; index < res.length; index++) {
          this.foodArray.push(res[index]);
        }
      })
    }
  }

}

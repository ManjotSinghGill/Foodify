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
  restDetailArray: any;
  restDetail: any;
  token = "Bearer " + localStorage.getItem("token");

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getRestaurant();
  }

  getRestaurant(){
    let url = this.baseUrl + '/restaurantdetail/';
    this.http.get<any>(url, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    }).subscribe( res => {
      this.restDetailArray = res.data;
      this.restDetail = this.restDetailArray;
    })
  }
  
  //Price Slider
  rangevalue = 0;
  valueChanged(e: any) {
    this.rangevalue = e.target.value;
  }

  updateFoodList(category: any){
    console.log(category);
    if(category == 'all'){
      this.restDetail = this.restDetailArray;
    }
    else{
      this.restDetail = []
      for (let index = 0; index < this.restDetailArray.length; index++) {
        if(this.restDetailArray[index].category == category || this.restDetailArray[index].name.includes(category)){
          this.restDetail.push(this.restDetailArray[index])
        }
      }
    }
  }

}

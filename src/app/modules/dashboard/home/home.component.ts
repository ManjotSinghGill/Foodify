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
  restDetail: any;
  foodArray: any = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
      this.getRestaurant();
      this.getFoodList();
  }

  getRestaurant(){
    let url = this.baseUrl + '/restaurantdetail/';
    this.http.get<any>(url).subscribe( res => {
      this.restDetailArray = res;
      this.restDetail = this.restDetailArray;
    })
  }

  getFoodList(){
    for (let index = 1; index < 5; index++) {
      let url = this.baseUrl + '/menuitems/?restaurant=' + String(index);
      this.http.get<any>(url).subscribe( res => {
        for (let index = 0; index < res.length; index++) {
          this.foodArray.push(res[index]);
        }
      })
    }
  }

  updateRestList(category: any){
    console.log(category);
    if(category == 'all'){
      this.restDetail = this.restDetailArray;
    }
    else{
      this.restDetail = [];
      for (let index = 0; index < this.restDetailArray.length; index++) {
        if(this.restDetailArray[index].category == category || this.restDetailArray[index].name.includes(category)){
          this.restDetail.push(this.restDetailArray[index]);
        }
      }
    }
  }

  search(){

  }

}

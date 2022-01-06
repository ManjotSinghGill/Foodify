import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-foodresults',
  templateUrl: './foodresults.component.html',
  styleUrls: ['./foodresults.component.css']
})
export class FoodresultsComponent implements OnInit {

  baseUrl = environment.baseUrl;
  foodArray: any = [];
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getFoodList();
  }

  getFoodList(){
    for (let index = 1; index < 11; index++) {
      let url = this.baseUrl + '/menuitems/?restaurant=' + String(index);
      this.http.get<any>(url).subscribe( res => {
        for (let index = 0; index < res.length; index++) {
          this.foodArray.push(res[index]);
        }
      })
    }
  }

  foodList: any = this.foodArray;

  //Price Slider
  rangevalue = 0;
  valueChanged(e: any) {
    this.rangevalue = e.target.value;
  }

  updateFoodList(category: any){
    console.log(category);
    if(category == 'all'){
      this.foodList = this.foodArray;
    }
    else{
      this.foodList = []
      for (let index = 0; index < this.foodArray.length; index++) {
        if(this.foodArray[index].category == category || this.foodArray[index].name.includes(category)){
          this.foodList.push(this.foodArray[index])
        }
      }
    }
  }

}

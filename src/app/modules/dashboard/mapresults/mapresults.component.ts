import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-mapresults',
  templateUrl: './mapresults.component.html',
  styleUrls: ['./mapresults.component.css']
})
export class MapresultsComponent implements OnInit {

  lat = 28.704060;
  long = 77.102493;
  baseUrl = environment.baseUrl;
  foodItemsArray: any = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getFoodList();
  }

  rangevalue = 0;

  valueChanged(e: any) {
    this.rangevalue = e.target.value;
  }

  getFoodList(){
    for (let index = 1; index < 11; index++) {
      let url = this.baseUrl + '/menuitems/?restaurant=' + String(index);
      this.http.get<any>(url).subscribe( res => {
        for (let index = 0; index < res.length; index++) {
          this.foodItemsArray.push(res[index]);
        }
      })
    }
  }
}

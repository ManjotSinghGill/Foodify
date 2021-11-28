import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  rangevalue = 0;

  valueChanged(e: any) {
    this.rangevalue = e.target.value;
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-foodresults',
  templateUrl: './foodresults.component.html',
  styleUrls: ['./foodresults.component.css']
})
export class FoodresultsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  rangevalue = 0;

  valueChanged(e: any) {
    this.rangevalue = e.target.value;
  }

}

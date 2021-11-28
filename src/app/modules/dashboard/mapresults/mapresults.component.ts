import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapresults',
  templateUrl: './mapresults.component.html',
  styleUrls: ['./mapresults.component.css']
})
export class MapresultsComponent implements OnInit {

  lat = 28.704060;
  long = 77.102493;
  constructor() { }

  ngOnInit(): void {
  }

  rangevalue = 0;

  valueChanged(e: any) {
    this.rangevalue = e.target.value;
  }
}

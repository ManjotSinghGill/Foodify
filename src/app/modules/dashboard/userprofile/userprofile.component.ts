import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  user: any = localStorage.getItem('user');
  customerData = JSON.parse(this.user);

  constructor() { }

  ngOnInit(): void {
    console.log(this.customerData);
  }

}

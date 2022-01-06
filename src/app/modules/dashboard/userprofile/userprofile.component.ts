import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  userData: any = localStorage.getItem('user');
  user = JSON.parse(this.userData);
  customerData: any;
  orderHistory: any;
  baseUrl = environment.baseUrl;
  id: any;
  token = "Bearer " + localStorage.getItem("token");
  updateInfo: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  restDetail: any;

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getUser();
    this.getOrderHistory();
  }

  getUser(){
    let url = this.baseUrl + '/customer/' + this.id;
    this.http.get<any>(url, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    }).subscribe( res => {
      console.log(res)
      this.customerData = res;
    })
  }


  updateUserData(form: any){
    this.updateInfo = form.value;
    console.log(this.updateInfo)
    console.log(this.id);
    let url = this.baseUrl + '/customer/' + String(this.id) + '/';
    this.http.patch(url, this.updateInfo, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    }).subscribe( res =>{
      console.log(res);
    })
  }

  getOrderHistory(){
    let url = this.baseUrl + '/customer/order_history/?id=' + String(this.id);
    this.http.get(url, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    }).subscribe(res => {
      let temp: any = res;
      this.orderHistory = temp.data;
      for (let index = 0; index < this.orderHistory.length; index++){
        let url = this.baseUrl + '/restaurantdetail/' + String(this.orderHistory[index].rest_id);
        this.http.get<any>(url).subscribe( res => {
          let temp = res;
          this.orderHistory[index]['rest_name'] = temp.name;
          this.orderHistory[index]['rest_address'] = temp.address;
    })
      }
      console.log(this.orderHistory)
    })
  }

}

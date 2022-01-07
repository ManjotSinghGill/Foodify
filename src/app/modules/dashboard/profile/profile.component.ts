import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/shared/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient, private auth: AuthService) { }

  orderCount: any;
  count: any = 1;
  quantity: any;
  object: any = null;
  id: string;
  baseUrl = environment.baseUrl;
  menuItems: any;
  restDetail: any;
  orderList: any=[];
  orderItems: any= {
      rest_id: '',
      customer_id: '',
      total_amount: 0,
      list_of_items: []
    };
  temp: any= localStorage.getItem('user');
  user: any = JSON.parse(this.temp);
  token = "Bearer " + localStorage.getItem('token');


  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getRestmenu();
    this.getRest();
  }

  getRestmenu(){
    let url = this.baseUrl + '/menuitems/?restaurant=' + this.id;
    this.http.get<any>(url).subscribe( res => {
      this.menuItems = res;
      console.log(this.menuItems);
    })
  }

  getRest(){
    let url = this.baseUrl + '/restaurantdetail/' + this.id;
    this.http.get<any>(url).subscribe( res => {
      this.restDetail = res;
    })
  }

  increment(){
    this.quantity = document.getElementById('quantity');
    this.count = Number(this.quantity.value);
    this.count += 1;
    this.quantity.value = String(this.count);
  }

  decrement(){
    this.quantity = document.getElementById('quantity');
    this.count = Number(this.quantity.value);
    this.count -= 1;
    this.quantity.value = String(this.count);
  }

  setVariable(data: any){
    this.object = data;
  }

  order(id: any, rest_id: any, price: any, name: any){
    this.orderItems.rest_id = rest_id;
    let item = this.orderItems.list_of_items;
    this.orderList.push(name);

    if(item == ''){
      this.orderItems.list_of_items = String(id);
      this.orderItems.total_amount += Number(price) * this.count;
    }
    else{
      this.orderItems.list_of_items = item + ',' +  String(id);
      this.orderItems.total_amount += Number(price) * this.count;
    }
    console.log(this.orderItems);
  }

  resetOrder(){
    this.orderItems= {
      rest_id: '',
      customer_id: '',
      total_amount: 0,
      list_of_items: []
    };
    this.orderList = [];
  }
  
  postOrder(){
    if(this.auth.isLoggedIn()){
      console.log(this.user.id);
      this.orderItems.customer_id = String(this.user.id);
      console.log(this.orderItems);
      let url = this.baseUrl + '/order/';
      this.http.post(url, this.orderItems, {
        headers: new HttpHeaders({
          'Authorization': this.token
        })
      }).subscribe(res => {
        console.log(res);
      })
    }
    else{
      window.alert("Please Log In to post an order!")
    }
  }

}

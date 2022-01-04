import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  orderCount: any;
  count: any;
  quantity: any;
  object: any;
  id: string;
  baseUrl = environment.baseUrl;
  menuItems: any;
  restDetail: any;
  orderItems: any= {
      rest_id: '',
      customer_id: '',
      total_amount: 0,
      list_of_items: []
    };
  token = "Bearer " + localStorage.getItem("token");


  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getRestmenu();
    this.getRest();
  }
  

  getRestmenu(){
    let url = this.baseUrl + '/menuitems/?restaurant=' + this.id;
    this.http.get<any>(url, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    }).subscribe( res => {
      this.menuItems = res;
    })
  }

  getRest(){
    let url = this.baseUrl + '/restaurantdetail/' + this.id;
    this.http.get<any>(url, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    }).subscribe( res => {
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

  order(name: any, rest_id: any, price: any){
    this.orderItems.rest_id = rest_id;
    this.orderItems.customer_id = '1'
    if(this.orderItems.list_of_items.find(x => x.name == name)){
      let index = this.orderItems.list_of_items.findIndex(x => x.name == name)
      this.orderItems.list_of_items[index].count += this.count;
      this.orderItems.total_amount += Number(price) * this.count;
    }
    else{
      this.orderItems.list_of_items.push({name: name, count: this.count});
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
  }
  

}

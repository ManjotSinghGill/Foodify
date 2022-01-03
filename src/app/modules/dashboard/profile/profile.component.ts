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

  order(data :any){
    this.orderItems.rest_id = String(data.restaurant);
    this.orderItems.customer_id = "1";
    this.orderItems.total_amount += data.price;
    if(this.orderItems.list_of_items.find(x => x.name == data.name)){
      let index = this.orderItems.list_of_items.findIndex(x => x.name === data.name)
      this.orderItems.list_of_items[index].count += 1;
    }
    else{
      let temp = {
        name: data.name,
        count: 1
      }
      this.orderItems.list_of_items.push(temp);
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

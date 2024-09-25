import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  Name:string="";
  cart=0;
  menuType: string = 'default';

  constructor(private route: Router, private product:ProductService) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
// Save user Data and Name
         if(localStorage.getItem('user')){
         let local = localStorage.getItem('user');
          let data = local && JSON.parse(local);
          this.Name= data.name;
          this.menuType='user';
          this.product.getCartList(data.id);
        }
         else {
          this.menuType = 'default';
        }
    });
    this.product.cartData.subscribe((items)=>{
      this.cart= items.length
    })
  }

  logout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth'])
    this.product.cartData.emit([])
  }


}

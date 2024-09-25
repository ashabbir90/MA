import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, getTotal } from '../data';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  Data: cart[] | undefined;
  getTotal: getTotal = {
    price: 0,
    total: 0
  }
  constructor(private product: ProductService, private router: Router) { }

  ngOnInit(): void {
   this.getdetails()
 }
  getdetails(){
    this.product.getCart().subscribe((result) => {
      this.Data = result;
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }
      })
      this.getTotal.price = price;
      this.getTotal.total = price ;

    if(!this.Data.length){
      this.router.navigate(['/'])
    }  })
  }
  removeFromCart(cartId:number|undefined){
    cartId && this.Data && this.product.deleteProduct(cartId)
    .subscribe((result)=>{
      this.getdetails();
    })
  }
}

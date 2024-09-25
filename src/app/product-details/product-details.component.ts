import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, product } from '../data';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  prodData: undefined | product;
  prodquant: number = 1;

  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService
  ) {}

  ngOnInit(): void {
    let prodId = this.activeRoute.snapshot.paramMap.get('productId');
    prodId &&  this.product.getProduct(prodId).subscribe((result) => {
        this.prodData = result;
      });
  }
  getprodquant(val: string) {
    if (this.prodquant < 20 && val === 'plus') {
      this.prodquant += 1;
    } else if (this.prodquant > 1 && val === 'min') {
      this.prodquant -= 1;
    }
  }
  addToCart() {
    if (this.prodData) {
      this.prodData.quantity = this.prodquant;
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: cart = {
          ...this.prodData,
          productId: this.prodData.id,
          userId,
        };
        this.product.postCart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId);

          }
        });

    }
  }

}

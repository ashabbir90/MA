import { HttpClient } from '@angular/common/http';
import { cart, product } from '../data';
import { EventEmitter, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartData = new EventEmitter<product[] | []>();
  constructor(private http: HttpClient) {}

  postCart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }

   getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }
  deleteProduct(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId);
  }
  getCartList(userId: number) {
    return this.http
      .get<product[]>('http://localhost:3000/cart?userId=' + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }

  getCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>(
      'http://localhost:3000/cart?userId=' + userData.id
    );
  }

  getProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=8');
  }
}

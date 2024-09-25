import { Component, OnInit } from '@angular/core';
import { product } from '../data';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

 prod:undefined | product[];
  constructor(private product:ProductService) {}

  ngOnInit(): void {


    this.product.getProducts().subscribe((data)=>{
      this.prod=data;
    })
  }
}

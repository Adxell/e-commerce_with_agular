import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.component.html'
})
export class CartComponent implements OnInit {

  cart: Cart = { items: [
    {
      id: 1,
      name: "snack",
      price: 150,
      product: 'https://via.placeholder.com/150',
      quantity: 10
    },
    {
      id: 2,
      name: "snack",
      price: 150,
      product: 'https://via.placeholder.com/150',
      quantity: 5
    },
    {
      id: 3,
      name: "snack",
      price: 150,
      product: 'https://via.placeholder.com/150',
      quantity: 30
    },
]}

  dataSource: Array<CartItem> = []

  displayColumns: Array<string> = [
    'product', 
    'name', 
    'price', 
    'quantity', 
    'total',
    'action'
  ]
  constructor() { }

  ngOnInit(): void {
    this.dataSource = this.cart.items
  }

  getTotal(items: Array<CartItem>): number {
    return items
    .map((item) => item.price * item.quantity)
    .reduce((prev, current) => prev + current, 0)
  }

}

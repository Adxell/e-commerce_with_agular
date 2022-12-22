import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.component.html'
})
export class CartComponent implements OnInit {

  cart: Cart = {
    items: [
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
    ]
  }

  dataSource: Array<CartItem> = []

  displayColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ]
  constructor(private cartService: CartService, private http: HttpClient) { }

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items
    })
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items)
  }

  onClearCart(): void {
    this.cartService.clearCart()
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item)
  }
  onAddQuatity(item: CartItem): void {
    this.cartService.addtoCart(item)
  }
  onRemoveQuatity(item: CartItem): void {
    this.cartService.removeQuantity(item)
  }

  onCheckout(): void {
    this.http.post('http://localhost:4242/checkout', {
      items: this.cart.items
    }).subscribe(async (res: any) => {
      let stripe = await loadStripe('pk_test_51MHMGSB90ErkMxt0HnjrLdYF7z8t2eDhR94yxPIbLHlQUBvKVmCiDhNAaRyn5bFTC4YFmxQiJbYgRVh4AegCMmrh00RQ5dKwT7')
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    })
  }
}

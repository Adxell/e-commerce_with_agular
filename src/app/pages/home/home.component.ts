import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs'
import { StoreService } from 'src/app/services/store.service';
const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 }

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3
  category: string | undefined
  products: Array<Product> | undefined;
  sort = 'desc';
  count = '12';
  productsSubcription: Subscription | undefined;
  rowHeight = ROWS_HEIGHT[this.cols]

  constructor(private cartService: CartService, private storeService: StoreService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productsSubcription = this.storeService.getAllProducts(this.count, this.sort, this.category).subscribe((_products) => {
      this.products = _products;
    })
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols]
  }

  onShowCategory(category: string): void {
    this.category = category;
    this.getProducts()
  }

  onAddToCart(product: Product): void {
    this.cartService.addtoCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    })
  }

  onItemsCountChange(itemsCount: number): void {
    this.count = itemsCount.toString();
    this.getProducts()
  }
  onSortChange(sortChange: string): void {
    this.sort = sortChange;
    this.getProducts()
  }
  ngOnDestroy(): void {
    if (this.productsSubcription) {
      this.productsSubcription.unsubscribe()
    }
  }


}

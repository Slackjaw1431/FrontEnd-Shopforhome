import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/product';
import { ActivatedRoute } from '@angular/router';
import { timeoutWith } from 'rxjs/operators';
import { CartItem } from 'src/app/cart-item';
import { CartService } from 'src/app/_services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  page = {
    size: 0,
    totalElements: 0,
    totalPages: 0,
    number: 0,
  };

  currentPage: number = 0;
  pageSize: number = 5;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.products = this.productService.getAllProducts();
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService
      .getAllProducts(this.currentPage, this.pageSize)
      .subscribe((response: ProductsPageResponse) => {
        this.products = response.products;
        console.log(this.products);
        this.page = response.page;
        console.log(this.page);
      });
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.getAllProducts();
  }

  onItemsPerPageChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.getAllProducts();
  }

  addToCart(theProduct: Product) {
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

    //add user details? or do when creating cart-> check localstorag for user
    let theCartItem = new CartItem(
      theProduct.id,
      theProduct.name,
      theProduct.imageUrl,
      theProduct.unitPrice
    );

    this.cartService.addToCart(theCartItem);
  }
}

interface ProductsPageResponse {
  products: Product[];
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

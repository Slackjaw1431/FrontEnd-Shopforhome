import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from '../_services/product.service';
import { Product } from '../product';
import { CartItem } from '../cart-item';
import { CartService } from '../_services/cart.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-product-by-category',
  templateUrl: './product-by-category.component.html',
  styleUrls: ['./product-by-category.component.css'],
})
export class ProductByCategoryComponent implements OnInit {
  products: Product[] = [];
  page = {
    size: 0,
    totalElements: 0,
    totalPages: 0,
    number: 0,
  };

  categoryId: number = +this.route.snapshot.paramMap.get('id')!;
  currentPage: number = 0;
  pageSize: number = 5;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getProductsByCategory();
  }

  getProductsByCategory(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.categoryId = +params.get('id')!;
          return this.productService.getProductsByCategory(
            this.categoryId,
            this.currentPage,
            this.pageSize
          );
        })
      )
      .subscribe((response: ProductsPageResponse) => {
        this.products = response.products;
        console.log(this.products);
        this.page = response.page;
      });
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.getProductsByCategory();
  }

  onItemsPerPageChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.getProductsByCategory();
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

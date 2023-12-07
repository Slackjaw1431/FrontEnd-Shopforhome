import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../_services/product.service';
import { Product } from '../product';
import { CartItem } from '../cart-item';
import { CartService } from '../_services/cart.service';

@Component({
  selector: 'app-product-by-category',
  templateUrl: './product-by-category.component.html',
  styleUrls: ['./product-by-category.component.css'],
})
export class ProductByCategoryComponent implements OnInit {
  products: any[] = [];

  categoryId: number = 1; // Replace with the selected category ID
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getProductsByCategory();
    });
  }

  getProductsByCategory(): void {
    const categoryId: number = +this.route.snapshot.paramMap.get('id')!;
    console.log(categoryId);

    this.productService.getProductsByCategory(categoryId).subscribe((data) => {
      this.products = data;
    });
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

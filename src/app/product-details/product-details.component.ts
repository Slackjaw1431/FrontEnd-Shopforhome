import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from '../cart-item';
import { Product } from '../product';
import { ProductService } from '../_services/product.service';
import { CartService } from '../_services/cart.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product = new Product();
  isAdmin: boolean = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.assignType();
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  handleProductDetails() {
    // get the "id" param string. convert string to a number using the "+" symbol
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;
    console.log(theProductId);

    this.productService.getProduct(theProductId).subscribe((data) => {
      this.product = data;
    });
  }

  addToCart() {
    console.log(
      `Adding to cart: ${this.product.name}, ${this.product.unitPrice}`
    );
    let theCartItem = new CartItem(
      this.product.id,
      this.product.name,
      this.product.imageUrl,
      this.product.unitPrice,
      this.product.discount
    );

    this.cartService.addToCart(theCartItem);
  }

  assignType(): void {
    if (this.userService.roleMatch(['Admin'])) {
      this.isAdmin = true;
    } else if (this.userService.roleMatch(['User'])) {
      this.isAdmin = false;
    } else {
      console.log('assign type not implemented in product details ts');
    }
  }

  deleteProduct(theProductId: number) {
    this.productService.deleteProduct(theProductId).subscribe((data) => {
      this.product = data;
      window.alert('Product deleted');
      this.router.navigate(['/products']);
    });
  }
}

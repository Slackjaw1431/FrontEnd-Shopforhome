import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/product';
import { ActivatedRoute, Router} from '@angular/router';
import { timeoutWith } from 'rxjs/operators';
import { CartItem } from 'src/app/cart-item';
import { CartService } from 'src/app/_services/cart.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isAdmin: boolean = false;

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
    private route: ActivatedRoute,
    private userService: UserService,
    private router:Router
  ) {}

  ngOnInit(): void {
    // this.products = this.productService.getAllProducts();
    this.assignType();
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService
      .getAllProducts(this.currentPage, this.pageSize)
      .subscribe((response: ProductsPageResponse) => {
        this.products = response.products;
        this.page = response.page;
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

    let theCartItem = new CartItem(
      theProduct.id,
      theProduct.name,
      theProduct.imageUrl,
      theProduct.unitPrice
      // theProduct.discount
    );

    this.cartService.addToCart(theCartItem);
  }

  assignType(): void {
    if (this.userService.roleMatch(['Admin'])) {
      this.isAdmin = true;
    } else if (this.userService.roleMatch(['User'])) {
      this.isAdmin = false;
    } else {
      this.isAdmin = false;
    }
  }

  redirectToViewDetails(id:number){
    this.router.navigate(['/products', id])
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

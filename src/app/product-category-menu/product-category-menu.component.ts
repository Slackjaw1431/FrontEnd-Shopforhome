import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/product-category';
import { ProductService } from 'src/app/_services/product.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css'],
})
export class ProductCategoryMenuComponent implements OnInit {
  productCategories: Observable<any[]>;
  categorySubscription: Subscription;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // this.productCategories = this.productService.getProductCategories();
    this.loadData();
    this.categorySubscription = this.productService.categoryAdded.subscribe(
      () => {
        this.loadData();
      }
    );
  }

  ngOnDestroy() {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }

  loadData() {
    this.productCategories = this.productService.getProductCategories();
  }
}

import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/product-category';
import { ProductService } from 'src/app/_services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css'],
})
export class ProductCategoryMenuComponent implements OnInit {
  productCategories: Observable<any[]>;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productCategories = this.productService.getProductCategories();
  }
}

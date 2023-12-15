import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  newCategory: any = {};
  categories: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProductCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }

  addCategory(): void {
    this.productService.addCategory(this.newCategory).subscribe(
      (response) => {
        // console.log('Category added:', response);
      },
      (error) => {
        console.error('Error adding Category:', error);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  newProduct: any = {}; // Object to store new product data
  categories: any[] = []; // Array to store categories retrieved from backend
  selectedCategory: any;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProductCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }

  addProduct() {
    // Set date_created and last_updated here before sending the request
    this.productService.getProductCategories().subscribe((data: any) => {
      this.categories = data;

      console.log('New product:', this.newProduct);

      this.selectedCategory = this.categories.find(
        (category) => category.id == this.newProduct.category
      );
      console.log('selected ' + this.selectedCategory);

      this.newProduct.category = this.selectedCategory.id;

      console.log('new product :' + this.newProduct.category);

      this.newProduct.date_created = new Date().toISOString();
      this.newProduct.last_updated = new Date().toISOString();

      console.log('new product object ' + this.newProduct);

      this.addProductReally(this.newProduct);
    });
  }

  addProductReally(newProduct: any) {
    this.productService.addProduct(newProduct).subscribe(
      (response) => {
        console.log('Product added:', response);
      },
      (error) => {
        console.error('Error adding product:', error);
      }
    );
  }
}

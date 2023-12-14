import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  newProduct: any = {}; // Object to store new product data
  categories: any[] = []; // Array to store categories retrieved from backend
  selectedCategory: any;
  newCategory: any = {};

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    // this.productService.getProductCategories().subscribe((data: any) => {
    //   this.categories = data;
    // });
    this.loadCategories();
  }

  loadCategories() {
    this.productService.getProductCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }

  addProduct(form: any) {
    if (form.valid) {
      this.productService.getProductCategories().subscribe((data: any) => {
        this.categories = data;

        console.log('New product:', this.newProduct);

        console.log('Category ID:', this.newProduct.category.id); // Check if category ID exists

        // Find the category object from categories array based on ID
        this.selectedCategory = this.categories.find(
          (category) => category.id === this.newProduct.category.id
        );

        console.log('Selected Category:', this.selectedCategory);

        if (this.selectedCategory) {
          // If a matching category is found, assign it to newProduct.category
          this.newProduct.category = this.selectedCategory;
        } else {
          console.log(
            'Category not found for ID:',
            this.newProduct.category.id
          );
          // Handle the case where the category is not found
          // You can assign a default category or handle it based on your business logic
        }

        // Set date_created and last_updated
        this.newProduct.date_created = new Date().toISOString();
        this.newProduct.last_updated = new Date().toISOString();

        console.log('Updated new product:', this.newProduct);

        // Add the new product
        this.productService.addProduct(this.newProduct).subscribe(
          (response) => {
            console.log('Product added:', response);
            window.alert('Product added');
            this.router.navigate(['/products']);
          },
          (error) => {
            console.error('Error adding product:', error);
          }
        );
      });
    } else {
      window.alert('Please fill out all the details');
    }
  }

  addCategory(form: any): void {
    if (form.valid) {
      this.productService.addCategory(this.newCategory).subscribe(
        (response) => {
          console.log('Category added:', response);
          window.alert('Category added');
          this.productService.emitCategoryAdded();
        },
        (error) => {
          console.error('Error adding Category:', error);
        }
      );
    } else {
      window.alert('Please fill out all details');
    }
  }
}

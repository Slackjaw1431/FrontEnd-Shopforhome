import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  productId: number;
  product: any = {};

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = +this.route.snapshot.params.id;

    this.productService.getProduct(this.productId).subscribe(
      (product) => {
        this.product = product;
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  updateProduct(productData: any): void {
    if (this.isProductDataValid(productData)) {
      this.productService.updateProduct(this.productId, productData).subscribe(
        (response) => {
          console.log('Product details updated successfully:', response);
          window.alert('Product details updated');
          this.router.navigate(['/products']);
        },
        (error) => {
          console.error('Error updating product:', error);
          window.alert('Error updating product details');
        }
      );
    } else {
      window.alert('Please fill out all the details');
    }
  }

  isProductDataValid(data: any): boolean {
    return (
      data.name &&
      data.description &&
      data.sku &&
      data.brand &&
      data.unitPrice &&
      data.unitsInStock &&
      data.totalSold &&
      data.imageUrl
    );
  }
}

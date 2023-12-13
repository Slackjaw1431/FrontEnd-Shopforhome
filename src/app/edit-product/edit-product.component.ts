import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute
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
    this.productService.updateProduct(this.productId, productData).subscribe(
      (response) => {
        console.log('Product details updated successfully:', response);
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }
}

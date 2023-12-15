import { Component, OnInit } from '@angular/core';
import { CartService } from '../_services/cart.service';
import { CheckoutService } from '../_services/checkout.service';
import { Order } from '../order';
import { Router } from '@angular/router';
import { Product } from '../product';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  formData: any = {}; // Object to store form data
  order: Order = {
    userId: '',
    products: [],
    dateCreated: new Date(),
    total: 0,
  };
  productsToReduceStock: any[] = [];
  product: Product;

  storedUsername = localStorage.getItem('userName');
  storedFirstName = localStorage.getItem('userFirstName');
  storedLastName = localStorage.getItem('userLastName');

  // Set the retrieved data to the form object

  constructor(
    private checkoutService: CheckoutService,
    private router: Router,
    private cartService: CartService,
    private httpClient: HttpClient,
    private productService: ProductService
  ) {}

  ngOnInit() {
    // Retrieve data from localStorage and set it to the form fields
    this.formData.username = this.storedUsername || '';
    this.formData.firstname = this.storedFirstName || '';
    this.formData.lastname = this.storedLastName || '';
    // console.log(localStorage);
  }

  checkoutOrder() {
    //getting details from session storagee
    this.order.userId = this.storedUsername;
    this.order.dateCreated = new Date();

    // this.order.products = JSON.parse(sessionStorage.getItem('cartItems'));

    const storedData = sessionStorage.getItem('cartItems');

    if (storedData) {
      const parsedData = JSON.parse(storedData);

      const customizedData = parsedData.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        name: item.name,
        unitPrice: item.unitPrice,
      }));

      const itemsBought = parsedData.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      }));

      this.productsToReduceStock = itemsBought;
      this.order.products = customizedData;
    } else {
      console.log('No data found in sessionStorage');
    }

    this.order.total = parseFloat(sessionStorage.getItem('orderTotal'));

    this.checkoutService.placeOrder(this.order).subscribe(
      (response) => {
        console.log('Order placed: ', response);
        window.alert('Order has been placed');
        this.cartService.clearCart();
        this.router.navigate(['/products']);
      },
      (error) => {
        console.error('Error placing Order:', error);
      }
    );

    this.productsToReduceStock.forEach((item) => {
      const itemId = item.id;
      const quantity = item.quantity;

      this.productsToReduceStock.forEach((productId) => {
        this.productService.getProduct(productId.id).subscribe(
          (product) => {
            this.product = product;
            this.product.totalSold += quantity;
            this.product.unitsInStock -= quantity;

            this.productService
              .updateProduct(productId.id, this.product)
              .subscribe(
                (response) => {
                  console.log(
                    'Product details updated successfully:',
                    response
                  );
                },
                (error) => {
                  console.error('Error updating product:', error);
                }
              );
          },
          (error) => {
            console.error('Error fetching product details:', error);
          }
        );
      });
    });
  }
}

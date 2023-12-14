import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserAuthService } from '../_services/user-auth.service';
import { Order } from '../order';
import { CartService } from '../_services/cart.service';
import { CheckoutService } from '../_services/checkout.service';

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
  storedUsername = localStorage.getItem('userName');
  storedFirstName = localStorage.getItem('userFirstName');
  storedLastName = localStorage.getItem('userLastName');

  // Set the retrieved data to the form object

  constructor(private checkoutService: CheckoutService) {}

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

      this.order.products = customizedData;
    } else {
      console.log('No data found in sessionStorage');
    }

    this.order.total = parseFloat(sessionStorage.getItem('orderTotal'));

    this.checkoutService.placeOrder(this.order).subscribe(
      (response) => {
        console.log('Order placed: ', response);
      },
      (error) => {
        console.error('Error placing Order:', error);
      }
    );
  }
}

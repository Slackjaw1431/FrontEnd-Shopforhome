import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  formData: any = {}; // Object to store form data

  constructor() {}

  ngOnInit() {
    // Retrieve data from localStorage and set it to the form fields
    const storedUsername = localStorage.getItem('userName');
    const storedFirstName = localStorage.getItem('userFirstName');

    // Set the retrieved data to the form object
    this.formData.username = storedUsername || '';
    this.formData.firstname = storedFirstName || '';
    // Repeat this for other form fields as needed
  }
}

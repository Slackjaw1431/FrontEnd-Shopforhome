import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../_services/checkout.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css'],
})
export class ViewOrdersComponent implements OnInit {
  myOrders: Observable<any[]>;

  constructor(
    private httpClient: HttpClient,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.myOrders = this.checkoutService.getOrderForCurrentUser(
      sessionStorage.getItem('userName')
    );
  }
}

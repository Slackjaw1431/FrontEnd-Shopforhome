import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../_services/checkout.service';
import { Observable } from 'rxjs';
import { OrdersService } from '../_services/orders.service';
import { ActivatedRoute } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css'],
})
export class ViewOrdersComponent implements OnInit {
  orderObject: OrderResponse;
  userName: string;
  mappedOrders: MappedOrder[] = [];

  constructor(
    private httpClient: HttpClient,
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.assignType();
    this.gettingOrders();
  }

  assignType(): void {
    if (this.userService.roleMatch(['Admin'])) {
      this.userName = this.route.snapshot.paramMap.get('userName');
    } else if (this.userService.roleMatch(['User'])) {
      this.userName = localStorage.getItem('userName');
    } else {
      console.log(this.userName);
    }
  }

  gettingOrders(): void {
    this.ordersService.getOrderForCurrentUser(this.userName).subscribe(
      (response) => {
        console.log(response);
        this.orderObject = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

interface OrderResponse {
  content: MappedOrder[];
  pageable: any;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: any;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

interface MappedOrder {
  orderId: number;
  dateCreated: string;
  userId: string;
  total: number;
  orderItems: MappedOrderItem[];
}

interface MappedOrderItem {
  orderItemId: number;
  quantity: number;
  name: string;
  unitPrice: number;
  productId: number;
}

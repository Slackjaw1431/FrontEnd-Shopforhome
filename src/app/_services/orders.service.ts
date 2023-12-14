import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Order } from '../order';
import { ProductService } from './product.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private apiUrl = 'http://localhost:9092/orders';

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private userService: UserService
  ) {}

  // Methods to interact with backend API for orders (get, create, update, delete)

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  getAllOrders(): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.apiUrl}/orders`);
  }

  getOrderForCurrentUser(userName: string): Observable<OrderResponse> {
    const url = `http://localhost:9092/byUser/${userName}`;

    return this.http.get<OrderResponse>(url);
  }
}

interface OrderResponse {
  content: OrderItself[];
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

interface OrderItself {
  orderId: number;
  dateCreated: string;
  userId: string;
  total: number;
  orderItems: OrderItemDetails[];
}

interface OrderItemDetails {
  orderItemId: number;
  quantity: number;
  name: string;
  unitPrice: number;
  productId: number;
}

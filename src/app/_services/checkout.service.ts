import { Injectable } from '@angular/core';
import { Order } from '../order';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private baseUrl = 'http://localhost:9092/order';

  constructor(private httpClient: HttpClient) {}

  placeOrder(newOrder: Order): Observable<any> {
    console.log(JSON.stringify(newOrder));
    return this.httpClient.post<any>(this.baseUrl, newOrder);
  }
}

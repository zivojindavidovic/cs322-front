import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product';
import { OrderRequest } from '../models/orderRequest';
import { Order } from '../models/order';
import { MyOrderRequest } from '../models/myOrderRequest';
import { ProcessOrderRequest } from '../models/processOrder';
import { CreateProductRequest } from '../models/createProductRequest';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:5077/products';

  constructor(private _httpClient: HttpClient) {}

  public createProduct(request: CreateProductRequest) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this._httpClient
      .post(this.baseUrl, request, { headers })
      .pipe(map((product: any) => this._createProduct(product)));
  }

  private _createProduct(product: any): any {
    return new CreateProductRequest(
      product.userId,
      product.name,
      product.description,
      product.price
    );
  }

  public getProducts(): Observable<Product[]> {
    return this._httpClient
      .get<Product[]>(this.baseUrl + '/getAll')
      .pipe(
        map((product: Product[]) =>
          product.map((product: Product) =>
            this._createProductFromObject(product)
          )
        )
      );
  }

  public makeOrder(orderRequest: OrderRequest): Observable<any> {
    return this._httpClient
      .post(this.baseUrl + '/order', orderRequest)
      .pipe(map((data: any) => this._createOrderFromObject(data)));
  }

  public getMyOrders(userId: string): Observable<Order[]> {
    return this._httpClient
      .get<Order[]>(this.baseUrl + '/getOrders/' + userId)
      .pipe(
        map((order: Order[]) =>
          order.map((order: Order) => this._createMyOrderFromObject(order))
        )
      );
  }

  public getMyProducts(userId: string): Observable<Product[]> {
    return this._httpClient
      .get<Product[]>(this.baseUrl + '/myProducts/' + userId)
      .pipe(
        map((product: Product[]) =>
          product.map((product: Product) =>
            this._createProductFromObject(product)
          )
        )
      );
  }

  public processOrder(processOrder: ProcessOrderRequest) {
    return this._httpClient
      .post(this.baseUrl + '/processOrder', processOrder)
      .pipe(map((data: any) => this._createProcessOrderRequest(data)));
  }

  private _createProcessOrderRequest(data: any) {
    return new ProcessOrderRequest(data.orderId, data.status);
  }
  private _createProductFromObject(product: Product): Product {
    return new Product(
      product.product_id,
      product.user_id,
      product.name,
      product.description,
      product.price
    );
  }

  public getSingleProduct(id: string): Observable<Product> {
    return this._httpClient
      .get<Product>(this.baseUrl + '/getSingle/' + id)
      .pipe(map((product: Product) => this._createProductFromObject(product)));
  }

  public deleteProduct(id: string): Observable<Product> {
    return this._httpClient
      .delete(this.baseUrl + '/delete/' + id)
      .pipe(map((product: any) => this._createProduct(product)));
  }

  private _createOrderFromObject(order: any): any {
    return new OrderRequest(order.userId, order.user2Id, order.productId);
  }

  private _createMyOrderFromObject(order: Order): Order {
    return new Order(
      order.orderId,
      order.userId,
      order.user2Id,
      order.productId,
      order.status
    );
  }

  public updateProduct(id: string, price: string): Observable<Product>{
    const body = {price: price};
    return this._httpClient.put<Product>(this.baseUrl + "/update/" + id, body)
    .pipe(
      map((product: any) => this._createProductFromObject(product))
    )
  }
}

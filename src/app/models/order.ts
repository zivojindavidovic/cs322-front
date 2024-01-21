import { Optional } from '@angular/core';

export class Order {
  orderId: string;
  userId: string;
  user2Id: string;
  productId: string;
  status: string;

  constructor(
    orderId: string,
    userId: string,
    user2Id: string,
    productId: string,
    status: string
  ) {
    this.orderId = orderId;
    this.userId = userId;
    this.user2Id = user2Id;
    this.productId = productId;
    this.status = status;
  }
}

import { Optional } from '@angular/core';

export class OrderRequest {
  userId: any;
  user2Id: string;
  productId: string;

  constructor(userId: any, user2Id: string, productId: string) {
    this.userId = userId;
    this.user2Id = user2Id;
    this.productId = productId;
  }
}

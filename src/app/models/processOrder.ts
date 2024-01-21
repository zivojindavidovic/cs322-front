import { Optional } from '@angular/core';

export class ProcessOrderRequest {
  orderId: string;
  status: string;

  constructor(orderId: string, status: string) {
    this.orderId = orderId;
    this.status = status;
  }
}

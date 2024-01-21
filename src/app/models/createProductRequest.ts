import { Optional } from '@angular/core';

export class CreateProductRequest {
  userId: string;
  name: string;
  description: string;
  price: number;

  constructor(
    userId: string,
    name: string,
    description: string,
    price: number
  ) {
    this.userId = userId;
    this.name = name;
    this.description = description;
    this.price = price;
  }
}

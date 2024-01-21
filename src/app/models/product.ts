import { Optional } from '@angular/core';

export class Product {
  product_id: string;
  user_id: string;
  name: string;
  description: string;
  price: number;

  constructor(
    @Optional() id: string,
    userId: string,
    name: string,
    description: string,
    price: number
  ) {
    this.product_id = id;
    this.user_id = userId;
    this.name = name;
    this.description = description;
    this.price = price;
  }
}

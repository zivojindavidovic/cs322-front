import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OrderRequest } from 'src/app/models/orderRequest';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public products: Product[];
  orderForm: FormGroup;

  isMyProduct: boolean;
  userId: any = localStorage.getItem('userId');

  constructor(private _productService: ProductService) {}
  ngOnInit(): void {
    this._productService
      .getProducts()
      .subscribe((data: Product[]) => (this.products = data));

    this.initForm();
  }

  initForm() {
    this.orderForm = new FormGroup({});
  }

  submitOrder(user2Id: string, productId: string) {
    let currentUser = localStorage.getItem('userId');
    console.log(currentUser);

    let order = new OrderRequest(currentUser, user2Id, productId);
    console.log(order);

    this.makeOrder(order);
  }

  makeOrder(order: OrderRequest) {
    this._productService.makeOrder(order).subscribe((data) => {
      console.log(data);
    });
  }
}

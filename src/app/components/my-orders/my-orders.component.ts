import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { strings } from '@material/dialog';
import { Order } from 'src/app/models/order';
import { ProcessOrderRequest } from 'src/app/models/processOrder';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent implements OnInit {
  public orders: Order[];
  userId: any = localStorage.getItem('userId');
  approveOrder: FormGroup[] = [];
  declineOrder: FormGroup[] = [];

  constructor(
    private _productService: ProductService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._productService.getMyOrders(this.userId).subscribe((data: Order[]) => {
      this.orders = data;

      this.orders.forEach(() => {
        this.approveOrder.push(this.fb.group({}));
        this.declineOrder.push(this.fb.group({}));
      });
      this.cdr.detectChanges();
    });
  }

  processOrder(orderId: string, status: string) {
    let request = new ProcessOrderRequest(orderId, status);
    this._productService.processOrder(request).subscribe((data) => {
      console.log(data);
      this.orders = this.orders.filter((order) => order.orderId !== orderId);
      this.cdr.detectChanges();
    });
  }
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CreateProductRequest } from 'src/app/models/createProductRequest';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss'],
})
export class MyProductsComponent implements OnInit {
  myProducts: Product[];
  createProductForm: FormGroup;
  userId: any = localStorage.getItem('userId');

  deleteProductForm: FormGroup[] = [];

  constructor(
    private _productService: ProductService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._productService.getMyProducts(this.userId).subscribe((data) => {
      console.log(data);
      this.myProducts = data;

      this.myProducts.forEach(() => {
        this.deleteProductForm.push(this.fb.group({}));
      });
      this.cdr.detectChanges();
    });
    this.initForm();
  }

  initForm() {
    this.createProductForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }
  submitCreateProduct() {
    let name = this.createProductForm.get('name')?.value;
    let description = this.createProductForm.get('description')?.value;
    let price = this.createProductForm.get('price')?.value;

    let request = new CreateProductRequest(
      this.userId,
      name,
      description,
      price
    );

    this.createProduct(request);
  }
  createProduct(request: CreateProductRequest) {
    this._productService.createProduct(request).subscribe((data) => {
      console.log(data);
    });
  }

  deleteProduct(productId: string) {
    this._productService.deleteProduct(productId).subscribe((data) => {
      console.log(data);
      this.myProducts = this.myProducts.filter(
        (product) => product.product_id !== productId
      );
      this.cdr.detectChanges();
    });
  }
}

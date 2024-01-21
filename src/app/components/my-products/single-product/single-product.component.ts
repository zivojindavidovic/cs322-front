import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
})
export class SingleProductComponent implements OnInit {
  product: Product;
  id: string
  updateProduct: FormGroup

  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((param) => {
      this.id = param['id'];
      this.getProduct(this.id);
    });

    this.initForm();    
  }

  initForm(){
    this.updateProduct = new FormGroup({
      price: new FormControl("", Validators.required)
    })
  }

  getProduct(id: string) {
    this._productService.getSingleProduct(id).subscribe((data) => {
      this.product = data;
      console.log(data);
      console.log(this.product)
      this.cdr.detectChanges();
    });
  }

  submitUpdateProduct(){
    let price = this.updateProduct.get('price')?.value

    if (price === "") {
      price = this.product.price
    }

    this._productService.updateProduct(this.id, price).subscribe((data) => {
      console.log(data);
      this.product = this.product;
      this.product.price = price
      this.cdr.detectChanges();
    })
  }
}

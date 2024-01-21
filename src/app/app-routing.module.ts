import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { MyProductsComponent } from './components/my-products/my-products.component';
import { SingleProductComponent } from './components/my-products/single-product/single-product.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: ProductsComponent },
  { path: 'my-orders', component: MyOrdersComponent },
  { path: 'my-products', component: MyProductsComponent },
  { path: 'my-products/:id', component: SingleProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { UserService } from './_services/user.service';
import { AdminComponent } from './admin/admin.component';
import { AllusersComponent } from './allusers/allusers.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { CartStatusComponent } from './cart-status/cart-status.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { UserComponent } from './user/user.component';
import { ProductCategoryMenuComponent } from './product-category-menu/product-category-menu.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductByCategoryComponent } from './product-by-category/product-by-category.component';
import { FooterComponent } from './footer/footer.component';
import { AddProductComponent } from './add-product/add-product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    HeaderComponent,
    LoginComponent,
    ForbiddenComponent,
    RegisterComponent,
    AllusersComponent,
    CartStatusComponent,
    CartDetailsComponent,
    SearchComponent,
    ProductCategoryMenuComponent,
    ProductListComponent,
    ProductDetailsComponent,
    ProductByCategoryComponent,
    FooterComponent,
    AddProductComponent,
    CheckoutComponent,
    ViewOrdersComponent,
    AddCategoryComponent,
    EditProductComponent,
    EditUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    NgbPaginationModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

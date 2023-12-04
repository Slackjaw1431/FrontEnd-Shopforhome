import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { UserService } from './_services/user.service';
import { AdminComponent } from './admin/admin.component';
import { AllusersComponent } from './allusers/allusers.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { BooksComponent } from './books/books.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    RegisterComponent,
    AllusersComponent,
    BooksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    NgbPaginationModule,
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

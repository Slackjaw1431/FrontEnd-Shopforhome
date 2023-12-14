import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../product';
import { ProductCategory } from '../product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:9091/products';

  private categoryUrl = 'http://localhost:9091/product-category';

  constructor(private httpClient: HttpClient) {}

  getProductCategories(): Observable<ProductCategory[]> {
    let categories = this.httpClient.get<GetResponseProductCategory>(
      this.categoryUrl
    );
    return categories.pipe(
      map((response) => response._embedded.productCategory)
    );
  }

  getProduct(theProductId: number): Observable<Product> {
    // need to build URL based on product id
    const productUrl = `http://localhost:9091/products/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  getProductListPaginate(
    thePage: number,
    thePageSize: number,
    theCategoryId: number
  ): Observable<GetResponseProducts> {
    // need to build URL based on category id, page and size
    const searchUrl =
      `http://localhost:9091/products/search/findByCategoryId?id=${theCategoryId}` +
      `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductList(theCategoryId: number): Observable<Product[]> {
    // need to build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    // need to build URL based on the keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }

  searchProductsPaginate(
    thePage: number,
    thePageSize: number,
    theKeyword: string
  ): Observable<GetResponseProducts> {
    // need to build URL based on keyword, page and size
    const searchUrl =
      `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}` +
      `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient
      .get<GetResponseProducts>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }

  // getAllProducts(): Observable<Product[]> {
  //   let products = this.httpClient.get<GetResponseProducts>(this.baseUrl);
  //   return products.pipe(map((response) => response._embedded.products));
  // }
  getAllProducts(
    currentPage: number,
    pageSize: number
  ): Observable<ProductsPageResponse> {
    const url = `${this.baseUrl}?page=${currentPage}&size=${pageSize}`;

    return this.httpClient.get<GetResponseProducts>(url).pipe(
      map((response: GetResponseProducts) => ({
        products: response._embedded.products,
        page: response.page,
      }))
    );
  }

  getProductsByCategory(
    categoryId: number,
    currentPage: number,
    pageSize: number
  ): Observable<ProductsPageResponse> {
    const url = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}&page=${currentPage}&size=${pageSize}`;

    return this.httpClient.get<GetResponseProducts>(url).pipe(
      map((response: GetResponseProducts) => ({
        products: response._embedded.products,
        page: response.page,
      }))
    );
  }

  addProduct(newProduct: Product): Observable<any> {
    // console.log('pRODUCT service: ' + JSON.stringify(newProduct));

    const product: any = {
      sku: newProduct.sku || '',
      name: newProduct.name || '',
      description: newProduct.description || '',
      brand: newProduct.brand || '',
      discount: newProduct.discount || '',
      unitPrice: newProduct.unitPrice || 0,
      totalSold: newProduct.totalSold || 0,
      unitsInStock: newProduct.unitsInStock || 0,
      category: newProduct.category || 0,
      imageUrl: newProduct.imageUrl || '',
    };

    console.log('ADDING ' + JSON.stringify(product));

    return this.httpClient.post<any>(this.baseUrl, newProduct);
  }

  addCategory(newCategory: ProductCategory): Observable<any> {
    const category: any = {
      name: newCategory.categoryName || '',
    };

    console.log('ADDING ' + JSON.stringify(category));

    return this.httpClient.post<any>(this.categoryUrl, newCategory);
  }

  updateProduct(productId: number, productData: any): Observable<any> {
    const url = `${this.baseUrl}/${productId}`;
    // console.log('In the product service :' + JSON.stringify(productData));
    return this.httpClient.put<any>(url, productData);
  }

  deleteProduct(productId: number) {
    const url = `${this.baseUrl}/${productId}`;
    return this.httpClient.delete<any>(url);
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}

interface ProductsPageResponse {
  products: Product[];
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

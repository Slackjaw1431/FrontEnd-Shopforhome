import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { Book } from './book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  apiUrl = 'http://localhost:8080/books';
  // apiUrl = "http://3.88.220.28:8080/books";

  constructor(private http: HttpClient) {}

  getPost() {
    return this.http.get(this.apiUrl);
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  addBook(newBook: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, newBook);
  }

  updateBook(updatedBook: Book): Observable<Book> {
    const url = `${this.apiUrl}/${updatedBook.id}`;
    return this.http.put<Book>(url, updatedBook);
  }

  deleteBook(bookId: number): Observable<void> {
    const url = `${this.apiUrl}/${bookId}`;
    return this.http.delete<void>(url);
  }

  getBookById(id: number): Observable<Book> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Book>(url);
  }
}

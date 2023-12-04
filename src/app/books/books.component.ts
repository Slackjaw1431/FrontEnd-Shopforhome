import { Component, OnInit } from '@angular/core';
import { BookService } from '../post.service';
import { Book } from '../book.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  posts: any;
  id: number;
  book: Book = new Book(0, '', '', '', 0, 0);

  constructor(
    private service: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.service.getBooks().subscribe((response) => {
      this.posts = response;
    });
  }

  deleteBook(bookId: number) {
    this.service.deleteBook(bookId).subscribe(() => {
      console.log('Deleted Book:', bookId);
      this.ngOnInit();
    });
  }

  onUpdateBook(bookId: number) {
    this.id = bookId;
    this.service.getBookById(this.id).subscribe(
      (data) => {
        this.book = data;
      },
      (error) => console.log(error)
    );
    this.router.navigate(['/update-book', this.id]);
  }
}

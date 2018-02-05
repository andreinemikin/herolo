import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Book} from '../models/Book';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class BookDataService {

  bookList = new Subject<Book[]>();
  books: Book[] = [];

  constructor(private http: HttpClient) {

  }

  getBooks() {
    this.http.get<Book[]>('./assets/data.json').subscribe((books: Book[]) => {
      this.books.push(...books);
      this.bookList.next(this.books.slice());
    });
  }

  getBook(index: number) {
    return this.books[index];
  }

  addBook(book: Book) {
    this.books.push(book);
    this.bookList.next(this.books.slice());
  }

  editBook(index: number, book: Book) {
    this.books[index] = book;
    this.bookList.next(this.books.slice());
  }

  deleteBook(index: number) {
    this.books.splice(index, 1);
    this.bookList.next(this.books.slice());
  }
}

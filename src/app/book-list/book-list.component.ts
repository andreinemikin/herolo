import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Book} from '../models/Book';
import {DialogService} from 'ng2-bootstrap-modal';
import {BookDialogComponent} from '../book-dialog/book-dialog.component';
import {DeletePromtComponent} from '../delete-promt/delete-promt.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: Book[] = [];
  dialog;

  constructor(private http: HttpClient, private dialogService: DialogService) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.http.get('./assets/data.json').subscribe((books: Book[]) => {
      this.books = books;
    });
  }

  editBook(book: Book, index: number) {
    this.dialog = this.dialogService.addDialog(BookDialogComponent, {
      title: 'Edit book',
      book: book,
      books: this.books
    }).subscribe((editBook: Book) => {
      if(editBook) {
        this.books.splice(index, 1, editBook);
        this.books = this.books.slice();
      }
    });
  }

  deleteBook(deletedBook: Book) {
    this.dialog = this.dialogService.addDialog(DeletePromtComponent, {
      title: 'Delete book',
      message: 'Are you shure you want to delete this book?'
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.books = this.books.filter((book: Book) => {
          return book.title !== deletedBook.title;
        });
      }
    });
  }

  addBook() {
    this.dialog = this.dialogService.addDialog(BookDialogComponent, {
      title: 'Please add new book',
      book: new Book(),
      books: this.books
    }).subscribe((book: Book) => {
      if(book) {
        this.books.push(book);
        this.books = this.books.slice();
      }
    });
  }

  ngOnDestroy() {
    this.dialog.unsubscribe();
  }
}

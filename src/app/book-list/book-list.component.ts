import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from '../models/Book';
import {DialogService} from 'ng2-bootstrap-modal';
import {BookDialogComponent} from '../book-dialog/book-dialog.component';
import {BookDataService} from '../services/book-data.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: Book[] = [];
  dialog: Subscription;
  bookSubscription: Subscription;

  constructor(private bookService: BookDataService, private dialogService: DialogService) { }

  ngOnInit() {
    this.bookService.getBooks();
    this.bookSubscription = this.bookService.bookList.subscribe((books: Book[]) => {
      this.books = books;
    });
  }

  addBook() {
    this.dialog = this.dialogService.addDialog(BookDialogComponent, {
      title: 'Please add new book.',
      editMode: false
    }).subscribe((book: Book) => {
      if(book) {
        this.bookService.addBook(book);
      }
    });
  }

  ngOnDestroy() {
    this.dialog.unsubscribe();
    this.bookSubscription.unsubscribe();
  }
}

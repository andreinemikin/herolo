import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Book} from '../models/Book';
import {DeletePromtComponent} from '../delete-promt/delete-promt.component';
import {BookDialogComponent} from '../book-dialog/book-dialog.component';
import {DialogService} from 'ng2-bootstrap-modal';
import {BookDataService} from '../services/book-data.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: '[app-book]',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, OnDestroy {

  @Input() book: Book;
  @Input() index: number;
  dialog: Subscription;

  constructor(private dialogService: DialogService, private bookService: BookDataService) {
  }

  ngOnInit() {
  }

  editBook(index: number) {
    this.dialog = this.dialogService.addDialog(BookDialogComponent, {
      title: 'Edit book',
      editBookIndex: index,
      editMode: true
    }).subscribe((editBook: Book) => {
      if (editBook) {
        this.bookService.editBook(index, editBook);
      }
    });
  }

  deleteBook(index: number) {
    this.dialog = this.dialogService.addDialog(DeletePromtComponent, {
      title: 'Delete book',
      message: 'Are you sure you want to delete this book?'
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.bookService.deleteBook(index);
      }
    });
  }

  ngOnDestroy() {
    this.dialog.unsubscribe();
  }

}

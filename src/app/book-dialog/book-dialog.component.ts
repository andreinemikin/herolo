import {Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';
import {Book} from '../models/Book';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DialogModel} from '../models/Dialog';
import {FilterTitlePipe} from '../filter-title.pipe';
import {BookDataService} from '../services/book-data.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.css']
})
export class BookDialogComponent extends DialogComponent<DialogModel, Book> implements OnInit, DialogModel {

  title: string;
  book: Book;
  editBookIndex: number;
  books: Book[];
  form: FormGroup;
  bookTitles: string[] = [];
  editMode: boolean;

  constructor(dialogService: DialogService, private filterPipe: FilterTitlePipe, private bookService: BookDataService) {
    super(dialogService);
  }

  ngOnInit() {
    this.book = this.editBookIndex? this.bookService.getBook(this.editBookIndex): new Book();
    this.books = this.bookService.books;
    this.bookTitles = this.books.map(book => book.title);


    this.form = new FormGroup({
      'author': new FormControl(this.book.author, Validators.required),
      'title': new FormControl(this.book.title, [Validators.required, this.isBookExist.bind(this)]),
      'date': new FormControl(null, [Validators.required, this.isValidDate.bind(this)])
    });
  }

  isBookExist(control: FormControl): {[s: string]: boolean} {
    if(control.value) {
      let title =  this.filterPipe.transform(this.books, control.value);
      if(this.editMode) {
        if(this.bookTitles.indexOf(this.book.title) !== -1) {
          this.bookTitles.splice(this.bookTitles.indexOf(this.book.title), 1);
        }
      }
      if(this.bookTitles.indexOf(title) !== -1) {
        return {'isExistTitle': true}
      }
    }
    return null;
  }

  isValidDate(control: FormControl): {[s: string]: boolean} {
    if(new Date(control.value) > new Date()) {
      return {'isValidDate': true};
    }
    return null;
  }

  confirm() {
    this.result = this.form.value;
    this.close();
  }
}

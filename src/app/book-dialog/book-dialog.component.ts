import {Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';
import {Book} from '../models/Book';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DialogModel} from '../models/Dialog';
import * as moment from 'moment';
import {FilterTitlePipe} from '../filter-title.pipe';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.css']
})
export class BookDialogComponent extends DialogComponent<DialogModel, Book> implements OnInit, DialogModel {

  title: string;
  book: Book;
  books: Book[];
  editForm: FormGroup;
  bookTitles: string[] = [];
  editMode: boolean;

  constructor(dialogService: DialogService, private filterPipe: FilterTitlePipe) {
    super(dialogService);
  }

  ngOnInit() {
    this.books.forEach((book) => {
      this.bookTitles.push(book.title);
    });

    this.editForm = new FormGroup({
      'author': new FormControl(this.book.author, Validators.required),
      'title': new FormControl(this.book.title, [Validators.required, this.isBookExist.bind(this)]),
      'date': new FormControl(this.book.date, [Validators.required, this.isValidDate.bind(this)])
    });
  }

  isBookExist(control: FormControl): {[s: string]: boolean} {
    if(control.value) {
      let title =  this.filterPipe.transform(this.books, control.value);
      if(this.editMode) {
        this.bookTitles.splice(this.bookTitles.indexOf(this.book.title), 1);
      }
      if(this.bookTitles.indexOf(title) !== -1) {
        return {'isExistTitle': true}
      }
    }
    return null;
  }

  isValidDate(control: FormControl): {[s: string]: boolean} {
      if(!moment(control.value, 'MM/DD/YYYY', true).isValid()) {
        return {'isValidDate': true};
      }
      return null;
  }

  confirm() {
    this.result = this.editForm.value;
    this.close();
  }
}

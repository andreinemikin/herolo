import {Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';
import {Book} from '../models/Book';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DialogModel} from '../models/Dialog';

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

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  ngOnInit() {
    this.books.forEach((book) => {
      this.bookTitles.push(book.title);
    });

    this.editForm = new FormGroup({
      'author': new FormControl(this.book.author, Validators.required),
      'title': new FormControl(this.book.title, [Validators.required, this.isBookExist.bind(this)]),
      'date': new FormControl(this.book.date)
    });
  }

  isBookExist(control: FormControl): {[s: string]: boolean} {
    if(this.bookTitles.indexOf(control.value) !== -1) {
      return {'isExistTitle': true}
    }
    return null;
  }

  confirm() {
    this.result = this.editForm.value;
    this.close();
  }
}

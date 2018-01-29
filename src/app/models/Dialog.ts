import {Book} from './Book';

export interface DialogModel {
  title: string;
  books: Book[];
  book?: Book;
}

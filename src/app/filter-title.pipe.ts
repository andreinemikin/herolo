import { Pipe, PipeTransform } from '@angular/core';
import {Book} from './models/Book';

@Pipe({
  name: 'filterTitle'
})
export class FilterTitlePipe implements PipeTransform {

  transform(books: Book[]): Book[] {
    if(!books.length) {return books}

    return books.map((book: Book) => {
      book.title = book.title.split(' ').map((title) => {
        title = title.replace(/[^0-9a-z]/gi, '').toLowerCase();
        return title.charAt(0).toUpperCase() + title.slice(1);
      }).join(' ');
      return book;
    })
  }

}

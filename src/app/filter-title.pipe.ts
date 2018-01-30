import { Pipe, PipeTransform } from '@angular/core';
import {Book} from './models/Book';

@Pipe({
  name: 'filterTitle'
})
export class FilterTitlePipe implements PipeTransform {

  transform(books: Book[], title?: string): any {
    if(!books.length) {return books}

    if(!title) {
      return books.map((book: Book) => {
        book.title = this.replaceSymbol(book.title);
        return book;
      })
    }
    return this.replaceSymbol(title);
  }

  replaceSymbol(data: string) {
    data = data.split(' ').map((title) => {
      title = title.replace(/[^0-9a-z]/gi, '').toLowerCase();
      return title.charAt(0).toUpperCase() + title.slice(1);
    }).join(' ').trim();
    return data;
  }

}

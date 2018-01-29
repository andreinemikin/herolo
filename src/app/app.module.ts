import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BookListComponent} from './book-list/book-list.component';
import {HttpClientModule} from '@angular/common/http';
import {BootstrapModalModule} from 'ng2-bootstrap-modal';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DeletePromtComponent} from './delete-promt/delete-promt.component';
import {FilterTitlePipe} from './filter-title.pipe';
import {BookDialogComponent} from './book-dialog/book-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookDialogComponent,
    DeletePromtComponent,
    FilterTitlePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BootstrapModalModule.forRoot({container: document.body})
  ],
  entryComponents: [
    BookDialogComponent,
    DeletePromtComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

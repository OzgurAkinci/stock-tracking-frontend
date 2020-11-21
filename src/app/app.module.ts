import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockComponent } from './stock/stock.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {StockService} from './service/stock.service';
import {HttpClientModule} from '@angular/common/http';
import {environment} from '../environments/environment';
import {StockEditComponent} from './stock/stock-edit/stock-edit.component';
import {FormsModule} from '@angular/forms';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {ConfirmationDialogComponent} from './components/confirmation-dialog/confirmation-dialog.component';
import {ConfirmationDialogService} from './components/confirmation-dialog/confirmation-dialog.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationDialogComponent,
    StockComponent,
    StockEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [
    {
      provide: 'serverUrl', useValue: environment.serverUrl
    },
    ConfirmationDialogService,
    StockService],
  bootstrap: [AppComponent],
  entryComponents: [ ConfirmationDialogComponent ],
})
export class AppModule { }

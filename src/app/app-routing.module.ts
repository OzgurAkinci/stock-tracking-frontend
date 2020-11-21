import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StockComponent} from './stock/stock.component';

const routes: Routes = [
  {
    path: '',
    component: StockComponent
  },
  {path: '**', redirectTo: 'demo1/error/403', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

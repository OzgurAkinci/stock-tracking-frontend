import { Component, OnInit } from '@angular/core';
import {StockService} from '../service/stock.service';
import {Stock} from '../model/stock';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {StockEditComponent} from './stock-edit/stock-edit.component';
import {NotificationsService} from 'angular2-notifications';
import {ConfirmationDialogService} from '../components/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  stocks: Stock[] = [];
  constructor(private stockService: StockService, private modalService: NgbModal,
              private notificationsService: NotificationsService, private cds: ConfirmationDialogService) { }


  ngOnInit(): void {
    this.loadData();
  }

  loadData(): any {
    this.stockService.getAll().subscribe(data => {
      this.stocks = data;
    });
  }

  open(stock = new Stock()): any {
    const modalRef = this.modalService.open(StockEditComponent);
    modalRef.componentInstance.stock = stock;
    modalRef.result.then((result) => {
      if (result) {
        this.loadData();
      }
    });
  }

  public openDeleteConfirmationDialog(id: number): any {
    this.cds.confirm('Please confirm..', 'Do you really want to delete ?')
      .then((confirmed) => {
        if (confirmed) {
          this.delete(id);
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  delete(id: number): any {
    this.stockService.delete(id).subscribe(data => {
      this.loadData();
      this.notificationsService.success('Success', 'Deleted Successfully', {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: false,
        clickIconToClose: true
      });
    });
  }

}

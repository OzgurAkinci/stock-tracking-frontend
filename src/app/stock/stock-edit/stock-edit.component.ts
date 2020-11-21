import {Component, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {StockService} from '../../service/stock.service';
import {Stock} from '../../model/stock';
import {NgForm} from '@angular/forms';
import {NotificationsService} from 'angular2-notifications';
import {EventEmitter} from 'events';

@Component({
  selector: 'app-stock',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.css']
})
export class StockEditComponent implements OnInit {
  stock: Stock = new Stock();
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  isDisabled = false;

  submitted = false;
  constructor(private stockService: StockService, public activeModal: NgbActiveModal,
              private notificationsService: NotificationsService) { }

  ngOnInit(): void {

  }

  changedEvent(): any {
    this.stockService.findByStockCode(this.stock.stockCode).subscribe(data => {
      if (data){
        this.isDisabled = true;
        this.stock.productName = data.productName;
      }
    });
  }

  save(form: NgForm): any {
    this.submitted = true;
    if (form.valid) {
      this.stockService.save(this.stock).subscribe(result => {
        this.stock = result;
        this.notificationsService.success('Success', 'Saved Successfully', {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: false,
          clickIconToClose: true
        });
        this.activeModal.close(this.stock);
      }, error => {
        this.notificationsService.error('Error', error.message, {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: false,
          clickIconToClose: true
        });
      });
    }
  }


}

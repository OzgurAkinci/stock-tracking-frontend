import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Stock} from '../model/stock';

@Injectable({
    providedIn: 'root'
})
export class StockService {
    constructor(@Inject('serverUrl') private serverUrl: string, private http: HttpClient) {
    }

    getAll(): Observable<Stock[]> {
        return this.http.get<Stock[]>(this.serverUrl + '/stock/list');
    }

    get(id: number): Observable<Stock> {
        return this.http.get<Stock>(this.serverUrl + '/stock/get/' + id);
    }

    findByStockCode(stockCode: string): Observable<Stock> {
      return this.http.get<Stock>(this.serverUrl + '/stock/findByStockCode/' + stockCode);
    }

    save(stock: Stock): Observable<Stock> {
      return this.http.post<Stock>(this.serverUrl + '/stock/save/', stock);
    }

    delete(id: number): Observable<any>{
      return this.http.delete(this.serverUrl + '/stock/delete/' + id);
    }

}

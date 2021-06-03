import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OrderBillDescription } from 'src/app/core/models/bill.model';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  constructor(
    private http: HttpClient
  ) { }

  getUserBills() {
    return this.http.get<OrderBillDescription[]>(`${environment.url_api}/bill/user`);
  }

}

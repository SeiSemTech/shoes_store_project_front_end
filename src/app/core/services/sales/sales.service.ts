import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Bill, BillDescription} from 'src/app/core/models/bill.model';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(
    private http: HttpClient
  ) { }

  getAllBillInformation() {
    return this.http.get<BillDescription[]>(`${environment.url_api}/bill/description`);
  }

  setUserBill(bill: Bill[])  {
    return this.http.post(`${environment.url_api}/bill`, bill);
  }

}

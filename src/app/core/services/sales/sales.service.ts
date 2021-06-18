import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Bill, BillDescription, BillEmail, BillStatus } from 'src/app/core/models/bill.model';

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

  setUserBill(bill: Bill[]) {
    return this.http.post(`${environment.url_api}/bill`, bill);
  }

  sendEmail(bill: { order: any[] }) {
    return this.http.post(`${environment.url_api}/bill/send_email`, bill);
  }

  updateBillStatus(billStatus: BillStatus) {
    return this.http.post(`${environment.url_api}/bill/update_bill_status`, billStatus);
  }
}

import { AfterViewInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { OrderBillDescription } from 'src/app/core/models/bill.model';
import { PurchasesService } from 'src/app/core/services/purchases/purchases.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements AfterViewInit {
  orderBillDescription: OrderBillDescription[] = [];
  displayedColumns: string[] = ['id_bill', 'product_name', 'quantity', 'price', 'date'];
  dataSource: MatTableDataSource<OrderBillDescription>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private purchasesService: PurchasesService,
    private snackBar: MatSnackBar,
  ) { }

  ngAfterViewInit() {
    this.getBillDescription();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  private getBillDescription() {
    this.purchasesService.getUserBills().subscribe((response: any) => {
      if (response.status_code === 200) {
        this.orderBillDescription = response;
        console.log(this.orderBillDescription, 'llegué');
        this.dataSource = new MatTableDataSource(this.orderBillDescription);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else if (response.status_code === 404) {
        alert("Aún no tienes compras.");
        this.snackBar.open('Dirigete a la sección de productos para realizar tu primer compra', 'cerrar', { duration: 2000 });
      }
      (error: any) => { console.log(error); this.snackBar.open('Error inesperado.', 'cerrar', { duration: 2000 }); }
    });
  }
}

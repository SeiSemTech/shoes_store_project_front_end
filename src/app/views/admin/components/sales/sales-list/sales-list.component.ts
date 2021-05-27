import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {SalesService} from 'src/app/core/services/sales/sales.service';
import {BillDescription} from 'src/app/core/models/bill.model';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent implements AfterViewInit {
  billDescription: BillDescription[] = [];
  displayedColumns: string[] = ['id_product_config', 'name', 'date', 'quantity', 'price'];
  dataSource: MatTableDataSource<BillDescription>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private salesService: SalesService,
  ) {

  }

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
    this.salesService.getAllBillInformation().subscribe((response: any) => {
      this.billDescription = response.bill_description;
      console.log(this.billDescription);
      this.dataSource = new MatTableDataSource(this.billDescription);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}

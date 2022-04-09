import { ServiceService } from 'src/app/modules/services/service.service';
import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Payment, PayTimes } from '../../auth/auth.model';
import { AdminService } from '../../admin/admin.service';


@Component({
  selector: 'app-firmowner-payments',
  templateUrl: './firmowner-payments.component.html',
  styleUrls: ['./firmowner-payments.component.scss']
})
export class FirmownerPaymentsComponent implements OnInit, OnDestroy {


  displayedColumns: string[] = ['year', 'month', 'paydate', 'due',  'amount'];
  dataSource: MatTableDataSource<PayTimes>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // subscritions
  private orderSub: Subscription;

  payment: Payment;

  selectedPayment: Payment;

  showPayment: boolean;

  totalPay = 0;
  totalDue = 0;
  payAmount=0;
  dueDate = new Date().toString();

  constructor(private router: Router, private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getUserPayments();
    this.orderSub = this.adminService.userPaymentdataUpdatedListener()
  .subscribe( (res: Payment) => {
    this.payment = res;
    console.log(this.payment);
    if (this.payment) {
      for (let p of this.payment.payments) {
        this.totalPay += p.amount;
        this.totalDue += p.due;
        this.dueDate = p.year.toString() + '-' + p.month.toString() + '-20';
      }
      this.payAmount = this.totalDue;
      this.dataSource = new MatTableDataSource(this.payment.payments);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
   }
  });
  }


  ngOnDestroy() {
    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  makePayment(amount: number) {
    this.adminService.createPayment(amount);
  }


}

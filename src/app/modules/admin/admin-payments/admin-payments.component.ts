import { ServiceService } from 'src/app/modules/services/service.service';
import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Payment, PayTimes } from '../../auth/auth.model';
import { AdminService } from '../admin.service';


@Component({
  selector: 'app-admin-payments',
  templateUrl: './admin-payments.component.html',
  styleUrls: ['./admin-payments.component.scss']
})
export class AdminPaymentsComponent implements OnInit {

  
  displayedColumns: string[] = ['userId', 'userType', 'name', 'email',  'action'];
  displayedColumnsPay: string[] = ['year', 'month', 'paydate', 'due',  'amount'];
  dataSource: MatTableDataSource<Payment>;
  dataSourcePay: MatTableDataSource<PayTimes>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // subscritions
  private orderSub: Subscription;

  @Input() userType = 'serviceProvider';

  payments: Payment[] = [];

  selectedPayment: Payment;

  finalPayments : Payment[] = [];

  showPayment: boolean;

  constructor(private router: Router, private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getPayments();
    this.orderSub = this.adminService.paymentdataUpdatedListener()
  .subscribe( (res: Payment[]) => {
    this.payments = res;
    console.log(this.payments);
    if (this.payments) {
      this.dataSource = new MatTableDataSource(this.addOrder(this.payments, this.userType));
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


 // classify recieved bookings
  addOrder(pms: Payment[], state: string) {
    const payments = [];
    for (const p of pms) {
      if (p.user_type === state) {
        payments.push(Object.assign({}, p));
      }
    }
    this.finalPayments = [...payments];
    return this.finalPayments;
  }


   // get selected booking details
   showSelectedOrder(userId: string) {
    for (const p of this.finalPayments) {
      if (p.user_id === userId) {
        this.selectedPayment = p;
        this.showPayment = true;
        this.dataSourcePay = new MatTableDataSource(this.selectedPayment.payments);
        this.dataSourcePay.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        return;
      }
    }
  }

}

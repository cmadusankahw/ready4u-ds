import { AuthService } from 'src/app/modules/auth/auth.service';
import { FirmOwnerService } from './../firm-owner.service';
import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { Order } from '../../services/service.model';


@Component({
  selector: 'app-firmwoner-orders',
  templateUrl: './firmwoner-orders.component.html',
  styleUrls: ['./firmwoner-orders.component.scss']
})
export class FirmwonerOrdersComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['oid', 'sp', 'time', 'category', 'task', 'action'];
  dataSource: MatTableDataSource<Order>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // subscritions
  private orderSub: Subscription;
  private nameSub: Subscription;

  @Input() orderType = 'ongoing';

  recievedOrders: Order[] = [];

  currentOrder: Order;

  showOrder: boolean;

  sProvider: string = '';

  serviceProviders: string[] = [];

  @Input() firmId: string;


  constructor(private router: Router, private firmOwnerService: FirmOwnerService, private authService: AuthService) { }

  ngOnInit() {
    // get all orders
        this.firmOwnerService.getFirmOrders();
        this.orderSub = this.firmOwnerService.getFirmOrdersUpdatedListener()
      .subscribe( (res: Order[]) => {
        this.recievedOrders = res;
        console.log(this.recievedOrders);
        if (this.recievedOrders) {
          this.dataSource = new MatTableDataSource(this.addOrder(this.recievedOrders, this.orderType));
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
       }
      });
  
        this.firmOwnerService.getFirmServiceproviderNames();
        this.nameSub = this.firmOwnerService.getServiceProviderNamesUpdatedListener()
        .subscribe ( (res: string[]) => {
          this.serviceProviders = res;
          console.log(this.serviceProviders);
        });
  }

  ngOnDestroy() {
    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }
    if (this.nameSub) {
      this.nameSub.unsubscribe();
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
  addOrder(orders: Order[], state: string) {
    const pOrders = [];
    for (const order of orders) {
      if (order.state === state) {
        pOrders.push(Object.assign({}, order));
      }
    }
    this.recievedOrders = [...pOrders];
    return this.recievedOrders;
  }


   // get selected booking details
   showSelectedOrder(orderId: string) {
    for (const order of this.recievedOrders) {
      if (order.order_id === orderId) {
        this.currentOrder = order;
        this.showOrder = true;
        return;
      }
    }
  }


}

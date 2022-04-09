import { ServiceService } from 'src/app/modules/services/service.service';
import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { Order } from '../../services/service.model';

@Component({
  selector: 'app-serviceprovider-orders',
  templateUrl: './serviceprovider-orders.component.html',
  styleUrls: ['./serviceprovider-orders.component.scss']
})
export class ServiceproviderOrdersComponent implements OnInit {

  displayedColumns: string[] = ['oid', 'sp', 'time', 'category', 'task', 'action'];
  dataSource: MatTableDataSource<Order>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // subscritions
  private orderSub: Subscription;

  @Input() orderType = 'ongoing';

  orders: Order[] = [];

  recievedOrders: Order[] = [];

  currentOrder: Order;

  showOrder: boolean;


  constructor(private router: Router, private serviceservice: ServiceService) { }

  ngOnInit() {
    this.serviceservice.getOrders();
    this.orderSub = this.serviceservice.getOrdersUpdateListener()
  .subscribe( (res: Order[]) => {
    this.recievedOrders = res;
    console.log(this.recievedOrders);
    if (this.recievedOrders) {
      this.dataSource = new MatTableDataSource(this.addOrder(this.recievedOrders, this.orderType));
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
    for (const order of this.orders) {
      if (order.order_id === orderId) {
        this.currentOrder = order;
        this.showOrder = true;
        return;
      }
    }
  }


}

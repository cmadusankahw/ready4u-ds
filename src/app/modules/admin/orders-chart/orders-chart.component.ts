import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { OrderData } from '../admin.model';
import { AdminService } from '../admin.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-orders-chart',
  templateUrl: './orders-chart.component.html',
  styleUrls: ['./orders-chart.component.scss']
})
export class OrdersChartComponent implements OnInit {

  private userDataSub: Subscription;

  public orderData: OrderData;

  public chartType = 'line';

  public chartDatasets: Array<any> = [
    { data: [], label: 'orders' }
  ];

  public chartLabels: Array<any> = ['Ongoing', 'Completed', 'Cancelled' ];

  public chartColors: Array<any> = [
    {
      backgroundColor: ['#ABC123', '#BCD456', '#DEF567'],
      hoverBackgroundColor: ['#ABC127', '#BCD458', '#DEF789'],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };


  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getOrderData();
    this.userDataSub = this.adminService.getOrderDataUpdatedListener()
    .subscribe( (result: OrderData) => {
      this.orderData = result;
      console.log(this.orderData);
      this.chartDatasets[0].data = [this.orderData.ongoing ,
        this.orderData.completed, this.orderData.cancelled];
    })
   
  }

  ngOnDestroy() {
    if (this.userDataSub) {
      this.userDataSub.unsubscribe();
    }
  }


}

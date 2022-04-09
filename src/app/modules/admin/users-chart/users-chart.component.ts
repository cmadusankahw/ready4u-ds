import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UserData } from '../admin.model';
import { AdminService } from '../admin.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-users-chart',
  templateUrl: './users-chart.component.html',
  styleUrls: ['./users-chart.component.scss']
})
export class UsersChartComponent implements OnInit, OnDestroy {

  private userDataSub: Subscription;

  public usersData: UserData;

  public chartType = 'bar';

  public chartDatasets: Array<any> = [
    { data: [], label: 'users' }
  ];

  public chartLabels: Array<any> = ['Customers', 'Service Individuals', 'Firm Owners' ];

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
    this.adminService.getUserData();
    this.userDataSub = this.adminService.getUserdataUpdatedListener()
    .subscribe( (result: UserData) => {
      this.usersData = result;
      console.log(this.usersData);
      this.chartDatasets[0].data = [this.usersData.customers ,
        this.usersData.serviceProviders, this.usersData.firmOwners];
    })
   
  }

  ngOnDestroy() {
    if (this.userDataSub) {
      this.userDataSub.unsubscribe();
    }
  }

}

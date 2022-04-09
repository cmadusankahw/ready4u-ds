import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { SuccessComponent } from 'src/app/success/success.component';
import { AuthService } from '../../auth/auth.service';
import { Order } from '../../services/service.model';
import { ServiceService } from '../../services/service.service';
import { SafetyOptionsComponent } from '../safety-options/safety-options.component';

@Component({
  selector: 'app-task-time-countdown',
  templateUrl: './task-time-countdown.component.html',
  styleUrls: ['./task-time-countdown.component.scss'],
})
export class TaskTimeCountdownComponent implements OnInit, OnDestroy {

  private orderSub: Subscription;

  public order: Order;

  public orderId: string;

  // calculation related
  public hour = 0;
  public minute = 0;
  public amount =  0;

  public myTimer: any;

  // recieved travel charge
  public travelCharge = 0;

  // check task is started
  public taskStarted = false;


  constructor(private serviceService: ServiceService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private authService: AuthService,
              private _bottomSheet: MatBottomSheet) {
      // get order Id
      this.orderId  = route.snapshot.params.id;

      this.authService.taskStarted()
      .subscribe( (data) => {
        if (data.started) {
          this.dialog.open(SuccessComponent, {data: {message: 'Task has Started!'}});
          this.startCounter();
        }
      });

      this.authService.taskCompleted()
      .subscribe( (data) => {
        if (data.completed) {
          this.dialog.open(SuccessComponent, {data: {message: 'Task has Completed!'}});
          this.travelCharge = data.amount;
          this.amount += data.amount;
          this.stopCounter();
        }
      });

      this.authService.amountCharged()
      .subscribe( (data) => {
        if (data.charged) {
          this.router.navigate(['/cust/bill/' + this.orderId]);
        }
      });
  }

  public ngOnInit() {
    this.serviceService.getOrder(this.orderId);
    this.orderSub = this.serviceService.getResOrderUpdateListener().subscribe( (order: Order) => {
      if (order) {
        this.order = order;
        this.amount = this.order.task.rate;
        console.log(this.order);
      }
    });
  }

  public ngOnDestroy() {
    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }
  }

  // update order details
  public orderCharge() {

  }

  public startCounter() {
     this.myTimer = setInterval(this.timer.bind(this), 1000);
     console.log('Counter started');
  }

  public stopCounter() {
    clearInterval(this.myTimer);
    console.log('Counter ended : time : ', this.hour, ' : ', this.minute);
  }

  public timer() {
    if (this.minute < 59) {
      this.minute = this.minute + 1 ;
    } else {
      this.hour = this.hour + 1;
      this.minute = 0;
    }
    // calc payment
    if (this.hour >= 1) {
      this.amount += this.amount / 60;
      this.amount = Number (this.amount.toFixed(2));
    }
  }

  openBottomSheet(): void {
    this._bottomSheet.open(SafetyOptionsComponent);
  }
}


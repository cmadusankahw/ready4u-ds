import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Order } from '../../services/service.model';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-serviceprovider-task-countdown',
  templateUrl: './serviceprovider-task-countdown.component.html',
  styleUrls: ['./serviceprovider-task-countdown.component.scss']
})
export class ServiceproviderTaskCountdownComponent implements OnInit, OnDestroy {

  private orderSub: Subscription;

  public order: Order;

  public orderId: string;

  // calculation related
  public hour = 0;
  public minute = 0;
  public amount =  0;

  public myTimer: any;

  // recieved travel charge
  travelCharge = 199;

  // check task is started
  public taskStarted = false;
  public completedView = false;

  constructor(private serviceService: ServiceService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
      // get order Id
      this.orderId  = route.snapshot.params.id;
  }

  public ngOnInit() {
    this.serviceService.getCurrentOrder();
    this.orderSub = this.serviceService.getOrderUpdateListener().subscribe( (order: Order) => {
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

  //  update order details
  public orderCharge() {

  }

  public startCounter() {
     this.myTimer = setInterval(this.timer.bind(this), 1000);
     console.log('Counter started');
     this.authService.sendStarted({started: true});
  }

  public stopCounter() {
    clearInterval(this.myTimer);
    console.log('Counter ended : time : ', this.hour, ' : ', this.minute);
    this.authService.sendCompleted({completed: true, amount: this.travelCharge});
    this.amount += this.travelCharge;
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

  public cancelTask() {
    this.stopCounter();
    this.authService.sendOrderCancelled({cancelled: true});
    this.serviceService.updateOrderstate('cancelled');
  }

 public completeTask() {
  this.serviceService.updateOrderCompleted('completed', this.amount );
  this.authService.sendAmountCharged({charged: true});
 }


}

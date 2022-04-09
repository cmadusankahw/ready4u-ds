import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/modules/services/service.model';
import { ServiceService } from 'src/app/modules/services/service.service';
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'app-serviceprovider-dhome',
  templateUrl: './serviceprovider-dhome.component.html',
  styleUrls: ['./serviceprovider-dhome.component.scss'],
})
export class ServiceproviderDhomeComponent implements OnInit, OnDestroy {

  // subscription
  private orderSub: Subscription;

  // recieved current order
  public currentOrder: Order ;

  public RoomList = ['Hire Inquery'];

  public user: String = 'Service Provider' ;
  public room = 'Hire Inquery';
  public messageText: String;
  public messageArray: Array<{user: String, message: String}> = [];

  // get into a chat room
  public chatMode = false;

  constructor(private serviceService: ServiceService, private authService: AuthService,  private router: Router) {
    this.authService.orderPlaced()
    .subscribe( (data) => {
      if (data.placed) {
        setTimeout( () => {
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/sp']);
        }, 700);
      }
    });

    this.authService.newUserJoined()
    .subscribe((data) => this.messageArray.push(data));

    this.authService.userLeftRoom()
    .subscribe((data) => this.messageArray.push(data));

    this.authService.newMessageReceived()
    .subscribe((data) => this.messageArray.push(data));
  }

  public ngOnInit() {
    // get current order code here
    this.serviceService.getCurrentOrder();
    this.orderSub = this.serviceService.getOrderUpdateListener()
        .subscribe((res: Order) => {
          if (res) {
           this.currentOrder = res;
           console.log(this.currentOrder);
           this.user = this.currentOrder.service_provider.service_provider_name;
  
          }
    });
    this.join();
  
  }

  public ngOnDestroy() {
    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }
    this.leave();
  }

  public acceptOrder() {
    this.authService.changeSPAcceptedState(false);
  }

  public rejectOrder() {
    this.authService.sendOrderCancelled({cancelled: true});
    this.serviceService.updateOrderstate('cancelled');
  }

    public join() {
      this.authService.joinRoom({user: this.user, room: this.room});
    }

    public leave() {
      this.authService.leaveRoom({user: this.user, room: this.room});
    }

    public sendMessage() {
      this.authService.sendMessage({user: this.user, room: this.room, message: this.messageText});
    }

}

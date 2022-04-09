import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location, ServiceProvider, UserLocation } from '../../auth/auth.model';
import { AuthService } from '../../auth/auth.service';
import { Order, Task } from '../../services/service.model';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-serviceprovider-list',
  templateUrl: './serviceprovider-list.component.html',
  styleUrls: ['./serviceprovider-list.component.scss'],
})
export class ServiceproviderListComponent implements OnInit, OnDestroy {

  private spSub: Subscription;

  public serviceProviders: ServiceProvider[] = [];

  public task: string;

  public sptask: Task;

  public category: string;

  public hireNow = false;

  @Input() public town: string;

  // selecte service provider
  public selectedServiceProvider: ServiceProvider;

  // customer current location
  public customerLocation: Location;

  // images to upload
  public image01: File;
  public image01Url: any =  './assets/images/noimg.png';
  public image02: File;
  public image02Url: any = './assets/images/noimg.png';
  public image03: File;
  public image03Url: any = './assets/images/noimg.png';

  public RoomList = ['Hire Inquery'];

  public user: String = 'Anonymous' ;
  public room = 'Hire Inquery';
  public messageText: String;
  public messageArray: Array<{user: String, message: String}> = [];

  // get into a chat room
  public chatMode = false;

  constructor( private route: ActivatedRoute,
               private router: Router,
               private authService: AuthService,
               private serviceService: ServiceService) {
    const id: string = route.snapshot.params.category_id;
    this.category = id.split('_')[0];
    this.task = id.split('_')[1];

    this.authService.newUserJoined()
    .subscribe((data) => this.messageArray.push(data));

    this.authService.userLeftRoom()
    .subscribe((data) => this.messageArray.push(data));

    this.authService.newMessageReceived()
    .subscribe((data) => this.messageArray.push(data));
  }

  public ngOnInit( ) {
    console.log(this.task);
    console.log(this.category);
    this.customerLocation = this.authService.getCustLocation();
    this.town = this.authService.getCustLocation().town;
    this.user = this.authService.getUserName();
    setTimeout(() => {
      this.authService.getServiceproviders(this.category, this.town);
      this.spSub = this.authService.getServiceproviderstUpdateListener()
          .subscribe((recievedServices: ServiceProvider[]) => {
            if (recievedServices) {
              console.log(recievedServices);
              for (const sp of recievedServices) {
                for (const cat of sp.tasks) {
                  if (cat.id === this.task) {
                    this.sptask = cat;
                    this.serviceProviders.push(sp);
                  }
                }
              }
              console.log(this.serviceProviders);
            }

      });
    }, 500);
  }

  public ngOnDestroy() {
    if (this.spSub) {
      this.spSub.unsubscribe();
    }
    this.clearImages();
  }

  // clear image cache
  public clearImages() {
    this.image01Url = './assets/images/noimg.png';
    this.image02Url = './assets/images/noimg.png';
    this.image03Url = './assets/images/noimg.png';
    this.image01 = null;
    this.image02 = null;
    this.image03 = null;
  }

  public serviceProviderSelected(userId: string) {
    for (const sp of this.serviceProviders) {
      if (sp.user_id === userId ) {
        this.selectedServiceProvider = sp;
      }
    }
  }

  public placeOrder(orderForm: NgForm) {
    if (orderForm.invalid) {
      console.log('form invalid');
      return;
    } else {
      const order: Order = {
        order_id: 'ORDER0',
        ordered_time: new Date().toISOString(),
        service_category:  this.selectedServiceProvider.service_category,
        description: orderForm.value.description,
        image1: './assets/images/noimg.png',
        image2: './assets/images/noimg.png',
        image3: './assets/images/noimg.png',
        state: 'ongoing',
        total_amount_charged: 0,
        task: this.sptask,
        service_provider: {
          user_id: this.selectedServiceProvider.user_id,
          firm_id: this.selectedServiceProvider.firm.firm_id,
          service_provider_name: this.selectedServiceProvider.first_name + ' ' + this.selectedServiceProvider.last_name,
          email: this.selectedServiceProvider.email,
          profile_pic: this.selectedServiceProvider.profile_pic,
      },
      customer: null,
        };
      this.serviceService.createOrder(order, [this.image01, this.image02, this.image03]);
      this.authService.sendOrderPlaced({placed: true});
      orderForm.resetForm();
      this.clearImages();
    }

  }

// image 01 uploading
public onImage01Uploaded(event: Event) {
const file = (event.target as HTMLInputElement).files[0];
const mimeType = file.type;
if (mimeType.match(/image\/*/) == null) {
  return;
}
const reader = new FileReader();
reader.readAsDataURL(file);
reader.onload = () => {
  this.image01 = file;
  this.image01Url = reader.result;
};
}

// image 02 uploading
public onImage02Uploaded(event: Event) {
  const file = (event.target as HTMLInputElement).files[0];
  const mimeType = file.type;
  if (mimeType.match(/image\/*/) == null) {
    return;
  }
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    this.image02 = file;
    this.image02Url = reader.result;
  };
}

  // image 03 uploading
public onImage03Uploaded(event: Event) {
const file = (event.target as HTMLInputElement).files[0];
const mimeType = file.type;
if (mimeType.match(/image\/*/) == null) {
  return;
}
const reader = new FileReader();
reader.readAsDataURL(file);
reader.onload = () => {
  this.image03 = file;
  this.image03Url = reader.result;
};
}

join() {
    this.authService.joinRoom({user: this.user, room: this.room});
}

public leave() {
    this.authService.leaveRoom({user: this.user, room: this.room});
}

public sendMessage() {
    this.authService.sendMessage({user: this.user, room: this.room, message: this.messageText});
}

}

import { MapsAPILoader, MouseEvent } from '@agm/core';
import {Location} from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { ErrorComponent } from 'src/app/error/error.component';
import { SuccessComponent } from 'src/app/success/success.component';
import {ILatLng} from '../../../directives/direction-map.directive';
import { AuthService } from '../../auth/auth.service';
import { Order } from '../../services/service.model';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-map-customer',
  templateUrl: './map-customer.component.html',
  styleUrls: ['./map-customer.component.scss'],
})
export class MapCustomerComponent implements OnInit, OnDestroy {

  @ViewChild('search', { static: true })
  public searchElementRef: ElementRef;

  // recieved location
  @Input() public recievedLocation = {
    lat: 0,
    lang: 0,
  };

  // set directions for location setting
  public origin: ILatLng ;
  // New York City, NY, USA
  public destination: ILatLng ;

  public displayDirections = true;

  private orderSub: Subscription;

  public zoom: number;

  public address: string;

  public loaded = false;

  public orderId: string;

  // current order
  public order: Order;

  private geoCoder;

  constructor( private route: ActivatedRoute,
               private router: Router,
               private location: Location,
               private mapsAPILoader: MapsAPILoader,
               private ngZone: NgZone,
               public dialog: MatDialog,
               private serviceService: ServiceService,
               private authService: AuthService) {
                 // get order Id
                const id: string = route.snapshot.params.id;
                this.orderId = id;

                // handle if order has been accepted
                this.authService.orderAccepted()
                 .subscribe((data) => {

                  // to be removed. setting a fake destination to get the map work in same pc
                  data.latitude += 0.5678;
                  data.longitude += 0.11234;
                  // to be removed

                   // setting destination
                  this.destination = data;
                   // set current location and emit location to sp
                  this.setCurrentLocation();
                  console.log('order accepted',this.destination);
                  this.loaded = true;
                  });

                  // handle if order has  been rejected
                this.authService.orderCancelled()
                  .subscribe((data) => {
                    if (data.cancelled) {
                      this.orderRejected();
                    }
                  });

                // handle if order has  been rejected
                this.authService.hasArrived()
                .subscribe((data) => {
                  if (data.arrived) {
                    this.hasArrived();
                  }
                });
                }

  public ngOnInit() {
    this.serviceService.getOrder(this.orderId);
    this.orderSub = this.serviceService.getResOrderUpdateListener().subscribe( (order: Order) => {
        if (order) {
          this.order = order;
          console.log(this.order);
        }
      });
  }

  public ngOnDestroy() {
    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }
  }

 // if order was rejected
  public orderRejected() {
    setTimeout ( () => {
      this.loaded = true;
      this.router.navigate(["cust/"]);
      this.dialog.open(SuccessComponent, {
        data: { message: 'Order was rejected! Please Find another Service Provider!' },
      });
      this.router.onSameUrlNavigation = 'reload';
    }, 600); 
  }

 // set current location
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.recievedLocation.lat = position.coords.latitude;
        this.recievedLocation.lang = position.coords.longitude;
        // setting origin
        this.origin = {latitude : position.coords.latitude,
                      longitude : position.coords.longitude };
        this.authService.sendCustomerLocation({latitude: position.coords.latitude, longitude: position.coords.longitude});
        this.zoom = 8;
       // this.getAddress(this.recievedLocation.lat, this.recievedLocation.lang);
      });
    }
  }

  // marker dragging is completed
  public markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.recievedLocation.lat = $event.coords.lat;
    this.recievedLocation.lang = $event.coords.lng;
   // this.getAddress(this.recievedLocation.lat, this.recievedLocation.lang);
  }

  // get the ddress of dragged marker
  public getAddress(latitude, longitude) {
    this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          this.dialog.open(ErrorComponent, {data: {message: 'No Results Found! Please change marker..'}});
        }
      } else {
        this.dialog.open(ErrorComponent, {data: {message: 'Geocoder failed due to: ' + status}});
      }

    });
  }

  // service provider has arrived
  public hasArrived() {
    this.router.navigate(['/cust/task/time/'+ this.orderId]);
  }

}

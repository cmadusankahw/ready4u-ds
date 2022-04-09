import { Component, OnInit, ViewChild, ElementRef, NgZone, Input, EventEmitter, Output } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { MatDialog } from '@angular/material';

import { ErrorComponent } from 'src/app/error/error.component';
import { AuthService } from '../../auth/auth.service';
import { ServiceService } from '../../services/service.service';
import { Order } from '../../services/service.model';
import { ILatLng } from 'src/app/directives/direction-map.directive';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-map-service-provider',
  templateUrl: './map-service-provider.component.html',
  styleUrls: ['./map-service-provider.component.scss']
})
export class MapServiceProviderComponent implements OnInit {


  @ViewChild('search', { static: true })
  public searchElementRef: ElementRef;

  // recieved location
  @Input() recievedLocation = {
    lat: 0,
    lang: 0,
  }

    // set directions for location setting
    public origin: ILatLng ;
    // New York City, NY, USA
    public destination: ILatLng ;
  
    public displayDirections = true;
  
    private orderSub: Subscription;

  zoom: number;
 
  address: string;

  loaded = false;
  
  // current order
  public order: Order;


  private geoCoder;


  constructor( private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public dialog: MatDialog,
    private authService: AuthService,
    private serviceService: ServiceService) {
      this.authService.customerLocationRecieved()
      .subscribe ( data => {
        this.destination = data;
        console.log('customer location recieved :', this.destination);
        // this.getAddress(data.latitude, data.longitude);
      });
     }

ngOnInit() {
  this.serviceService.getCurrentOrder();
  this.serviceService.getOrderUpdateListener().subscribe( (order: Order) => {
      if (order) {
        this.order = order;
        console.log(this.order);
      }
    });
this.setCurrentLocation();
}

// set current location
private setCurrentLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.recievedLocation.lat = position.coords.latitude ;
      this.recievedLocation.lang = position.coords.longitude ;
      // setting origin
      this.origin = {latitude : position.coords.latitude + 0.5678, // fake origin need to remove
                    longitude : position.coords.longitude + 0.11234 };
      this.authService.sendOrderAccepted({latitude: position.coords.latitude, longitude: position.coords.longitude});
      this.zoom = 8;
     // this.getAddress(this.recievedLocation.lat, this.recievedLocation.lang);
    });
  }
}


// get the ddress of dragged marker
getAddress(latitude, longitude) {
this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
console.log(results);
console.log(status);
if (status === 'OK') {
if (results[0]) {
this.address = results[0].formatted_address;
} else {
console.log( 'No Results Found! Please change marker..');
}
} else {
  console.log( 'Geocoder load failed!');
}

});
}

// cancel order
rejectOrder() {
  this.authService.sendOrderCancelled({cancelled: true});
  this.serviceService.updateOrderstate('cancelled');
}

// confirm arrived at customers' place
markArrival() {
  this.authService.sendArrived({arrived: true});
}


}

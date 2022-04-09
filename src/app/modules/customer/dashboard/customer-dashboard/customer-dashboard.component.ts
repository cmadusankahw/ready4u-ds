
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Customer, Location } from 'src/app/modules/auth/auth.model';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss'],
})
export class CustomerDashboardComponent implements OnInit, OnDestroy {

   private hSub: Subscription;

    // navigation
    public home = 'txt-white row';
    public orders = 'txt-white row';
    public profile = 'txt-white row';

    public customer: Customer;

  // get location on login
  public recievedLocation: Location  = {
    latitude: 0,
    longtitude: 0,
    town: 'Colombo',
  };

    // pass edit ability
    public editmode = true;

    public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );

    private geoCoder;

    public address: string;

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router, private authService: AuthService,
              private mapsAPILoader: MapsAPILoader) { }

  public ngOnInit() {
    this.doRoute();
    this.authService.getCustomer();
    this.hSub = this.authService.getCustomerUpdateListener().subscribe (
      (res) => {
          this.customer = res;
      });

    this.mapsAPILoader.load().then(() => {
        this.setCurrentLocation();
      });
  }

 // set current location
 private setCurrentLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.recievedLocation.latitude = position.coords.latitude;
      this.recievedLocation.longtitude = position.coords.longitude;
      this.geoCoder = new google.maps.Geocoder;
      this.getAddress(position.coords.latitude, position.coords.longitude);
      this.authService.setCustLocation(this.recievedLocation);
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
          this.recievedLocation.town = this.address.split(',')[1];
          console.log(this.recievedLocation);
        } else {
          console.log(status);
        }
      } else {
        console.log(status);
      }

    });
  }


  public ngOnDestroy() {
    if (this.hSub) {
      this.hSub.unsubscribe();
    }
  }

  public doRoute() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        if (e.url === '/cust') {
          this.navHome();
        } else if (e.url === '/cust/orders') {
          this.navOrders();
        } else if (e.url === '/cust/profile') {
          this.navProfile();
        }
    }
  });
  }

  public navHome() {
    this.home = 'txt-white row active-nav';
    this.orders = this.profile  = 'txt-white row';
  }

  public navOrders() {
    this.orders = 'txt-white row active-nav';
    this.home = this.profile  = 'txt-white row';
  }

  public navProfile() {
    this.profile = 'txt-white row active-nav';
    this.orders = this.home  = 'txt-white row';
  }

}

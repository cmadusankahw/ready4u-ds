
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, NavigationStart } from '@angular/router';

import { AuthService } from 'src/app/modules/auth/auth.service';
import { FirmOwner } from 'src/app/modules/auth/auth.model';

@Component({
  selector: 'app-firmowner-dashboard',
  templateUrl: './firmowner-dashboard.component.html',
  styleUrls: ['./firmowner-dashboard.component.scss']
})
export class FirmownerDashboardComponent implements OnInit, OnDestroy {

  
  private hSub: Subscription;

  // navigation
  sproviders = 'txt-white row';
  orders = 'txt-white row';
  profile = 'txt-white row';
  report = 'txt-white row';
  payments = 'txt-white row';

  firmOwner: FirmOwner;


  // pass edit ability
  editmode = true;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.doRoute();
    this.authService.getFirmOwner();
    this.hSub = this.authService.getFirmOwnerUpdatedListener()
    .subscribe ( (res: FirmOwner) => {
      this.firmOwner = res;
      console.log(this.firmOwner);
    })
  
  }

  ngOnDestroy() {
    if (this.hSub) {
      this.hSub.unsubscribe();
    }
  }

  doRoute() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        if (e.url === '/firm/orders') {
          this.navOrders();
        } else if (e.url === '/firm/serviceproviders') {
          this.navSproviders();
        }else if (e.url === '/firm/profile') {
          this.navProfile();
        } else if (e.url === '/firm/reports') {
          this.navReports();
        } else if (e.url === '/firm/paymeents') {
          this.navPayments();
        }
    }
  });
  }



  navOrders() {
    this.orders = 'txt-white row active-nav';
    this.sproviders = this.profile  = this.report = this.payments = 'txt-white row';
  }

  navProfile() {
    this.profile = 'txt-white row active-nav';
    this.orders = this.sproviders  = this.report = this.payments = 'txt-white row';
  }

  navReports() {
    this.report = 'txt-white row active-nav';
    this.orders = this.sproviders  = this.profile = this.payments = 'txt-white row';
  }

  navPayments() {
    this.payments = 'txt-white row active-nav';
    this.orders = this.sproviders  = this.profile = this.report =  'txt-white row';
  }

  navSproviders() {
    this.sproviders = 'txt-white row active-nav';
    this.orders = this.report  = this.profile = this.payments = 'txt-white row';
  }

}

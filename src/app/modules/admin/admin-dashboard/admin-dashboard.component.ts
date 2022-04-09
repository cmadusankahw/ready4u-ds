import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, NavigationStart } from '@angular/router';

import { AuthService } from 'src/app/modules/auth/auth.service';
import { Admin } from 'src/app/modules/auth/auth.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

 
  private hSub: Subscription;

  // navigation
  home = 'txt-white row';
  users = 'txt-white row';
  profile = 'txt-white row';
  payments = 'txt-white row';
  categories = 'txt-white row';
  reports = 'txt-white row';

  admin: Admin;


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
  this.authService.getAdmin();
  this.hSub = this.authService.getAdminUpdatedListener().subscribe (
    res => {
        this.admin = res;
    });
}

ngOnDestroy() {
  if(this.hSub){
    this.hSub.unsubscribe();
  }
}

doRoute() {
  this.router.events.subscribe((e) => {
    if (e instanceof NavigationStart) {
      if (e.url === '/admin') {
        this.navHome();
      } else if (e.url === '/admin/users') {
        this.navUsers();
      }  else if (e.url === '/admin/payments') {
        this.navPayments();
      }  else if (e.url === '/admin/categories') {
        this.navCategories();
      } else if (e.url === '/admin/profile') {
        this.navProfile();
      } else if (e.url === '/admin/reports') {
        this.navReports();
      }
  }
});
}

navHome() {
  this.home = 'txt-white row active-nav';
  this.users = this.profile  = this.payments = this.categories =  this.reports =  'txt-white row';
}

navUsers() {
  this.users = 'txt-white row active-nav';
  this.home = this.profile  = this.payments = this.categories = this.reports =   'txt-white row';
}

navPayments() {
  this.payments = 'txt-white row active-nav';
  this.home = this.profile  = this.users = this.categories = this.reports =   'txt-white row';
}

navCategories() {
  this.categories = 'txt-white row active-nav';
  this.home = this.profile  =  this.users = this.payments = this.reports = 'txt-white row';
}

navProfile() {
  this.profile = 'txt-white row active-nav';
  this.users = this.home  = this.payments = this.categories = this.reports =  'txt-white row';
}

navReports() {
  this.reports = 'txt-white row active-nav';
  this.users = this.home  = this.payments = this.categories = this.profile =  'txt-white row';
}


}

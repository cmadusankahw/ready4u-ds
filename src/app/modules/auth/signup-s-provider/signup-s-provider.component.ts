import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { ServiceCategory } from '../../services/service.model';
import { ServiceService } from '../../services/service.service';
import {FirmOwner, ServiceProvider, ServiceProviderTemp } from '../auth.model';
import { AuthService } from '../auth.service';

interface Gender {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-signup-s-provider',
  templateUrl: './signup-s-provider.component.html',
  styleUrls: ['./signup-s-provider.component.scss'],
})
export class SignupSProviderComponent implements OnInit, OnDestroy {

  // subscription
  private spSub: Subscription;

  // registered sp
  public spTemp: ServiceProviderTemp;

  public categories: ServiceCategory[] = [];

  // firm owner
  public firmOwner = false;

  // Districts
  public districts = ['Colombo', 'Kaluthara', 'Galle', 'Matara', 'Matale', 'Kandy', 'Gampaha' , 'Hambanthota', 'Negamobo', 'Chiillaw', 'Badulla' , 'Nuwara Eliya'];

  constructor(private router: Router,
              public datepipe: DatePipe,
              public authService: AuthService,
              private serviceService: ServiceService) { }

  public ngOnInit() {
    // get merchant temp
    this.spTemp = this.authService.getServiceproviderTemp();

    this.serviceService.getServiceCategories();
    this.serviceService.getServiceCategoriesUpdateListener()
      .subscribe( (res) => {
        if (res) {
          this.categories = res;
          console.log(this.categories);
         }});

    // router scroll
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
  });
  }

  public ngOnDestroy() {
  }

  // signup user
  public signupUser(signupForm: NgForm) {
    if (signupForm.invalid) {
      console.log('Form Invalid');
    } else {
      if (this.firmOwner) {
        const fo: FirmOwner = {
          user_id: 'firm_owner_' + Math.abs(Math.random() * 100),
          user_type: 'firmOwner',
          first_name: this.spTemp.first_name,
          last_name: this.spTemp.last_name,
          nic: signupForm.value.nic,
          profile_pic: './assets/images/noimg.png',
          email: this.spTemp.email,
          contact_no: this.spTemp.contact_no,
          address_line1:  signupForm.value.address1,
          address_line2: signupForm.value.address2,
          district: signupForm.value.district,
          gender: signupForm.value.gender,
          date_of_birth: signupForm.value.birthday,  // check
          reg_date: this.spTemp.reg_date,
          location: null,
          firm: { owner: true, firm_name: signupForm.value.firm_name , firm_id : signupForm.value.firm_id},
        };
        this.authService.addFirmOwner(fo, this.spTemp.password);
        } else {
          const sp: ServiceProvider = {
            user_id: 'sp_' + Math.abs(Math.random() * 100),
            user_type: 'serviceProvider',
            first_name: this.spTemp.first_name,
            last_name: this.spTemp.last_name,
            nic: signupForm.value.nic,
            profile_pic: './assets/images/noimg.png',
            email: this.spTemp.email,
            contact_no: this.spTemp.contact_no,
            service_category: signupForm.value.category,
            rating: 0,
            address_line1:  signupForm.value.address1,
            address_line2: signupForm.value.address2,
            district: signupForm.value.district,
            gender: signupForm.value.gender,
            date_of_birth: signupForm.value.birthday,  // check
            reg_date: this.spTemp.reg_date,
            tasks: [],
            isavailable: false,
            location: null,
            firm: { owner: false, firm_name: '' , firm_id : null},
          };
          this.authService.addServiceprovider(sp, this.spTemp.password);
        }
      signupForm.resetForm();
    }
  }

}

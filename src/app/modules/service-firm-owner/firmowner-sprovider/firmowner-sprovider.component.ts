import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ServiceProvider } from '../../auth/auth.model';
import { AuthService } from '../../auth/auth.service';
import { ServiceCategory } from '../../services/service.model';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-firmowner-sprovider',
  templateUrl: './firmowner-sprovider.component.html',
  styleUrls: ['./firmowner-sprovider.component.scss']
})
export class FirmownerSproviderComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['spid', 'name', 'email', 'category',  'action'];
  dataSource: MatTableDataSource<ServiceProvider>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // subscription
  private spSub: Subscription;

  private catSub: Subscription;
  
  public categories: ServiceCategory[] = [];

  public firmMembers: ServiceProvider[] = [];

  selectedUser: ServiceProvider;

  showUser = false;

  // Districts
  public districts = ['Colombo', 'Kaluthara', 'Galle', 'Matara', 'Matale', 'Kandy', 'Gampaha' , 'Hambanthota', 'Negamobo', 'Chiillaw', 'Badulla' , 'Nuwara Eliya'];


  constructor(private authService: AuthService, private serviceService: ServiceService) { }

  ngOnInit() {
    this.serviceService.getServiceCategories();
    this.catSub = this.serviceService.getServiceCategoriesUpdateListener()
      .subscribe( (res) => {
        if (res) {
          this.categories = res;
          console.log(this.categories);
         }});
    
    this.authService.getFirmMembers();
    this.spSub = this.authService.getFirmMemberUpdatedListener()
      .subscribe( (res) => {
        if (res) {
          this.firmMembers = res;
          console.log(this.firmMembers);
          this.dataSource = new MatTableDataSource(this.firmMembers);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
         }});

  }

  ngOnDestroy() {
    if (this.catSub) {
      this.catSub.unsubscribe();
    }
    if (this.spSub) {
      this.spSub.unsubscribe();
    }
  }

  signupFirmMember(signUpForm : NgForm) {
    if (signUpForm.invalid) {
      console.log ( ' Form has errors');
    }
    else {
      const sp: ServiceProvider = {
        user_id: 'firm_member_' + Math.abs(Math.random() * 100),
        user_type: 'serviceProvider',
        first_name: signUpForm.value.first_name,
        last_name: signUpForm.value.last_name,
        nic: signUpForm.value.nic,
        profile_pic: './assets/images/noimg.png',
        email: signUpForm.value.email,
        contact_no: signUpForm.value.contact_no,
        service_category: signUpForm.value.category,
        rating: 0,
        address_line1:  signUpForm.value.address1,
        address_line2: signUpForm.value.address2,
        district: signUpForm.value.district,
        gender: signUpForm.value.gender,
        date_of_birth: signUpForm.value.birthday,  // check
        reg_date: new Date().toISOString(),
        tasks: [],
        isavailable: false,
        location: null,
        firm: { owner: false, firm_name: '' , firm_id : null},
      };
      this.authService.addFirmMember(sp, signUpForm.value.password);
      signUpForm.resetForm();
    }
  }

  removeFirmMember(id: string) {
    this.authService.removeFirmMember(id);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
   // get selected booking details
   showSelectedMember(orderId: string) {
    for (const order of this.firmMembers) {
      if (order.user_id === orderId) {
        this.selectedUser = order;
        this.showUser = true;
        return;
      }
    }
  }

}

import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Admin } from '../../auth/auth.model';
import { ErrorComponent } from 'src/app/error/error.component';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit, OnDestroy {

  
   // subscription
   private custSub: Subscription;
 
   // edit profile mode
   editmode = false;
 

   admin: Admin;
   
   // image to upload
   image: File;
   imageUrl: any = './assets/images/noimg.png';


  constructor(private authService: AuthService,  private router: Router, public dialog: MatDialog,
    public datepipe: DatePipe) { }

  ngOnInit() {
    this.authService.getAdmin();
    this.custSub = this.authService.getAdminUpdatedListener().subscribe (
      (admin: Admin) => {
          this.admin = admin;
      });
  }

  ngOnDestroy() {
    if (this.custSub) {
      this.custSub.unsubscribe();
    }
    this.imageUrl = './assets/images/noimg.png';
    this.image = null;
  }

  changePassword(recievedForm: NgForm) {
    if (recievedForm.invalid) {
      console.log('Form invalid');
    }
    if ( recievedForm.value.new_password1 !== recievedForm.value.new_password2) {
      this.dialog.open(ErrorComponent, {data: {message: 'Passwords not matching! Try again!'}});
    }
   // this.serviceProviderService.changeUserPassword(currentPword, newPword);
  }

  // edit user
  editUser(editForm: NgForm) {
    if (editForm.invalid) {
      console.log('Form Invalid');
    } else {
      const admin: Admin = {
        user_id: this.admin.user_id,
        user_type: this.admin.user_type,
        first_name: editForm.value.first_name,
        last_name: editForm.value.last_name,
        profile_pic: this.admin.profile_pic,
        email: editForm.value.email,
        contact_no: editForm.value.contact_no,
        address_line1: editForm.value.address_line1,
        address_line2: editForm.value.address_line2,
        gender: editForm.value.gender,
        reg_date: this.admin.reg_date,
        };
      this.authService.updateAdmin(admin, this.image);
      this.custSub = this.authService.getAdminUpdatedListener()
      .subscribe((recievedCust: Admin) => {
        this.admin = recievedCust;
      });
      editForm.resetForm();
      this.editmode = false;
    }
  }

    // profile pic uploading
    onImageUploaded(event: Event) {
      const file = (event.target as HTMLInputElement).files[0];
      const mimeType = file.type;
      if (mimeType.match(/image\/*/) == null) {
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.image = file;
        this.imageUrl = reader.result;
      };
    }


}

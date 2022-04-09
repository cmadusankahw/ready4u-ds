import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { DatePipe } from '@angular/common';

import { FirmOwner } from '../../auth/auth.model';
import { ErrorComponent } from 'src/app/error/error.component';

@Component({
  selector: 'app-firmowner-profile',
  templateUrl: './firmowner-profile.component.html',
  styleUrls: ['./firmowner-profile.component.scss']
})
export class FirmownerProfileComponent implements OnInit {

  
   // subscription
   private custSub: Subscription;
 
   // edit profile mode
   editmode = false;
 

   firmOwner: FirmOwner;
   
   // image to upload
   image: File;
   imageUrl: any = './assets/images/noimg.png';

   
  // Districts
  public districts = ['Colombo', 'Kaluthara', 'Galle', 'Matara', 'Matale', 'Kandy', 'Gampaha' , 'Hambanthota', 'Negamobo', 'Chiillaw', 'Badulla' , 'Nuwara Eliya'];

 

  constructor(private authService: AuthService,
              public dialog: MatDialog,
              public datepipe: DatePipe,
              private router: Router) { }

  ngOnInit() {
    this.authService.getFirmOwner();
    this.custSub = this.authService.getFirmOwnerUpdatedListener().subscribe (
      (fOwner: FirmOwner) => {
          this.firmOwner = fOwner;
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
      const cust: FirmOwner = {
        user_id: this.firmOwner.user_id,
        user_type: this.firmOwner.user_type,
        first_name: editForm.value.first_name,
        last_name: editForm.value.last_name,
        profile_pic: this.firmOwner.profile_pic,
        nic: this.firmOwner.nic,
        district: editForm.value.district,
        email: editForm.value.email,
        contact_no: editForm.value.contact_no,
        address_line1: editForm.value.address_line1,
        address_line2: editForm.value.address_line2,
        gender: editForm.value.gender,
        reg_date: this.firmOwner.reg_date,
        location: null,
        firm: this.firmOwner.firm,
        date_of_birth: this.firmOwner.date_of_birth
        };
      this.authService.updateFirmOwner(cust, this.image);
      this.custSub = this.authService.getFirmOwnerUpdatedListener()
      .subscribe((recievedCust: FirmOwner) => {
        this.firmOwner = recievedCust;
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

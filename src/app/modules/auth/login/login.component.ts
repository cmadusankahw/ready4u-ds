import { Component, OnInit, ViewChild, ElementRef, NgZone, Input, EventEmitter, Output  } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { MatDialog } from '@angular/material';

import { User, LogIn, Location } from '../auth.model';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  // recieving user list to check
  recievedUser: User;

  // get location on login
  recievedLocation: Location  = {
    latitude: 0,
    longtitude: 0,
    town: 'Colombo'
  };

  // agm label color
  color = '#223456';

  // initial map zoom
  zoom: number;

  // initial map address
  address: string;

  private geoCoder;

  constructor(private http: HttpClient,
              public authService: AuthService,
              public dialog: MatDialog,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,) { }

  ngOnInit() {
    // login form validation
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });

    // load location handeler
    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
    });

  }

  // get form elements
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }


 // set current location
 private setCurrentLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.recievedLocation.latitude = position.coords.latitude;
      this.recievedLocation.longtitude = position.coords.longitude;
      this.zoom = 8;
      this.geoCoder = new google.maps.Geocoder;
      this.getAddress(position.coords.latitude, position.coords.longitude);
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


  signInUser(loginform) {
    if (this.loginForm.invalid) {
      console.log('form invalid');
     // this.dialog.open(ErrorComponent, {data: {message: 'Incorrect Username or Password'}});
    } else {
      const login: LogIn = {
        email: loginform.value.email,
        password: loginform.value.password
      };
      this.authService.signIn(login, this.recievedLocation);
    }
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import * as io from 'socket.io-client';

import { SuccessComponent } from 'src/app/success/success.component';
import { Admin, Email, FirmOwnerDetails, Location, SproviderDetails, UserLocation } from './auth.model';

import {
  Customer,
  FirmOwner,
  LogIn,
  ServiceProvider,
  ServiceProviderTemp, 
  User,
} from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private serviceproviderUpdated = new Subject<ServiceProvider>();
  private serviceprovidersUpdated = new Subject<ServiceProvider[]>();
  private customerUpdated = new Subject<Customer>();
  private firmOwnerUpdated = new Subject<FirmOwner>();
  private userUpdated = new Subject<User[]>();
  private lastIdUpdated = new Subject<string>();
  private firmMembersUpdated = new Subject<ServiceProvider[]>();
  private firmIdUpdated = new Subject<string>();
  private adminUpdated = new Subject<Admin>();
  private adminSproviderUpdated = new Subject<SproviderDetails[]>();
  private adminSFownersUpdated = new Subject<FirmOwnerDetails[]>();

  private serviceprovider: ServiceProvider;
  private customer: Customer;

  private users: User[] = [];

  private serviceproviders: ServiceProvider[] = [];

  private firmMembers: ServiceProvider[] = [];

  private firmOwner: FirmOwner;

  private adminSproviders: SproviderDetails[] = [];

  private adminFowners: FirmOwnerDetails[] = [];

  private admin: Admin;

  // for service provider data passing
  private serviceproviderTemp: ServiceProviderTemp;

  // user type between signup pages
  private userType = false;

  public url = 'http://20.62.136.121:80/api/';

  // last signed user id
  private lastId: string;

  // storing token for auth validation
  private token: string;

  // timer to auto logout
  private tokenTimer: any;

  // firm Id
  public firmId: string;

  // login details listener
  private authStatusListener = new Subject<boolean>();
  private headerDetailsListener = new Subject<{user_type: string, email: string}>();

  // recieved cutomer location ( change on  map component)
  public customerLocation: UserLocation[];

  public sproviderLocation: UserLocation[];

  public spLocation: Location;

  public custLocation: Location;

  // user login status
  private isAuthenticated = false;

  private headerDetails: {user_type: string, email: string};

   // socket connection
   private socket = io('http://localhost:3000');

   private chatUser = '';

   // keep userId
   private loggedUserId: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  // get methods

  // get locations

  public getUserName() : string {
    let uname = 'Custoner';
    if( this.customer){
      uname = this.customer.first_name + ' ' +this.customer.last_name;
    } 
    return uname;
  }

  public getCustomerLocation(custId: string): UserLocation {
    let custLoc = null;
    for ( const loc of this.customerLocation) {
      if ( loc.user_id === custId) {
        custLoc = loc;
      }
    }
    return custLoc;
  }

  public getServiceProviderLocation(spId: string): UserLocation {
    let spLoc = null;
    for ( const loc of this.sproviderLocation) {
      if ( loc.user_id === spId) {
        spLoc = loc;
      }
    }
    return spLoc;
  }

  public setCustomerLocation(loc: UserLocation) {
    this.customerLocation.push(loc);
  }

  public setServiceProviderLocation(loc: UserLocation) {
    this.sproviderLocation.push(loc);
  }

  // get locations for comparisons only
  public getCustLocation() {
    return this.custLocation;
  }

  public getSPLocation() {
    return this.spLocation;
  }

  public setCustLocation(loc: Location) {
    if(!this.custLocation) {
      this.custLocation = loc;
    }
  }

  public setSPLocation(loc: Location) {
    if(!this.spLocation) {
      this.spLocation = loc;
    }
  }

  public getFirmId() {
    this.http
    .get<{ message: string; firmId: string }>(this.url + 'auth/get/firmId')
    .subscribe((recievedUsers) => {
      this.firmId = recievedUsers.firmId;
      this.firmIdUpdated.next(this.firmId);
    });
  }

  // return userId
  public getUserId() {
    return this.loggedUserId;
  }

  // return service provider Temp array between comps
  public getServiceproviderTemp() {
    if (this.serviceproviderTemp) {
      return this.serviceproviderTemp;
    }
  }

  // get list of sp
  public getAdminServiceproviders() {
    this.http
      .get<{ message: string; serviceproviders: SproviderDetails[] }>(
        this.url + 'auth/get/adminsp',
      )
      .subscribe(
        (res) => {
          this.adminSproviders = res.serviceproviders;
          this.adminSproviderUpdated.next([...this.adminSproviders]);
        },
      );
  }

   // get list of sp
   public getAdminFirmOwners() {
    this.http
      .get<{ message: string; firmOwners: FirmOwnerDetails[] }>(
        this.url + 'auth/get/adminfo',
      )
      .subscribe(
        (res) => {
          this.adminFowners = res.firmOwners;
          this.adminSFownersUpdated.next([...this.adminFowners]);
        },
      );
  }

  // get users list to login
  public getUser() {
    this.http
      .get<{ message: string; users: User[] }>(this.url + 'auth/users')
      .subscribe((recievedUsers) => {
        this.users = recievedUsers.users;
        this.userUpdated.next([...this.users]);
      });
  }

  // get serviceprovider after login
  public getServiceprovider() {
    this.http
      .get<{ message: string; serviceprovider: ServiceProvider }>(
        this.url + 'auth/get/sprovider',
      )
      .subscribe(
        (recievedServiceprovider) => {
          this.serviceprovider = recievedServiceprovider.serviceprovider;
          this.serviceproviderUpdated.next(this.serviceprovider);
        },
      );
  }

  // get admin after login
  public getAdmin() {
    this.http
      .get<{ message: string; admin: Admin }>(
        this.url + 'auth/get/admin',
      )
      .subscribe(
        (recieved) => {
          this.admin = recieved.admin;
          this.adminUpdated.next(this.admin);
        },
      );
  }

    // get serviceprovider after login
    public getFirmOwner() {
      this.http
        .get<{ message: string; firmOwner: FirmOwner }>(
          this.url + 'auth/get/firmOwner',
        )
        .subscribe(
          (res) => {
            this.firmOwner = res.firmOwner;
            this.firmOwnerUpdated.next(this.firmOwner);
          },
        );
    }

   // get serviceprovider after login
   public getServiceproviderById(spId: string) {
    this.http
      .get<{ message: string; serviceprovider: ServiceProvider }>(
        this.url + 'auth/get/sprovider/' + spId,
      )
      .subscribe(
        (recievedServiceprovider) => {
          this.serviceprovider = recievedServiceprovider.serviceprovider;
          this.serviceproviderUpdated.next(this.serviceprovider);
        },
      );
  }

  // get custmer after login
  public getCustomer() {
    this.http
      .get<{ message: string; customer: Customer }>(
        this.url + 'auth/get/customer',
      )
      .subscribe(
        (recievedCustomer) => {
          this.customer = recievedCustomer.customer;
          this.customerUpdated.next(this.customer);
        },
        (error) => {
          this.router.navigate(['/']);
          console.log(error);
        },
      );
  }

  // get details for header
  public getHeaderDetails() {
    this.autoAuthUser();
    if (this.token) {
      this.http
        .get<{ user_type: string; email: string, user_id: string}>(
          this.url + 'auth/get/head',
        )
        .subscribe((recievedHeader) => {
          this.headerDetails = {
            user_type: recievedHeader.user_type,
            email: recievedHeader.email,
          };
          this.loggedUserId = recievedHeader.user_id;
          this.headerDetailsListener.next(this.headerDetails);
        });
    }
  }

  // get user type in signup-option
  public getUserType() {
    return this.userType;
  }

  // get last product id
  public getLastUserId() {
    if (this.users.length) {
      this.lastId = this.users[this.users.length - 1].user_id;
      this.lastIdUpdated.next(this.lastId);
    } else {
      this.http
        .get<{ lastid: string }>(this.url + 'auth/last')
        .subscribe((recievedId) => {
          console.log(recievedId.lastid);
          this.lastId = recievedId.lastid;
          this.lastIdUpdated.next(this.lastId);
        });
    }
  }

  // get token to be used by other services
  public getToken() {
    return this.token;
  }

  // get authentication status
  public getisAuth() {
    return this.isAuthenticated;
  }

  // listners for subjects

  public getServiceprovidertUpdateListener() {
    return this.serviceproviderUpdated.asObservable();
  }

  public getFirmOwnerUpdatedListener() {
    return this.firmOwnerUpdated.asObservable();
  }

  public getServiceproviderstUpdateListener() {
    return this.serviceprovidersUpdated.asObservable();
  }

  public getCustomerUpdateListener() {
    return this.customerUpdated.asObservable();
  }

  public getUserUpdateListener() {
    return this.userUpdated.asObservable();
  }

  public getLastIdUpdateListener() {
    return this.lastIdUpdated.asObservable();
  }

  public getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  public getHeaderDetailsListener() {
    return this.headerDetailsListener.asObservable();
  }

  public getFirmMemberUpdatedListener() {
    return this.firmMembersUpdated.asObservable();
  }

  public getFirmIdUpdatedListener() {
    return this.firmIdUpdated.asObservable();
  }

  public getAdminUpdatedListener() {
    return this.adminUpdated.asObservable();
  }

  public getAdminSproviderDetailsUpdatedListener() {
    return this.adminSproviderUpdated.asObservable();
  }
  public getadminFOwnerdetailsUpdatedListener() {
    return this.adminSFownersUpdated.asObservable();
  }



  // add service provider
  public addServiceprovider(serviceprovider: ServiceProvider, password: string) {
    const user: User = {
      user_id: serviceprovider.user_id,
      user_type: serviceprovider.user_type,
      email: serviceprovider.email,
      password,
      state: false,
    };
    this.http
      .post<{ message: string; result: User }>(
        this.url + 'auth/signup/user',
        user,
      )
      .subscribe(
        (recievedData) => {
          console.log(recievedData.message);
          console.log(recievedData.result);
          this.users.push(user);
          this.userUpdated.next([...this.users]);
          this.http
            .post<{ message: string }>(
              this.url + 'auth/signup/sprovider',
              serviceprovider,
            )
            .subscribe(
              (recievedMessage) => {
                console.log(recievedMessage.message);
                this.getLastUserId();
                this.dialog.open(SuccessComponent, {
                  data: { message: 'Signed up as a Service Provider successfully' },
                });
                this.router.navigate(['/']);
              },
              (error) => {
                console.log(error);
              },
            );
        },
        (error) => {
          console.log(error);
        },
      );
  }

  // add service firm member
  public addFirmMember(serviceprovider: ServiceProvider, password: string) {
    const user: User = {
      user_id: serviceprovider.user_id,
      user_type: serviceprovider.user_type,
      email: serviceprovider.email,
      password,
      state: false,
    };
    this.http
      .post<{ message: string; result: User }>(
        this.url + 'auth/signup/user',
        user,
      )
      .subscribe(
        (recievedData) => {
          console.log(recievedData.message);
          console.log(recievedData.result);
          this.users.push(user);
          this.userUpdated.next([...this.users]);
          this.http
            .post<{ message: string }>(
              this.url + 'auth/signup/firmMember',
              serviceprovider,
            )
            .subscribe(
              (recievedMessage) => {
                console.log(recievedMessage.message);
                this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                this.router.onSameUrlNavigation = 'reload';
                this.router.navigate(['/firm/serviceproviders']);
                this.dialog.open(SuccessComponent, {
                  data: { message: 'Firm Member added successfully!' },
                });
              },
              (error) => {
                console.log(error);
              },
            );
        },
        (error) => {
          console.log(error);
        },
      );
  }

  // remove a firm member
  public removeFirmMember(firmMemberId: string) {
    this.http
    .post<{ message: string; result: User }>(
      this.url + 'auth/remove/firmMember',
      {firmMemberId},
    )
    .subscribe(
      (recievedData) => {
        console.log(recievedData.message);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/firm/serviceproviders']);
        this.dialog.open(SuccessComponent, {
                data: { message: 'User has been removed!' },
              });
      });
    }

  // remove a firm member
  public removeServiceProvider(firmMemberId: string) {
    this.http
    .post<{ message: string; result: User }>(
      this.url + 'auth/remove/firmMember',
      {firmMemberId},
    )
    .subscribe(
      (recievedData) => {
        console.log(recievedData.message);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/admin/users']);
        this.dialog.open(SuccessComponent, {
                data: { message: 'User has been removed!' },
              });
      });
    }

    // give rating to service provider
  public rateServiceProvider(rating: number, spId: string) {
    this.http
    .post<{ message: string; result: User }>(
      this.url + 'auth/rate/serviceprovider',
      {rating, spId},
    )
    .subscribe(
      (recievedData) => {
        console.log(recievedData.message);
        this.dialog.open(SuccessComponent, {
                data: { message: 'Rating added successfully! Thank you for your support!' },
              });
        this.router.navigate(['/cust/']);
      });
    }

    // add firmowner
    public addFirmOwner(firmOwner: FirmOwner, password: string) {
      const user: User = {
        user_id: firmOwner.user_id,
        user_type: firmOwner.user_type,
        email: firmOwner.email,
        password,
        state: false,
      };
      this.http
        .post<{ message: string; result: User }>(
          this.url + 'auth/signup/user',
          user,
        )
        .subscribe(
          (recievedData) => {
            console.log(recievedData.message);
            console.log(recievedData.result);
            this.users.push(user);
            this.userUpdated.next([...this.users]);
            this.http
              .post<{ message: string }>(
                this.url + 'auth/signup/firmOwner',
                firmOwner,
              )
              .subscribe(
                (recievedMessage) => {
                  console.log(recievedMessage.message);
                  this.getLastUserId();
                  this.dialog.open(SuccessComponent, {
                    data: { message: 'Signed up as a Firm Owner successfully' },
                  });
                  this.router.navigate(['/']);
                },
                (error) => {
                  console.log(error);
                },
              );
          },
          (error) => {
            console.log(error);
          },
        );
    }

  // add customer
  public addCustomer(customer: Customer, password: string) {
    const user: User = {
      user_id: customer.user_id,
      user_type: 'customer',
      email: customer.email,
      password,
      state: false,
    };
    this.http
      .post<{ message: string; result: User }>(
        this.url + 'auth/signup/user',
        user,
      )
      .subscribe(
        (recievedData) => {
          console.log(recievedData.message);
          console.log(recievedData.result);
          this.users.push(user);
          this.userUpdated.next([...this.users]);
          this.http
            .post<{ message: string }>(
              this.url + 'auth/signup/customer',
              customer,
            )
            .subscribe(
              (recievedMessage) => {
                console.log(recievedMessage.message);
                this.getLastUserId();
                this.dialog.open(SuccessComponent, {
                  data: { message: 'Signed up successfully!' },
                });
                this.router.navigate(['/']);
              },
              (error) => {
                console.log(error);
              },
            );
        },
        (error) => {
          console.log(error);
        },
      );
  }

  // update service provider
  public updateServiceprovider(serviceprovider: ServiceProvider, image: File) {
    if (image) {
      const newServiceprovider = new FormData();
      newServiceprovider.append('images[]', image, image.name);
      console.log(newServiceprovider);

      this.http
        .post<{ profilePic: string }>(
          this.url + 'auth/profile/img',
          newServiceprovider,
        )
        .subscribe((recievedImage) => {
          console.log(recievedImage);
          serviceprovider.profile_pic = recievedImage.profilePic;
          this.http
            .post<{ message: string }>(
              this.url + 'auth/sprovider/edit',
              serviceprovider,
            )
            .subscribe(
              (recievedData) => {
                console.log(recievedData.message);
                this.serviceprovider = serviceprovider;
                this.serviceproviderUpdated.next(this.serviceprovider);
                this.dialog.open(SuccessComponent, {
                  data: {
                    message: 'Profile Details Updated Successfully!',
                  },
                });
              },
              (error) => {
                console.log(error);
              },
            );
        });
    } else {
      this.http
        .post<{ message: string }>(
          this.url + 'auth/sprovider/edit',
          serviceprovider,
        )
        .subscribe(
          (recievedData) => {
            console.log(recievedData.message);
            this.serviceprovider = serviceprovider;
            this.serviceproviderUpdated.next(this.serviceprovider);
            this.dialog.open(SuccessComponent, {
              data: { message: 'Profile Details Updated Successfully!' },
            });
          },
          (error) => {
            console.log(error);
          },
        );
    }
  }

  // update service provider
  public updateFirmOwner(fOwner: FirmOwner, image: File) {
    if (image) {
      const newSP = new FormData();
      newSP.append('images[]', image, image.name);
      console.log(newSP);

      this.http
        .post<{ profilePic: string }>(
          this.url + 'auth/profile/img',
          newSP,
        )
        .subscribe((recievedImage) => {
          console.log(recievedImage);
          fOwner.profile_pic = recievedImage.profilePic;
          this.http
            .post<{ message: string }>(
              this.url + 'auth/firmOwner/edit',
              fOwner,
            )
            .subscribe(
              (recievedData) => {
                console.log(recievedData.message);
                this.firmOwner = fOwner;
                this.firmOwnerUpdated.next(this.firmOwner);
                this.dialog.open(SuccessComponent, {
                  data: {
                    message: 'Profile Details Updated Successfully!',
                  },
                });
              },
              (error) => {
                console.log(error);
              },
            );
        });
    } else {
      this.http
        .post<{ message: string }>(
          this.url + 'auth/firmOwner/edit',
          fOwner,
        )
        .subscribe(
          (recievedData) => {
            console.log(recievedData.message);
            this.firmOwner = fOwner;
            this.firmOwnerUpdated.next(this.firmOwner);
            this.dialog.open(SuccessComponent, {
              data: { message: 'Profile Details Updated Successfully!' },
            });
          },
          (error) => {
            console.log(error);
          },
        );
    }
  }

  // update customer
  public updateCustomer(customer: Customer, image: File) {
    if (image) {
      const newCustomer = new FormData();
      newCustomer.append('images[]', image, image.name);
      console.log(newCustomer);

      this.http
        .post<{ profilePic: string }>(
          this.url + 'auth/profile/img',
          newCustomer,
        )
        .subscribe((recievedImage) => {
          console.log(recievedImage);
          customer.profile_pic = recievedImage.profilePic;
          this.http
            .post<{ message: string }>(this.url + 'auth/customer/edit', customer)
            .subscribe(
              (recievedData) => {
                console.log(recievedData.message);
                this.customer = customer;
                this.customerUpdated.next(this.customer);
                this.dialog.open(SuccessComponent, {
                  data: {
                    message: 'Profile Details Updated Successfully!',
                  },
                });
              },
              (error) => {
                console.log(error);
              },
            );
        });
    } else {
      this.http
        .post<{ message: string }>(this.url + 'auth/customer/edit', customer)
        .subscribe(
          (recievedData) => {
            console.log(recievedData.message);
            this.customer = customer;
            this.customerUpdated.next(this.customer);
            this.dialog.open(SuccessComponent, {
              data: { message: 'Profile Details Updated Successfully!' },
            });
          },
          (error) => {
            console.log(error);
          },
        );
    }
  }

  // update admin
  public updateAdmin(admin: Admin, image: File) {
    if (image) {
      const newCustomer = new FormData();
      newCustomer.append('images[]', image, image.name);
      console.log(newCustomer);

      this.http
        .post<{ profilePic: string }>(
          this.url + 'auth/profile/img',
          newCustomer,
        )
        .subscribe((recievedImage) => {
          console.log(recievedImage);
          admin.profile_pic = recievedImage.profilePic;
          this.http
            .post<{ message: string }>(this.url + 'auth/admin/edit', admin)
            .subscribe(
              (recievedData) => {
                console.log(recievedData.message);
                this.admin = admin;
                this.adminUpdated.next(this.admin);
                this.dialog.open(SuccessComponent, {
                  data: {
                    message: 'Profile Details Updated Successfully!',
                  },
                });
              },
              (error) => {
                console.log(error);
              },
            );
        });
    } else {
      this.http
        .post<{ message: string }>(this.url + 'auth/admin/edit', admin)
        .subscribe(
          (recievedData) => {
            console.log(recievedData.message);
            this.admin = admin;
            this.adminUpdated.next(this.admin);
            this.dialog.open(SuccessComponent, {
              data: { message: 'Profile Details Updated Successfully!' },
            });
          },
          (error) => {
            console.log(error);
          },
        );
    }
  }

  // add a new Service provider Temp
  public addServiceproviderTemp(serviceproviderTemp: ServiceProviderTemp) {
    this.serviceproviderTemp = serviceproviderTemp;
  }

  // set user type
  public setUserType(userType: boolean) {
    this.userType = userType;
    console.log(this.userType);
  }

  // log in user
  public signIn(login: LogIn, location: Location) {
    this.http
      .post<{
        message: string;
        token: any;
        expiersIn: number;
        user_type: string;
      }>(this.url + 'auth/signin', login)
      .subscribe(
        (recievedData) => {
          console.log(recievedData.message);

          this.setAuthTimer(recievedData.expiersIn);

          this.token = recievedData.token;
          console.log(this.token);
          this.getHeaderDetails();

          if (recievedData.token) {
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + recievedData.expiersIn * 1000,
            );
            this.saveAuthData(recievedData.token, expirationDate);

            if (recievedData.user_type === 'serviceProvider') {
              this.changeSPState(location);
              this.spLocation = location; // for location queries
              this.router.navigate(['/sp']);
            }

            if (recievedData.user_type === 'customer') {
              this.custLocation = location; // Ffor location based queries
              this.router.navigate(['/cust']);
            }

            if (recievedData.user_type === 'firmOwner') {
              this.router.navigate(['/firm/orders']);
            }

            if (recievedData.user_type === 'admin') {
              this.router.navigate(['/admin']);
            }
          }
        },
        (error) => {
          console.log(error);
        },
      );
  }

  // change service provider availability
  public changeSPState(location: Location) {
    this.http
    .post<{ message: string; serviceprovider: ServiceProvider }>(
      this.url + 'auth/sprovider/state', {location},
    )
    .subscribe(
      (res: { message: string}) => {
        console.log(res.message);
      });
  }

  // get list of sp
  public getServiceproviders(category: string, town: string) {
    this.http
      .post<{ message: string; serviceproviders: ServiceProvider[] }>(
        this.url + 'auth/get/sproviders', {category, town},
      )
      .subscribe(
        (recievedServiceprovider) => {
          this.serviceproviders = recievedServiceprovider.serviceproviders;
          this.serviceprovidersUpdated.next([...this.serviceproviders]);
        },
      );
  }

  // get list of firm members
  public getFirmMembers() {
    this.http
      .get<{ message: string; serviceproviders: ServiceProvider[] }>(
        this.url + 'auth/get/firmMembers',
      )
      .subscribe(
        (recievedServiceprovider) => {
          this.firmMembers = recievedServiceprovider.serviceproviders;
          this.firmMembersUpdated.next([...this.firmMembers]);
        },
      );
  }

  // auto auth user after restart
  public autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiersIn = authInformation.expiarationDate.getTime() - now.getTime();
    if (expiersIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiersIn / 1000); // node timers works in secords (not ms)
      this.authStatusListener.next(true);
    }
  }

  // log out user
  public signOut() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.changeSPAcceptedState(false);
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/']);
  }

  // starts the session timer
  private setAuthTimer(duration: number) {
    console.log('Setting timer to : ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.signOut();
      alert('Session Time Out! You have been logged out! Please log in back..');
      this.router.navigate(['/']);
    }, duration * 1000);
  }

  // store token and user data in local storage
  private saveAuthData(token: string, expiarationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiarationDate.toISOString());
  }

  // clear locally sotred auth data in timeout or sign out
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  // access locally stored auth data
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    if (!token || !expiration) {
      return;
    }
    return {
      token,
      expiarationDate: new Date(expiration),
    };
  }


  // change service provider availability
  public changeSPAcceptedState(state: boolean) {
    this.http
    .post<{ message: string; serviceprovider: ServiceProvider }>(
      this.url + 'auth/sprovider/newstate', {state}
    )
    .subscribe(
      (res: { message: string}) => {
        console.log(res.message);
      });
  }

  // send emails
  sendEmail(mail: Email) {
    this.http.post<{ message: string }>(this.url + 'auth/mail', mail)
    .subscribe((recievedData) => {
      console.log(recievedData.message);
  });
  }

////////////////////////////// socket connectons ///////////////////////////////////////

    // socket based chat
    public setChatUser(type: string) {
      this.chatUser = type;

      }

      public getChatUser() {
        return this.chatUser;
      }

      public joinRoom(data) {
          this.socket.emit('join', data);
      }

      public newUserJoined() {
          const observable = new Observable<{user: String, message: String}>( (observer) => {
              this.socket.on('new user joined', (data) => {
                  observer.next(data);
              });
              return () => {this.socket.disconnect(); };
          });

          return observable;
      }

      public leaveRoom(data) {
          this.socket.emit('leave', data);
      }

      public userLeftRoom() {
          const observable = new Observable<{user: String, message: String}>( (observer) => {
              this.socket.on('left room', (data) => {
                  observer.next(data);
              });
              return () => {this.socket.disconnect(); };
          });

          return observable;
      }

      public sendMessage(data) {
          this.socket.emit('message', data);
      }

      public newMessageReceived() {
          const observable = new Observable<{user: String, message: String}>((observer) => {
              this.socket.on('new message', (data) => {
                  observer.next(data);
              });
              return () => {this.socket.disconnect(); };
          });

          return observable;
      }

      public sendOrderAccepted(data) {
        this.socket.emit('order-accepted', data);
    }

      public sendOrderCancelled(data) {
          this.socket.emit('order-cancelled', data);
      }

      public sendCustomerLocation(data) {
        this.socket.emit('cust-location', data);
    }

        public sendOrderPlaced(data) {
          this.socket.emit('order-placed', data);
      }

      public sendArrived(data) {
        this.socket.emit('destination-arrived', data);
    }

      public sendCompleted(data) {
        this.socket.emit('task-completed', data);
    }

      public sendStarted(data) {
        this.socket.emit('task-started', data);
    }

    public sendAmountCharged(data) {
      this.socket.emit('amount-charged', data);
  }
      // order and location handeling
      public orderAccepted() {
        const observable = new Observable<{latitude: number, longitude: number}>((observer) => {
          this.socket.on('order accepted', (data) => {
              observer.next(data);
          });
          return () => {this.socket.disconnect(); };
      });
        return observable;
      }

        // order and location handeling
        public orderCancelled() {
          const observable = new Observable<{cancelled: boolean}>((observer) => {
            this.socket.on('order cancelled', (data) => {
                observer.next(data);
            });
            return () => {this.socket.disconnect(); };
        });
          return observable;
        }

          // order and location handeling
          public orderPlaced() {
            const observable = new Observable<{placed: boolean}>((observer) => {
              this.socket.on('order placed', (data) => {
                  observer.next(data);
              });
              return () => {this.socket.disconnect(); };
          });
            return observable;
          }

            //  mark arrived
            public hasArrived() {
              const observable = new Observable<{arrived: boolean}>((observer) => {
                this.socket.on('destination arrived', (data) => {
                    observer.next(data);
                });
                
                return () => {this.socket.disconnect(); };
            });
              return observable;
            }


            //  mark arrived
            public taskCompleted() {
              const observable = new Observable<{completed: boolean, amount: number}>((observer) => {
                this.socket.on('task completed', (data) => {
                    observer.next(data);
                });
                return () => {this.socket.disconnect(); };
            });
              return observable;
            }
  
               //  mark arrived
               public taskStarted() {
                const observable = new Observable<{started: boolean }>((observer) => {
                  this.socket.on('task started', (data) => {
                      observer.next(data);
                  });
                  return () => {this.socket.disconnect(); };
              });
                return observable;
              }
          
            //  mark arrived
            public amountCharged() {
              const observable = new Observable<{charged: boolean }>((observer) => {
                this.socket.on('amount charged', (data) => {
                    observer.next(data);
                });
                return () => {this.socket.disconnect(); };
            });
              return observable;
            }

        // customer location emit
        public customerLocationRecieved() {
          const observable = new Observable<{latitude: number, longitude: number}>((observer) => {
            this.socket.on('cust location', (data) => {
                observer.next(data);
            });
            return () => {this.socket.disconnect(); };
        });
          return observable;
        }

}

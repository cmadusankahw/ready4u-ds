import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SuccessComponent } from 'src/app/success/success.component';

import {
  Customer,
  FirmOwner,
  LogIn,
  ServiceProvider,
  ServiceProviderTemp, User
} from '../auth/auth.model';

@Injectable({ providedIn: 'root' })
export class ServiceProviderService {
  private serviceproviderUpdated = new Subject<ServiceProvider>();
  private serviceprovidersUpdated = new Subject<ServiceProvider[]>();
  private firmOwnerUpdated = new Subject<FirmOwner>();

  private serviceprovider: ServiceProvider;

  private serviceproviders: ServiceProvider[];

  private firmOwner: FirmOwner;

  public url = 'https://ds-ready4u-as.azurewebsites.net:80/api/';

  constructor(
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  // get methods

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

  // get list of sp
  public getServiceproviders(category: string) {
    this.http
      .post<{ message: string; serviceproviders: ServiceProvider[] }>(
        this.url + 'auth/get/sproviders', {category},
      )
      .subscribe(
        (recievedServiceprovider) => {
          this.serviceproviders = recievedServiceprovider.serviceproviders;
          this.serviceprovidersUpdated.next([...this.serviceproviders]);
        },
      );
  }


      // get list of sp
  public getServiceProviderOrders(category: string) {
    this.http
      .post<{ message: string; serviceproviders: ServiceProvider[] }>(
        this.url + 'auth/get/sproviders', {category},
      )
      .subscribe(
        (recievedServiceprovider) => {
          this.serviceproviders = recievedServiceprovider.serviceproviders;
          this.serviceprovidersUpdated.next([...this.serviceproviders]);
        },
      );
  }

  public getServiceprovidertUpdateListener() {
    return this.serviceproviderUpdated.asObservable();
  }

  public getFirmOwnerUpdatedListener() {
    return this.firmOwnerUpdated.asObservable();
  }

  public getServiceproviderstUpdateListener() {
    return this.serviceprovidersUpdated.asObservable();
  }


}

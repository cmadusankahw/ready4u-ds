
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SuccessComponent } from 'src/app/success/success.component';

import {
  FirmOwner,
  ServiceProvider,
} from '../auth/auth.model';
import { Order } from '../services/service.model';
import { Payment } from '../auth/auth.model';

@Injectable({ providedIn: 'root' })
export class FirmOwnerService {
  private serviceproviderUpdated = new Subject<ServiceProvider>();
  private serviceprovidersUpdated = new Subject<ServiceProvider[]>();
  private firmOwnerUpdated = new Subject<FirmOwner>();
  private firmOrdersUpdated = new Subject<Order[]>();
  private serviceProviderNamesUpdated = new Subject<string[]>();
  private serviceprovider: ServiceProvider;

  private serviceproviders: ServiceProvider[] = [];

  private firmOwner: FirmOwner;

  private firmOrders : Order[] = [];

  private spNames: string[] = [];

  public url = 'http://20.62.136.121:80/api/';

  constructor(
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  // get methods


  // get list of sp OF FIRM
  public getFirmServiceproviders(firmId: string) {
    this.http
      .get<{ message: string; serviceproviders: ServiceProvider[] }>(
        this.url + 'firm/get/sproviders/' + firmId,
      )
      .subscribe(
        (recievedServiceprovider) => {
          this.serviceproviders = recievedServiceprovider.serviceproviders;
          this.serviceprovidersUpdated.next([...this.serviceproviders]);
        },
      );
  }

  // get list of sp OF FIRM
  public getFirmServiceproviderNames() {
    this.http
      .get<{ message: string; spnames: {first_name: string, last_name: string}[] }>(
        this.url + 'firm/get/spnames')
      .subscribe(
        (res) => {
          if (!this.spNames.length) {
          for ( let p of res.spnames){
            this.spNames.push(p.first_name + ' ' + p.last_name);
          }}
          this.serviceProviderNamesUpdated.next([...this.spNames]);
        },
      );
  }

    // get list of sp
    public getFirmOrders() {
        this.http
          .get<{ message: string; orders: Order[] }>(
            this.url + 'firm/get/orders'
          )
          .subscribe(
            (res) => {
              if (!this.firmOrders.length) {
              this.firmOrders = res.orders;}
              this.firmOrdersUpdated.next([...this.firmOrders]);
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

  public getFirmOrdersUpdatedListener() {
    return this.firmOrdersUpdated.asObservable();
  }

  public getServiceProviderNamesUpdatedListener() {
    return this.serviceProviderNamesUpdated.asObservable();
  }

  // set methods

}

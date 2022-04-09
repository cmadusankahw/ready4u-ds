import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SuccessComponent } from 'src/app/success/success.component';
import { Admin, Payment } from '../auth/auth.model';

import {  UserData, OrderData , } from './admin.model';


@Injectable({ providedIn: 'root' })
export class AdminService {
  private firmOwnerUpdated = new Subject<Admin>();
  private userdataUpdated = new Subject<UserData>();
  private orderDataUpdated = new Subject<OrderData>();
  private paymentDataUpdated = new Subject<Payment[]>();
  private userPaymentDataUpdated = new Subject<Payment>();

  private admin: Admin;

  private userdata: UserData;

  private orderData: OrderData;

  private payments: Payment[] = [];

  // recieved user payment
  payment: Payment;

  public url = 'http://localhost:3000/api/';


  constructor(
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  // get methods
    
  // get users list to login
  public getUserData() {
    this.http
      .get<{ message: string; userData: UserData }>(this.url + 'admin/get/userdata')
      .subscribe((recievedUsers) => {
        this.userdata = recievedUsers.userData;
        this.userdataUpdated.next(this.userdata);
      });
  }

  
  // get users list to login
  public getOrderData() {
    this.http
      .get<{ message: string; orderData: OrderData }>(this.url + 'admin/get/orderdata')
      .subscribe((recievedUsers) => {
        this.orderData = recievedUsers.orderData;
        this.orderDataUpdated.next(this.orderData);
      });
  }

   // get overall payment details
   public getPayments() {
    this.http
      .get<{ message: string; payments: Payment[] }>(this.url + 'admin/get/payments')
      .subscribe((res) => {
        this.payments = res.payments;
        this.paymentDataUpdated.next([...this.payments]);
      });
  }

  
   // get user payment details
   public getUserPayments() {
    this.http
      .get<{ message: string; payment: Payment }>(this.url + 'admin/get/userpay')
      .subscribe((res) => {
        this.payment = res.payment;
        this.userPaymentDataUpdated.next(this.payment);
      });
  }

  // make a payment
  public createPayment(payment: number) {
    this.http
    .post<{ message: string; }>(
      this.url + 'admin/add/userpay', {payment},
    )
    .subscribe(
      (res) => {
        console.log(res.message);
        this.dialog.open(SuccessComponent, {
          data: { message: res.message },
        });
      },
    );
  }

  
  // listeners
  
  public getUserdataUpdatedListener() {
    return this.userdataUpdated.asObservable();
  }

  public getOrderDataUpdatedListener() {
    return this.orderDataUpdated.asObservable();
  }
  
  public paymentdataUpdatedListener() {
    return this.paymentDataUpdated.asObservable();
  }

  public userPaymentdataUpdatedListener() {
    return this.userPaymentDataUpdated.asObservable();
  }




}

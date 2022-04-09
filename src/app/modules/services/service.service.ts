import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SuccessComponent } from 'src/app/success/success.component';

import {
  ServiceCategory,
  Task,
  Order,
} from './service.model';

@Injectable({ providedIn: 'root' })
export class ServiceService {
  private serviceCategoriesUpdated = new Subject<ServiceCategory[]>();
  private serviceCategoryUpdated = new Subject<ServiceCategory>();
  private orderUpdated = new Subject<Order>();
  private resorderUpdated = new Subject<Order>();
  private ordersUpdated = new Subject<Order[]>();
  private customerOrdersUpdated = new Subject<Order[]>();

  private serviceCategories: ServiceCategory[] = [];
  private serviceCategory: ServiceCategory;

  private orders: Order[] = [];

  url = 'https://ds-ready4u-as.azurewebsites.net:80/api/';

  private order: Order;

  private resorder: Order;

  constructor(
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog
  ) {}


  getServiceCategories() {
    this.http
      .get<{ message: string; categories: ServiceCategory[] }>(this.url + 'service/cat')
      .subscribe((recievedData) => {
        this.serviceCategories = recievedData.categories;
        this.serviceCategoriesUpdated.next([...this.serviceCategories]);
      });
  }

  getServiceCategory(id: string) {
    this.http
      .get<{ message: string; categorie: ServiceCategory }>(this.url + 'service/cat' + id)
      .subscribe((recievedData) => {
        this.serviceCategory = recievedData.categorie;
        this.serviceCategoryUpdated.next(this.serviceCategory);
      });
  }

  getOrders() {
    this.http
      .get<{ message: string; orders: Order[] }>(
        this.url + 'service/orders/get'
      )
      .subscribe(
        (recievedData) => {
          this.orders = recievedData.orders;
          this.ordersUpdated.next([...this.orders]);
        });
  }

  getCustomerOrders() {
    this.http
      .get<{ message: string; orders: Order[] }>(
        this.url + 'service/orders/cust'
      )
      .subscribe(
        (recievedData) => {
          this.orders = recievedData.orders;
          this.customerOrdersUpdated.next([...this.orders]);
        });
  }


 
  getOrder(orderId: string) {
    this.http
      .get<{ message: string; order: Order }>(
        this.url + 'service/order/get/'+ orderId
      )
      .subscribe(
        (recievedData) => {
          this.resorder = recievedData.order;
          this.resorderUpdated.next(this.resorder);
        });
  }

  getCurrentOrder() {
    this.http
      .get<{ message: string; order: Order }>(
        this.url + 'service/order/current'
      )
      .subscribe(
        (recievedData) => {
          this.order = recievedData.order;
          this.orderUpdated.next(this.order);
        });
  }

  updateOrderstate(state: string) {
    this.http
      .post<{ message: string; }>(
        this.url + 'service/order/update', {state}
      )
      .subscribe(
        (recievedData) => {
          console.log(recievedData.message);
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/sp/']);
          this.dialog.open(SuccessComponent, {
            data: { message: 'Order has been Cancelled' },
          });
        });
  }

  // when a task is completed
  updateOrderCompleted(state: string, amount: number) {
    this.http
      .post<{ message: string; }>(
        this.url + 'service/order/complete', {state, amount}
      )
      .subscribe(
        (recievedData) => {
          console.log(recievedData.message);
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/sp/']);
          this.dialog.open(SuccessComponent, {
            data: { message: 'Payment Collected! Nice Work!' },
          });
        });
  }




  getServiceCategoriesUpdateListener() {
    return this.serviceCategoriesUpdated.asObservable();
  }

  getServiceCategoryUpdateListener() {
    return this.serviceCategoryUpdated.asObservable();
  }

  getOrderUpdateListener() {
    return this.orderUpdated.asObservable();
  }

  getResOrderUpdateListener() {
    return this.resorderUpdated.asObservable();
  }

  getOrdersUpdateListener() {
    return this.ordersUpdated.asObservable();
  }

  getCustomerOrdersUpdateListener() {
    return this.customerOrdersUpdated.asObservable();
  }

 
   // add new service
   createOrder(order: Order, images: File[]) {
    const serviceData = new FormData();
    for (const image of images) {
      if (image) {
        serviceData.append('images[]', image, image.name);
      }
    }
    console.log(serviceData);
    this.http.post<{imagePaths: string[]}>(this.url + 'service/order/img', serviceData )
      .subscribe ((recievedImages) => {
        console.log(recievedImages);
        if (recievedImages.imagePaths[0]) {
          order.image1 = recievedImages.imagePaths[0];
        }
        if (recievedImages.imagePaths[1]) {
          order.image2 = recievedImages.imagePaths[1];
        }
        if (recievedImages.imagePaths[2]) {
          order.image3 = recievedImages.imagePaths[2];
        }
        this.http.post<{ message: string, result: Order }>(this.url + 'service/order/add', order)
        .subscribe((recievedData) => {
          console.log(recievedData.message);
          this.order  = recievedData.result;
          this.orderUpdated.next(this.order);
          setTimeout( () => {
            this.router.navigate(['cust/map/' + recievedData.result.order_id]);
          }, 500);
      });
    });
  }

  // category handeling

  addServiceCategory(cat: ServiceCategory) {
    this.http
      .post<{ message: string;  }>(
        this.url + 'service/cat/create', cat
      )
      .subscribe(
        (recievedData) => {
          console.log(recievedData.message);
          this.dialog.open(SuccessComponent, {
            data: { message: 'Category added successfully!' },
          });
        });
  }

  removeServiceCategory(id: string) {
    this.http
      .get<{ message: string;  }>(
        this.url + 'service/cat/remove/' + id
      )
      .subscribe(
        (recievedData) => {
          console.log(recievedData.message);
          this.dialog.open(SuccessComponent, {
            data: { message: 'Category  was removed!' },
          });
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/admin/categories']);
        });
  }



}
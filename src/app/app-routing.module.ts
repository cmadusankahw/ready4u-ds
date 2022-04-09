import { FirmownerDashHomeComponent } from './modules/service-firm-owner/firmowner-dash-home/firmowner-dash-home.component';


import { FirmownerProfileComponent } from './modules/service-firm-owner/firmowner-profile/firmowner-profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/home/home.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { SignupOptionComponent } from './modules/auth/signup-option/signup-option.component';
import { SignupComponent } from './modules/auth/signup/signup.component';
import { SignupSProviderComponent } from './modules/auth/signup-s-provider/signup-s-provider.component';
import { ServiceSelectComponent } from './modules/services/service-select/service-select.component';
import { MapServiceProviderComponent } from './modules/service-provider/map-service-provider/map-service-provider.component';
import { MapCustomerComponent } from './modules/customer/map-customer/map-customer.component';
import { TaskTimeCountdownComponent } from './modules/customer/task-time-countdown/task-time-countdown.component';
import { ServiceproviderDashboardComponent } from './modules/service-provider/dashboard/serviceprovider-dashboard/serviceprovider-dashboard.component';
import { CustomerDashboardComponent } from './modules/customer/dashboard/customer-dashboard/customer-dashboard.component';
import { CustomerDordersComponent } from './modules/customer/dashboard/pages/customer-dorders/customer-dorders.component';
import { CustomerDprofileComponent } from './modules/customer/dashboard/pages/customer-dprofile/customer-dprofile.component';
import { NotfoundComponent } from './modules/home/notfound/notfound.component';
import { ServiceproviderDhomeComponent } from './modules/service-provider/dashboard/pages/serviceprovider-dhome/serviceprovider-dhome.component';
import { ServiceproviderDordersComponent } from './modules/service-provider/dashboard/pages/serviceprovider-dorders/serviceprovider-dorders.component';
import { ServiceproviderDprofileComponent } from './modules/service-provider/dashboard/pages/serviceprovider-dprofile/serviceprovider-dprofile.component';
import { ServiceproviderListComponent } from './modules/customer/serviceprovider-list/serviceprovider-list.component';
import { ServiceproviderTaskCountdownComponent } from './modules/service-provider/serviceprovider-task-countdown/serviceprovider-task-countdown.component';
import { FirmownerSproviderComponent } from './modules/service-firm-owner/firmowner-sprovider/firmowner-sprovider.component';
import { FirmownerPaymentsComponent } from './modules/service-firm-owner/firmowner-payments/firmowner-payments.component';
import { FirmownerDashboardComponent } from './modules/service-firm-owner/firmowner-dashboard/firmowner-dashboard.component';
import { AdminDashboardComponent } from './modules/admin/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './modules/admin/admin-home/admin-home.component';
import { AdminCategoriesComponent } from './modules/admin/admin-categories/admin-categories.component';
import { AdminProfileComponent } from './modules/admin/admin-profile/admin-profile.component';
import { AdminDashUsersComponent } from './modules/admin/admin-dash-users/admin-dash-users.component';
import { AdminDashPaymentsComponent } from './modules/admin/admin-dash-payments/admin-dash-payments.component';
import { BillRatingComponent } from './modules/customer/bill-rating/bill-rating.component';
import { DocsComponent } from './modules/home/docs/docs.component';
import { FirmOwnerReportComponent } from './modules/service-firm-owner/firm-owner-report/firm-owner-report.component';
import { ServiceProviderReportComponent } from './modules/service-provider/service-provider-report/service-provider-report.component';
import { AdminReportDashboardComponent } from './modules/admin/admin-report-dashboard/admin-report-dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupOptionComponent },
  { path: 'register/general', component: SignupComponent },
  { path: 'register/sprovider', component: SignupSProviderComponent },
  { path: 'service', component: ServiceSelectComponent },
  { path: 'docs', component: DocsComponent },
  { path: 'sp', component: ServiceproviderDashboardComponent, children: [
    { path: '', component: ServiceproviderDhomeComponent },
    { path: 'orders', component: ServiceproviderDordersComponent },
    { path: 'profile', component: ServiceproviderDprofileComponent },
    { path: 'payments', component: FirmownerPaymentsComponent },
    { path: 'reports', component: ServiceProviderReportComponent },
    { path: 'map', component: MapServiceProviderComponent },
    { path: 'task/time', component: ServiceproviderTaskCountdownComponent },
    { path: '**', component: NotfoundComponent },
  ] },
  { path: 'cust', component: CustomerDashboardComponent,  children: [
    { path: '', component: ServiceSelectComponent },
    { path: 'asp/:category_id', component: ServiceproviderListComponent },
    { path: 'orders', component: CustomerDordersComponent },
    { path: 'bill/:id', component: BillRatingComponent },
    { path: 'profile', component: CustomerDprofileComponent },
    { path: 'map/:id', component: MapCustomerComponent },
    { path: 'task/time/:id', component: TaskTimeCountdownComponent },
    { path: '**', component: NotfoundComponent },
  ] },
  { path: 'firm', component: FirmownerDashboardComponent,  children: [
    { path: 'orders', component: FirmownerDashHomeComponent },
    { path: 'profile', component: FirmownerProfileComponent },
    { path: 'serviceproviders', component: FirmownerSproviderComponent },
    { path: 'payments', component: FirmownerPaymentsComponent },
    { path: 'reports', component: FirmOwnerReportComponent },
    { path: '**', component: NotfoundComponent },
  ] },
  { path: 'admin', component: AdminDashboardComponent, children: [
    { path: '', component: AdminHomeComponent },
    { path: 'users', component: AdminDashUsersComponent },
    { path: 'payments', component: AdminDashPaymentsComponent },
    { path: 'categories', component: AdminCategoriesComponent },
    { path: 'profile', component: AdminProfileComponent },
    { path: 'reports', component: AdminReportDashboardComponent },
    { path: '**', component: NotfoundComponent },
  ] },
  { path: '', component: HomeComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

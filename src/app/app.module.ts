import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule, IconsModule } from 'angular-bootstrap-md';
import { InputsModule,
        InputUtilitiesModule,
        WavesModule,
        ButtonsModule,
        ModalModule,
        TableModule,
        ChartsModule,
        CarouselModule } from 'angular-bootstrap-md';
import { MatSelectModule } from '@angular/material/select';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatDialogModule, MatToolbarModule, MatListModule } from '@angular/material';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FullCalendarModule } from '@fullcalendar/angular';
import {MatSliderModule} from '@angular/material/slider';
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { AgmCoreModule } from '@agm/core';
import { AuthInterceptor } from './modules/auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { MatStepperModule } from '@angular/material/stepper';
import {  NgbDropdownModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { QRCodeModule } from 'angularx-qrcode';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';



import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/auth/header/header.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { SignupComponent } from './modules/auth/signup/signup.component';
import { SignupOptionComponent } from './modules/auth/signup-option/signup-option.component';
import { SignupSProviderComponent } from './modules/auth/signup-s-provider/signup-s-provider.component';
import { HomeComponent } from './modules/home/home/home.component';
import { HomepageComponent } from './modules/home/homepage/homepage.component';
import { ServiceSelectComponent } from './modules/services/service-select/service-select.component';
import { FirmownerProfileComponent } from './modules/service-firm-owner/firmowner-profile/firmowner-profile.component';
import { SproviderProfileComponent } from './modules/service-provider/sprovider-profile/sprovider-profile.component';
import { CustCurrentOrderComponent } from './modules/customer/cust-current-order/cust-current-order.component';
import { SpCurrentOrderComponent } from './modules/service-provider/sp-current-order/sp-current-order.component';
import { MapServiceProviderComponent } from './modules/service-provider/map-service-provider/map-service-provider.component';
import { MapCustomerComponent } from './modules/customer/map-customer/map-customer.component';
import { TaskTimeCountdownComponent } from './modules/customer/task-time-countdown/task-time-countdown.component';
import { SuccessComponent } from './success/success.component';
import { ServiceproviderDashboardComponent } from './modules/service-provider/dashboard/serviceprovider-dashboard/serviceprovider-dashboard.component';
import { CustomerDashboardComponent } from './modules/customer/dashboard/customer-dashboard/customer-dashboard.component';
import { CustomerOrdersComponent } from './modules/customer/customer-orders/customer-orders.component';
import { CustomerDhomeComponent } from './modules/customer/dashboard/pages/customer-dhome/customer-dhome.component';
import { CustomerDordersComponent } from './modules/customer/dashboard/pages/customer-dorders/customer-dorders.component';
import { CustomerDprofileComponent } from './modules/customer/dashboard/pages/customer-dprofile/customer-dprofile.component';
import { CustomerProfileComponent } from './modules/customer/customer-profile/customer-profile.component';
import { NotfoundComponent } from './modules/home/notfound/notfound.component';
import { ServiceproviderDprofileComponent } from './modules/service-provider/dashboard/pages/serviceprovider-dprofile/serviceprovider-dprofile.component';
import { ServiceproviderDordersComponent } from './modules/service-provider/dashboard/pages/serviceprovider-dorders/serviceprovider-dorders.component';
import { ServiceproviderDhomeComponent } from './modules/service-provider/dashboard/pages/serviceprovider-dhome/serviceprovider-dhome.component';
import { ServiceproviderListComponent } from './modules/customer/serviceprovider-list/serviceprovider-list.component';
import { ServiceproviderOrdersComponent } from './modules/service-provider/serviceprovider-orders/serviceprovider-orders.component';
import { ServiceproviderDashStatComponent } from './modules/service-provider/dashboard/serviceprovider-dash-stat/serviceprovider-dash-stat.component';
import { ServiceproviderTaskCountdownComponent } from './modules/service-provider/serviceprovider-task-countdown/serviceprovider-task-countdown.component';
import { LocationSetComponent } from './modules/services/location-set/location-set.component';
import { FirmownerDashboardComponent } from './modules/service-firm-owner/firmowner-dashboard/firmowner-dashboard.component';
import { FirmwonerOrdersComponent } from './modules/service-firm-owner/firmwoner-orders/firmwoner-orders.component';
import { FirmownerSproviderComponent } from './modules/service-firm-owner/firmowner-sprovider/firmowner-sprovider.component';
import { FirmownerPaymentsComponent } from './modules/service-firm-owner/firmowner-payments/firmowner-payments.component';
import { FirmownerDashHomeComponent } from './modules/service-firm-owner/firmowner-dash-home/firmowner-dash-home.component';
import { AdminDashboardComponent } from './modules/admin/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './modules/admin/admin-home/admin-home.component';
import { AdminPaymentsComponent } from './modules/admin/admin-payments/admin-payments.component';
import { OrdersChartComponent } from './modules/admin/orders-chart/orders-chart.component';
import { UsersChartComponent } from './modules/admin/users-chart/users-chart.component';
import { AdminUsersComponent } from './modules/admin/admin-users/admin-users.component';
import { AdminCategoriesComponent } from './modules/admin/admin-categories/admin-categories.component';
import { AdminProfileComponent } from './modules/admin/admin-profile/admin-profile.component';
import { SafetyOptionsComponent } from './modules/customer/safety-options/safety-options.component';
import { OrderRecieptComponent } from './modules/customer/order-reciept/order-reciept.component';
import { AdminDashUsersComponent } from './modules/admin/admin-dash-users/admin-dash-users.component';
import { AdminDashPaymentsComponent } from './modules/admin/admin-dash-payments/admin-dash-payments.component';
import { AdminFirmownersComponent } from './modules/admin/admin-firmowners/admin-firmowners.component';
import { ServiceproviderPaymentsComponent } from './modules/service-provider/serviceprovider-payments/serviceprovider-payments.component';
import { DirectionsMapDirective } from './directives/direction-map.directive';
import { BillRatingComponent } from './modules/customer/bill-rating/bill-rating.component';
import { DocsComponent } from './modules/home/docs/docs.component';
import { FirmOwnerReportComponent } from './modules/service-firm-owner/firm-owner-report/firm-owner-report.component';
import { ServiceProviderReportComponent } from './modules/service-provider/service-provider-report/service-provider-report.component';
import { AdminReportDashboardComponent } from './modules/admin/admin-report-dashboard/admin-report-dashboard.component';


// socket io ocnfiguration
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    SignupOptionComponent,
    SignupSProviderComponent,
    HomeComponent,
    HomepageComponent,
    ServiceSelectComponent,
    FirmownerProfileComponent,
    SproviderProfileComponent,
    CustCurrentOrderComponent,
    SpCurrentOrderComponent,
    MapServiceProviderComponent,
    MapCustomerComponent,
    TaskTimeCountdownComponent,
    SuccessComponent,
    ErrorComponent,
    ServiceproviderDashboardComponent,
    CustomerDashboardComponent,
    CustomerOrdersComponent,
    CustomerDhomeComponent,
    CustomerDordersComponent,
    CustomerDprofileComponent,
    CustomerProfileComponent,
    NotfoundComponent,
    ServiceproviderDprofileComponent,
    ServiceproviderDordersComponent,
    ServiceproviderDhomeComponent,
    ServiceproviderListComponent,
    ServiceproviderOrdersComponent,
    ServiceproviderDashStatComponent,
    ServiceproviderTaskCountdownComponent,
    LocationSetComponent,
    FirmownerDashboardComponent,
    FirmwonerOrdersComponent,
    FirmownerSproviderComponent,
    FirmownerPaymentsComponent,
    FirmownerDashHomeComponent,
    AdminDashboardComponent,
    AdminHomeComponent,
    AdminPaymentsComponent,
    OrdersChartComponent,
    UsersChartComponent,
    AdminUsersComponent,
    AdminCategoriesComponent,
    AdminProfileComponent,
    SafetyOptionsComponent,
    OrderRecieptComponent,
    AdminDashUsersComponent,
    AdminDashPaymentsComponent,
    AdminFirmownersComponent,
    ServiceproviderPaymentsComponent,
    DirectionsMapDirective,
    BillRatingComponent,
    DocsComponent,
    FirmOwnerReportComponent,
    ServiceProviderReportComponent,
    AdminReportDashboardComponent,

  ],
  imports: [
    IconsModule,
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    InputsModule,
    InputUtilitiesModule,
    WavesModule,
    ButtonsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CreditCardDirectivesModule,
    ModalModule,
    MatSidenavModule,
    LayoutModule,
    MatToolbarModule,
    MatListModule,
    TableModule,
    MatTableModule,
    MatPaginatorModule,
    ChartsModule,
    MatProgressBarModule,
    NgbModule,
    MatCheckboxModule,
    FullCalendarModule,
    CarouselModule,
    MatSliderModule,
    MatDialogModule,
    NgbDropdownModule,
    DragDropModule,
    NgbProgressbarModule,
    MatBottomSheetModule,
    QRCodeModule,
    SocketIoModule.forRoot(config),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB4MIX31RUspo9HAkq90KM3W3Ltyw4UIx0',
      libraries: ['places']
    })
  ],

  schemas: [NO_ERRORS_SCHEMA],
  providers: [DatePipe,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [ SuccessComponent, ErrorComponent, SafetyOptionsComponent],
})
export class AppModule {}

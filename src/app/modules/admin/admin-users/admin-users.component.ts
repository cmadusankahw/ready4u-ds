import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ServiceProvider, FirmOwner, SproviderDetails, FirmOwnerDetails } from '../../auth/auth.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit, OnDestroy {

  
  displayedColumns: string[] = ['id', 'name', 'email', 'category', 'firm', 'available',  'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // subscription
  private spSub: Subscription;

  public serviceProviders: SproviderDetails[] = [];


  selectedUser: string;

  showUser = false;

  @Input() userType = 'serviceProvider';

  constructor(private authService: AuthService) { }

  ngOnInit() {
      this.authService.getAdminServiceproviders();
      this.spSub = this.authService.getAdminSproviderDetailsUpdatedListener()
        .subscribe( (res) => {
          if (res) {
            this.serviceProviders = res;
            console.log(this.serviceProviders);
            this.dataSource = new MatTableDataSource(this.serviceProviders);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
           }});


  }

  ngOnDestroy() {
    if (this.spSub) {
      this.spSub.unsubscribe();
    }
  }

  removeSprovider(id: string) {
    this.authService.removeServiceProvider(id);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

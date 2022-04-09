import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ServiceProvider, FirmOwner, SproviderDetails, FirmOwnerDetails } from '../../auth/auth.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-admin-firmowners',
  templateUrl: './admin-firmowners.component.html',
  styleUrls: ['./admin-firmowners.component.scss']
})
export class AdminFirmownersComponent implements OnInit {

 
  displayedColumns: string[] = ['id', 'name', 'email', 'category', 'firm' ,  'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // subscription
  private spSub: Subscription;


  public firmOwners: FirmOwnerDetails[] = [];

  selectedUser: string;

  showUser = false;

  @Input() userType = 'serviceProvider';

  constructor(private authService: AuthService) { }

  ngOnInit() {
      this.authService.getAdminFirmOwners();
      this.spSub = this.authService.getadminFOwnerdetailsUpdatedListener()
        .subscribe( (res) => {
          if (res) {
            this.firmOwners = res;
            console.log(this.firmOwners);
            this.dataSource = new MatTableDataSource(this.firmOwners);
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
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

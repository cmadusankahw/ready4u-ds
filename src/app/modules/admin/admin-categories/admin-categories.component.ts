
import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { ServiceCategory, Task } from '../../services/service.model';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit , OnDestroy{

  
  displayedColumns: string[] = [ 'category', 'action'];
  dataSource: MatTableDataSource<ServiceCategory>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // subscritions
  private categorySub: Subscription;


  // recived categories
  categories: ServiceCategory[] = [];

  // selected category
  selectedCategory: ServiceCategory;

  // selected category id
  selectedCatId = '';

  editmode = false;

  viewMode = false;

  taskTemp: string = '';

  // category tasks
  tasks: {id: string, task: string}[] = [];



  constructor( private serviceService: ServiceService) { }

  ngOnInit() {
     this.serviceService.getServiceCategories();
     this.categorySub = this.serviceService.getServiceCategoriesUpdateListener().subscribe(
      cat => {
        if (cat) {
          this.categories = cat;
          console.log(this.categories);
          this.dataSource = new MatTableDataSource(this.categories);
          this.dataSource.paginator = this.paginator;
        }
      });
  }

  ngOnDestroy() {
    if (this.categorySub) {
      this.categorySub.unsubscribe();
    }
  }


  // get selected appointment details
  selectCategory(id: string) {
    for (const app of this.categories) {
      if (app.id === id) {
        this.selectedCategory = app;
      }
    }
  }


// add categories
  addCategory(catForm: NgForm) {
      if (catForm.invalid) {
        console.log('Form Invalid!');
      } else {
        const newCatedory: ServiceCategory = {
          id:catForm.value.category.replace(' ', ''),
          category: catForm.value.category,
          icon: catForm.value.icon,
          tasks: this.tasks
        };
        this.serviceService.addServiceCategory(newCatedory);
        this.viewMode = false;
        this.editmode = false;
        console.log(newCatedory);
      }
  }

  removeCategory(id: string) {
    this.serviceService.removeServiceCategory(id);
  }

  addTask(task: string){
    this.tasks.push({
      id : task.replace(' ', ''),
      task: task
  });
  }


}

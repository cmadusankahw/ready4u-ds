import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from '../../services/service.model';
import { AuthService } from '../../auth/auth.service';
import { ServiceService } from '../../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';

import { Email } from '../../auth/auth.model';

@Component({
  selector: 'app-bill-rating',
  templateUrl: './bill-rating.component.html',
  styleUrls: ['./bill-rating.component.scss']
})
export class BillRatingComponent implements OnInit, OnDestroy {

  private orderSub: Subscription;

  public order : Order;

  public orderId: string;

  public rating = 0;

  constructor(private authService: AuthService, private serviceService: ServiceService,
              private route: ActivatedRoute, private router: Router) {
                   // get order Id
                const id: string = route.snapshot.params.id;
                this.orderId = id;
               }

  ngOnInit() {
    this.serviceService.getOrder(this.orderId);
    this.orderSub = this.serviceService.getResOrderUpdateListener().subscribe( (order: Order) => {
        if (order) {
          this.order = order;
          console.log(this.order);
        }
      });
  }

  ngOnDestroy() {
    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }
  }


  // sending relavant emails
  sendEmail(subjectString: string) {
    const mail: Email = {
      email: this.order.customer.email,
      subject: subjectString,
      html: document.getElementById('content').innerHTML
    };
    console.log(mail);
    this.authService.sendEmail(mail);
  }

  // get a print as pdf
  printOrder(id: string, name: string) {
    const data = document.getElementById(id);
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;
  
      const contentDataURL = canvas.toDataURL('images/print/');
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      const today = new Date().toISOString();
      pdf.save(name + '_' + today + '.pdf'); // Generated PDF
    });
  }

  // give a rating to sp
  sendRating() {
    this.authService.rateServiceProvider(this.rating, this.order.service_provider.user_id);
  }

}

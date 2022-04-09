import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-firm-owner-report',
  templateUrl: './firm-owner-report.component.html',
  styleUrls: ['./firm-owner-report.component.scss']
})
export class FirmOwnerReportComponent implements OnInit {

  
  // recieved Service Provider ID
  @Input() public userId: string;

  // Charl URLS
  url1: any = "https://charts.mongodb.com/charts-design_project_part1-rtcjn/embed/charts?id=4687ef93-aaa9-438a-8b1f-e0ace4680f48&theme=light";
  url3: any = "https://charts.mongodb.com/charts-design_project_part1-rtcjn/embed/charts?id=88ff80b3-0d22-4420-b3b9-1cd6af9313a2&theme=light";

  constructor(public sanitizer: DomSanitizer, private authService: AuthService) { }

  ngOnInit() {
    this.userId =  this.authService.getUserId();
    this.url1 = this.urlFilter(this.url1);
    this.url3 = this.urlFilter(this.url3);
  }

  public urlFilter(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // email generated report
  public emailReport(content: string) {

  }
}

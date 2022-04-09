import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-admin-report-dashboard',
  templateUrl: './admin-report-dashboard.component.html',
  styleUrls: ['./admin-report-dashboard.component.scss']
})
export class AdminReportDashboardComponent implements OnInit {
  // recieved Service Provider ID
  @Input() public userId: string;

  // Charl URLS
  url1: any = "https://charts.mongodb.com/charts-design_project_part1-rtcjn/embed/charts?id=ff3f13b5-efc3-4135-97c6-7e65fc75eccd&theme=light";
  url2: any = "https://charts.mongodb.com/charts-design_project_part1-rtcjn/embed/charts?id=dd0b9589-66d8-4abc-a880-b10d56cfeebe&theme=light";
  url3: any = "https://charts.mongodb.com/charts-design_project_part1-rtcjn/embed/charts?id=ebc3ae71-6712-46a2-abdd-b66df65a1bfe&theme=light";



  constructor(public sanitizer: DomSanitizer, private authService: AuthService) { }

  ngOnInit() {
    this.userId =  this.authService.getUserId();
    this.url1 = this.urlFilter(this.url1);
    this.url2 = this.urlFilter(this.url2);
    this.url3 = this.urlFilter(this.url3);
  }

  public urlFilter(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


  // email generated report
  public emailReport(content: string) {

  }

}

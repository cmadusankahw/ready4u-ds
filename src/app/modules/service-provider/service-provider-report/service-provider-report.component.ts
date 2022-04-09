import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-service-provider-report',
  templateUrl: './service-provider-report.component.html',
  styleUrls: ['./service-provider-report.component.scss']
})
export class ServiceProviderReportComponent implements OnInit {

  // recieved Service Provider ID
  @Input() public userId: string;

  // Charl URLS
  url1: any = "https://charts.mongodb.com/charts-design_project_part1-rtcjn/embed/charts?id=c0990ddd-f44a-40c8-92fa-ae477a7ac9b0&theme=light";
  url2: any = "https://charts.mongodb.com/charts-design_project_part1-rtcjn/embed/charts?id=61d8078e-91c1-44f2-9415-322f73210114&theme=light";
  url3: any = "https://charts.mongodb.com/charts-design_project_part1-rtcjn/embed/charts?id=7910821f-fadf-469b-8f61-3a0c27f2f92d&theme=light";



  constructor(public sanitizer: DomSanitizer, private authService: AuthService) { }

  ngOnInit() {
    this.userId =  this.authService.getUserId();
    this.url1 = this.sproviderFilter(this.url1);
    this.url2 = this.sproviderFilter(this.url2);
    this.url3 = this.sproviderFilter(this.url3);
  }

  public sproviderFilter(url: string) {
    const queryString = '&filter={"service_provider.user_id":"' + this.userId + '"}';
    return this.sanitizer.bypassSecurityTrustResourceUrl(url + queryString);
  }

  public sproviderUserFilter(url: string) {
    const queryString = '&filter={"user_id":"' + this.userId + '"}';
    return this.sanitizer.bypassSecurityTrustResourceUrl(url + queryString);
  }

  // email generated report
  public emailReport(content: string) {

  }


}

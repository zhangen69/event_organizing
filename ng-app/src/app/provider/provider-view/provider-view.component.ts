import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StandardHttpResponse } from 'src/app/standard/standard.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-provider-view',
  templateUrl: './provider-view.component.html',
  styleUrls: ['./provider-view.component.css']
})
export class ProviderViewComponent implements OnInit {
  provider: any;
  providerServices = [];
  providerFacilities = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private titleService: Title) {
    this.titleService.setTitle('View Stock Item - ' + environment.title);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id) {
        const req$ = this.http.get<StandardHttpResponse>(environment.apiUrl + '/service/provider/' + params.id).subscribe({
          next: ({ data }) => {
            this.provider = data;
          },
          complete: () => {
            req$.unsubscribe();
          }
        });
        const queryModel = {
          type: 'provider',
          searchText: params.id,
          queryType: 'match',
        };
        const providerServicesReq$ = this.http.get<StandardHttpResponse>(environment.apiUrl + '/service/provider-service?queryModel=' + JSON.stringify(queryModel)).subscribe({
          next: ({ data }) => {
            this.providerServices = data;
          },
          complete: () => {
            providerServicesReq$.unsubscribe();
          }
        });
        const providerFacilitiesReq$ = this.http.get<StandardHttpResponse>(environment.apiUrl + '/service/provider-facility?queryModel=' + JSON.stringify(queryModel)).subscribe({
          next: ({ data }) => {
            this.providerFacilities = data;
          },
          complete: () => {
            providerFacilitiesReq$.unsubscribe();
          }
        });
      }
    });
  }

}

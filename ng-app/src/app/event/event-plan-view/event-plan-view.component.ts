import { HttpResponse } from './../../standard/standard.interface';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { PageLoaderService } from 'src/app/templates/page-loader/page-loader.service';

@Component({
  selector: 'app-event-plan-view',
  templateUrl: './event-plan-view.component.html',
  styleUrls: ['./event-plan-view.component.css']
})
export class EventPlanViewComponent {
  eventPlan: any = {};

  constructor(private route: ActivatedRoute, private http: HttpClient, private pageLoaderService: PageLoaderService) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.pageLoaderService.toggle();
        const includes = ['customer', 'services', 'facilities', 'stockItems', 'processes', 'notes', 'registrationForm'];
        this.http.get<HttpResponse>(environment.apiUrl + '/service/event-plan/' + params['id'] + '?includes=' + includes.join()).pipe(
          map(res => res.data),
        ).subscribe(data => {
          this.eventPlan = data;
          this.pageLoaderService.toggle();
        });
      }
    });
  }

}

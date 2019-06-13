import { Component, OnInit } from '@angular/core';
import { StandardService } from 'src/app/standard/standard.service';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {
  formData: any = {};
  includes: string[] = [];

  constructor(private service: StandardService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.service.init('event');
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.service.fetch(params['id'], null, this.includes).subscribe((res: any) => {
          this.formData = res.data;
        });
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

import { Hocklub } from 'src/app/models/hocklub.model';
import { HocklubService, DEFAULT_LOGO } from 'src/app/services/hocklub.service';
import { flatMap, filter } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-hockdetail',
  templateUrl: './hockdetail.page.html',
  styleUrls: ['./hockdetail.page.scss'],
})
export class HockdetailPage implements OnInit {

  readonly defaultLogo = DEFAULT_LOGO;

  hocklub: Hocklub;

  private readonly iabOptions: InAppBrowserOptions = {
    location: 'no',
  };

  constructor(
    private route: ActivatedRoute,
    private hocklubService: HocklubService,
    private iab: InAppBrowser,
  ) {}

  ngOnInit() {
    this.route.paramMap.pipe(
      flatMap(params => of(parseInt(params.get('id'), 10))),
      filter(id => id > 0),
      flatMap(id => this.hocklubService.getById(id)),
    ).subscribe(hocklub => {
      this.hocklub = hocklub;
    });
  }

  goToWebsite() {
    this.iab.create('https://' + this.hocklub.website, '_blank', this.iabOptions);
  }
}

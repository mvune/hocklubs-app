import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

import { Hocklub } from 'src/app/models/hocklub.model';
import { HocklubService } from 'src/app/services/hocklub.service';

@Component({
  selector: 'app-hockdetail',
  templateUrl: './hockdetail.page.html',
  styleUrls: ['./hockdetail.page.scss'],
})
export class HockdetailPage implements OnInit {

  private hocklub: Hocklub = new Hocklub;

  private readonly iabOptions: InAppBrowserOptions = {
    location: 'no',
  };

  constructor(
    private route: ActivatedRoute,
    private hocklubService: HocklubService,
    private iab: InAppBrowser,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.hocklubService.getById(id)
      .subscribe(hocklub => this.hocklub = hocklub);
  }

  goToWebsite() {
    this.iab.create('https://' + this.hocklub.website, '_blank', this.iabOptions);
  }
}

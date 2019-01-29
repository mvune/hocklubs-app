import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { HocklubService } from '../services/hocklub.service';
import { Hocklub } from '../models/hocklub.model';

@Component({
  selector: 'app-hocklist',
  templateUrl: 'hocklist.page.html',
  styleUrls: ['hocklist.page.scss']
})
export class HocklistPage implements OnInit {

  private backButton: Subscription;
  private hocklubs: Hocklub[];

  constructor(
    private platform: Platform,
    private hocklubService: HocklubService,
  ) {}

  ngOnInit() {
    this.hocklubService.getHocklubs().subscribe(hocklubs => this.hocklubs = hocklubs);
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      this.backButton = this.platform.backButton.subscribe(() => {
        navigator['app'].exitApp();
      });
    });
  }

  ionViewWillLeave() {
    this.backButton.unsubscribe();
  }
}

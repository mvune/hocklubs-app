import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';

import { Hocklub } from 'src/app/models/hocklub.model';
import { HocklubService } from 'src/app/services/hocklub.service';

@Component({
  selector: 'app-hockdetail',
  templateUrl: './hockdetail.page.html',
  styleUrls: ['./hockdetail.page.scss'],
})
export class HockdetailPage implements OnInit {

  private hocklub: Hocklub = new Hocklub;
  private transitionOptions: NativeTransitionOptions = {
    direction: 'left',
    duration: 600,
    slowdownfactor: -1,
  };

  constructor(
    private route: ActivatedRoute,
    private hocklubService: HocklubService,
    private pageTransitions: NativePageTransitions,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.hocklubService.getById(id)
      .subscribe(hocklub => this.hocklub = hocklub);
  }

  ionViewWillEnter() {
    this.pageTransitions.slide(this.transitionOptions);
  }

  ionViewWillLeave() {
    this.transitionOptions.direction = 'right';
    this.pageTransitions.slide(this.transitionOptions);
  }
}

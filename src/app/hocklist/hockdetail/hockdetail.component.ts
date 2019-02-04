import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { Hocklub } from 'src/app/models/hocklub.model';
import { HocklubService } from 'src/app/services/hocklub.service';

@Component({
  selector: 'app-hockdetail',
  templateUrl: './hockdetail.component.html',
  styleUrls: ['./hockdetail.component.scss']
})
export class HockdetailComponent implements OnInit {

  private hocklub: Hocklub = new Hocklub;
  private transitionOptions: NativeTransitionOptions = {
    direction: 'left',
    duration: 400,
    slowdownfactor: -1,
    fixedPixelsBottom: 57,
  };

  constructor(
    private route: ActivatedRoute,
    private hocklubService: HocklubService,
    private pageTransitions: NativePageTransitions,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.hocklubService.getHocklub(id).subscribe(hocklub => this.hocklub = hocklub);
  }

  ionViewWillEnter() {
    this.pageTransitions.slide(this.transitionOptions);
  }

  ionViewWillLeave() {
    this.transitionOptions.direction = 'right';
    this.pageTransitions.slide(this.transitionOptions);
  }
}

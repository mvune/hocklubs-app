import { Component, OnInit } from '@angular/core';
import { HocklubService } from '../services/hocklub.service';
import { Hocklub } from '../models/hocklub.model';
import { slideInOutAnimation } from '../animations/slide-in-out.animation';

@Component({
  selector: 'app-hocklist',
  templateUrl: 'hocklist.page.html',
  styleUrls: ['hocklist.page.scss'],
  animations: [slideInOutAnimation],
})
export class HocklistPage implements OnInit {

  private hocklubs: Hocklub[] = [];
  private loadingState = 'not-loading'; // 'loading' | 'not-loading'

  constructor(
    private hocklubService: HocklubService,
  ) {}

  ngOnInit() {
    this.getList();
  }

  onChange(event: any) {
    this.getList(event.target.value);
  }

  onEnter(event: any) {
    event.target.blur();
  }

  private getList(searchTerm?: string) {
    this.loadingState = 'loading';
    this.hocklubService.getAll(searchTerm).subscribe(hocklubs => {
      this.hocklubs = hocklubs;
      this.loadingState = 'not-loading';
    });
  }
}

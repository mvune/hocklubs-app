import { Component, OnInit } from '@angular/core';
import { HocklubService } from '../services/hocklub.service';

@Component({
  selector: 'app-hocklist',
  templateUrl: 'hocklist.page.html',
  styleUrls: ['hocklist.page.scss']
})
export class HocklistPage implements OnInit {

  constructor(private hocklubService: HocklubService) { }

  ngOnInit() {
    this.hocklubService.getHocklubs();
  }
}

import { Component, OnInit } from '@angular/core';
import { HocklubService } from '../services/hocklub.service';
import { Hocklub } from '../models/hocklub.model';

@Component({
  selector: 'app-hocklist',
  templateUrl: 'hocklist.page.html',
  styleUrls: ['hocklist.page.scss']
})
export class HocklistPage implements OnInit {

  private hocklubs: Hocklub[] = [];

  constructor(
    private hocklubService: HocklubService,
  ) {}

  ngOnInit() {
    this.hocklubService.getAll().subscribe(hocklubs => this.hocklubs = hocklubs);
  }

  onInput(event: any) {
    const term = event.target.value;
    this.hocklubService.search(term).subscribe(hocklubs => this.hocklubs = hocklubs);
  }

  onEnter(event: any) {
    event.target.blur();
  }
}

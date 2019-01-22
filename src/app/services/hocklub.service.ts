import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { HockbaseService } from './hockbase.service';

@Injectable({
  providedIn: 'root'
})
export class HocklubService {

  private db: Promise<SQLiteObject>;

  constructor(private hockbaseService: HockbaseService) {
    this.db = this.hockbaseService.getDb();
  }

  getHocklubs() {
    console.log('HocklubService.getHocklubs() called');
  }
}

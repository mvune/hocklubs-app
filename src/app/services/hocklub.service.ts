import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { from, Observable } from 'rxjs';
import { flatMap, map, take } from 'rxjs/operators';
import { HockbaseService } from './hockbase.service';
import { Hocklub } from '../models/hocklub.model';

@Injectable({
  providedIn: 'root'
})
export class HocklubService {

  private db: Observable<SQLiteObject>;

  constructor(private hockbaseService: HockbaseService) {
    this.db = from(this.hockbaseService.getDb());
  }

  getHocklubs(): Observable<Hocklub[]> {
    return this.db.pipe(
      flatMap((dbInstance: SQLiteObject) => {
        return dbInstance.executeSql('SELECT * FROM hocklubs', []);
      }),
      map(data => {
        const hocklubs: Hocklub[] = [];

        for (let i = 0; i < data.rows.length; i++) {
          const hocklub = new Hocklub();
          Object.assign(hocklub, data.rows.item(i));
          hocklubs.push(hocklub);
        }

        return hocklubs;
      }),
      take(1)
    );
  }

  getHocklub(id: string): Observable<Hocklub> {
    return this.db.pipe(
      flatMap((dbInstance: SQLiteObject) => {
        return dbInstance.executeSql('SELECT * FROM hocklubs WHERE id = ?', [id]);
      }),
      map(data => {
        const hocklub = new Hocklub();
        Object.assign(hocklub, data.rows.item(0));

        return hocklub;
      }),
      take(1)
    );
  }
}

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

  private readonly selectQuery = 'SELECT * FROM hocklubs';

  constructor(private hockbaseService: HockbaseService) {
    this.db = from(this.hockbaseService.getDb());
  }

  getById(id: number): Observable<Hocklub> {
    return this.db.pipe(
      flatMap((dbInstance: SQLiteObject) => {
        return dbInstance.executeSql(this.selectQuery + ' WHERE id = ?', [id]);
      }),
      map(dataToHocklubs),
      map((hocklubs: Hocklub[]) => hocklubs[0]),
      take(1)
    );
  }

  getAll(searchTerm?: string): Observable<Hocklub[]> {
    return this.db.pipe(
      flatMap((dbInstance: SQLiteObject) => {
        if (searchTerm) {
          const term = `%${searchTerm}%`;
          const query = this.selectQuery + ' WHERE name LIKE ? OR city LIKE ?';
          return dbInstance.executeSql(query, [term, term]);
        } else {
          return dbInstance.executeSql(this.selectQuery, []);
        }
      }),
      map(dataToHocklubs),
      take(1)
    );
  }
}

export const DEFAULT_LOGO = window.location.origin + '/assets/icons/default-logo.jpg';

function dataToHocklubs(data: any): Hocklub[] {
  const hocklubs: Hocklub[] = [];

  for (let i = 0; i < data.rows.length; i++) {
    const hocklub = new Hocklub();
    Object.assign(hocklub, data.rows.item(i));
    hocklub.logo = logoToLogoUrl(hocklub.logo);
    hocklubs.push(hocklub);
  }

  return hocklubs;
}

function logoToLogoUrl(logo: string): string {
  let logoUrl: string;

  if (logo) {
    logoUrl = 'https://hockey.nl' + logo;
  } else {
    logoUrl = DEFAULT_LOGO;
  }

  return logoUrl;
}

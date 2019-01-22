import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class HockbaseService {

  private db: Promise<SQLiteObject>;

  constructor(private sqlite: SQLite) {
    this.getDb();
  }

  getDb() {
    if (!this.db) {
      this.db = this.sqlite.create({
        name: 'hockapp.db',
        location: 'default'
      });
    }

    return this.db;
  }
}

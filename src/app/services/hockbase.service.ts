import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject, SQLiteDatabaseConfig } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HockbaseService {

  private db: Promise<SQLiteObject>;
  private config: SQLiteDatabaseConfig = {
    name: 'hockapp.db',
    location: 'default',
    createFromLocation: 1,
  };

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
  ) {}

  async getDb() {
    if (!this.db) {
      await this.platform.ready();
      this.db = this.sqlite.create(this.config);
    }

    return this.db;
  }
}

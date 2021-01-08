import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

class NCache<T> {
  private _data?: Promise<T>;
  private lastUpdate?: Date;

  public getData(query: Observable<T>, cacheTime = 10000) {
    if (this.cacheExpire(cacheTime) || !this._data) {
      return query
        .pipe<T>(
          tap((data) => {
            this._data = new Promise((r) => r(data));
            this.lastUpdate = new Date();
          })
        )
        .toPromise();
    }
    return this._data;
  }

  private cacheExpire(cacheTime?: number) {
    return this.lastUpdate?.getTime() - new Date().getTime() >= cacheTime;
  }
}

export { NCache as Cache };

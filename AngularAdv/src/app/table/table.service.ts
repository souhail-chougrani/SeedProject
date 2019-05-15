import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class TableService {
  constructor(private http: HttpClient) {}
  getData(paginate?, orderby?) {
    const body = { ...paginate, ...orderby };
    return this.http.post('mission/SP040', body);
    // return this.http.post('Mission/Tous', body);
  }
}

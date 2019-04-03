import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class TableService {
  constructor(private http: HttpClient) {}
  getData(body = { start: 0, count: 10 }) {
    return this.http.post('mission/SP040', body);
  }
}

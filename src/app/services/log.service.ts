import { Injectable } from '@angular/core';
import { Log } from '../models/Log';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LogService {
  
  constructor(
    private http: HttpClient
  ) {}

  getAll() {
    return this.http.get<Log[]>(`${ environment.apiUrl }/log`);
  }

  getAllByUserId(id: number) {
    return this.http.get<Log[]>(`${ environment.apiUrl }/log/user/${ id }`);
  }

  getAllArchivedByUserId(id: number) {
    return this.http.get<Log[]>(`${ environment.apiUrl }/log/archived/user/${ id }`);
  }

  getAllUnarchivedByUserId(id: number) {
    return this.http.get<Log[]>(`${ environment.apiUrl }/log/unarchived/user/${ id }`);
  }

  getById(id: number) {
    return this.http.get<Log>(`${ environment.apiUrl }/log/${ id }`);
  }

  update(id: number, params: any) {
    return this.http.put<Log>(`${ environment.apiUrl }/log/${ id }`, params)
      .pipe(map(log => log));
  }

  delete(id: number) {
    return this.http.delete<Log>(`${ environment.apiUrl }/log/${ id }`)
      .pipe(map(log => log));
  }

  archive(id: number) {
    return this.http.patch<Log>(`${ environment.apiUrl }/log/archive/${ id }`, null)
      .pipe(map(log => log));
  }
}
import { Injectable } from '@angular/core';
import { Log } from '../models/Log';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Response } from '../models/Response';

@Injectable({ providedIn: 'root' })
export class LogService {
  
  constructor(
    private http: HttpClient
  ) {}

  getAll() {
    return this.http.get<Response>(`${ environment.apiUrl }/log`)
      .pipe(map(response => response.data as Log[]));
  }

  getAllByUserId(id: number) {
    return this.http.get<Response>(`${ environment.apiUrl }/log/user/${ id }`)
      .pipe(map(response => response.data as Log[]));
  }

  getAllArchivedByUserId(id: number) {
    return this.http.get<Response>(`${ environment.apiUrl }/log/archived/user/${ id }`)
      .pipe(map(response => response.data as Log[]));
  }

  getAllUnarchivedByUserId(id: number) {
    return this.http.get<Response>(`${ environment.apiUrl }/log/unarchived/user/${ id }`)
      .pipe(map(response => response.data as Log[]));
  }

  getById(id: number) {
    return this.http.get<Response>(`${ environment.apiUrl }/log/${ id }`)
      .pipe(map(response => response.data as Log));
  }

  update(id: number, params: any) {
    return this.http.put<Response>(`${ environment.apiUrl }/log/${ id }`, params)
      .pipe(map(response => response.data as Log));
  }

  delete(id: number) {
    return this.http.delete<Response>(`${ environment.apiUrl }/log/${ id }`)
      .pipe(map(response => response.message));
  }

  archive(id: number) {
    return this.http.patch<Response>(`${ environment.apiUrl }/log/archive/${ id }`, null)
      .pipe(map(response => response.data as Log));
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getAllPatients(): Observable<string> {
    return this.http.get<string>('http://localhost:8050/api/v1/')
  }



}

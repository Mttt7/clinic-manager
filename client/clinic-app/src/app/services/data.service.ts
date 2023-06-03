import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getData(pageNumber): Observable<any> {
    return this.http.get<any>(`http://localhost:7000/api/v1/patients?page=${pageNumber}`)
  }



}

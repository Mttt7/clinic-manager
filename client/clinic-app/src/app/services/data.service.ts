import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getPatients(pageNumber): Observable<any> {
    return this.http.get<any>(`http://localhost:7000/api/v1/patients?page=${pageNumber}`)
  }

  getPatientById(id: string): Observable<any> {
    //                   V??????V  change to<any>??
    return this.http.get<Patient>(`http://localhost:7000/api/v1/patients/${id}`)
  }

  getAppointmentById(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:7000/api/v1/appointments/${id}`)
  }

  getPatientAppointment(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:7000/api/v1/patients/${id}/appointments`)
  }



}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Patient } from '../models/patient.model';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  constructor(private http: HttpClient) { }

  //Patients
  getPatients(pageNumber): Observable<any> {
    return this.http.get<any>(`http://localhost:7000/api/v1/patients?page=${pageNumber}`)
  }

  getPatientById(id: string): Observable<any> {
    //                   V??????V  change to<any>??
    return this.http.get<Patient>(`http://localhost:7000/api/v1/patients/${id}`)
  }

  searchForPatient(fullName: string): Observable<any> {
    fullName = fullName.split(' ').join('-')
    return this.http.get<any>(`http://localhost:7000/api/v1/patients?search=${fullName}`)
  }
  createNewPatient(patient: Patient) {
    return this.http.post<any>(`http://localhost:7000/api/v1/patients`, JSON.stringify(patient), this.httpOptions)
  }

  //Doctors
  getDoctors(pageNumber: number): Observable<any> {
    return this.http.get<any>(`http://localhost:7000/api/v1/doctors?page=${pageNumber}`)
  }

  getDoctorById(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:7000/api/v1/doctors/${id}`)
  }
  getDoctorAppointment(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:7000/api/v1/doctors/${id}/appointments`)
  }
  searchForDoctor(fullName: string): Observable<any> {
    fullName = fullName.split(' ').join('-')
    return this.http.get<any>(`http://localhost:7000/api/v1/doctors?search=${fullName}`)
  }

  //Appointments
  getAppointments(pageNumber: number): Observable<any> {
    return this.http.get<any>(`http://localhost:7000/api/v1/appointments?page=${pageNumber}`)
  }

  getAppointmentById(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:7000/api/v1/appointments/${id}`)
  }

  getPatientAppointment(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:7000/api/v1/patients/${id}/appointments`)
  }

  createNewAppointment(appointment: any): Observable<any> {
    return this.http.post<any>(`http://localhost:7000/api/v1/appointments`, JSON.stringify(appointment), this.httpOptions)
  }
  editAppointment(id: string, appointment: any): Observable<any> {
    return this.http.patch<any>(`http://localhost:7000/api/v1/appointments/${id}`, JSON.stringify(appointment), this.httpOptions)
  }



}

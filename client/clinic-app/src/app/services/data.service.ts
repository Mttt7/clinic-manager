import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Patient } from '../models/patient.model';
import { Appointment } from '../models/appointment.model';
import { Doctor } from '../models/doctor.model';

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

  searchForPatient(searchQuery: string, page?: number): Observable<any> {
    searchQuery = searchQuery.split(' ').join('-')
    console.log(searchQuery)
    return this.http.get<any>(`http://localhost:7000/api/v1/patients?search=${searchQuery}&page=${page}`)
  }
  createNewPatient(patient: Patient): Observable<any> {
    return this.http.post<any>(`http://localhost:7000/api/v1/patients`, JSON.stringify(patient), this.httpOptions)
  }
  editPatient(id: string, patient: Patient): Observable<any> {
    return this.http.patch<any>(`http://localhost:7000/api/v1/patients/${id}`, JSON.stringify(patient), this.httpOptions)
  }
  deletePatient(id: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:7000/api/v1/patients/${id}`)
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
  searchForDoctor(searchQuery: string, page?: number): Observable<any> {
    searchQuery = searchQuery.split(' ').join('-')
    return this.http.get<any>(`http://localhost:7000/api/v1/doctors?search=${searchQuery}&page=${page}`)
  }
  createNewDoctor(doctor: Doctor): Observable<any> {
    return this.http.post<any>(`http://localhost:7000/api/v1/doctors`, JSON.stringify(doctor), this.httpOptions)
  }
  editDoctor(id: string, doctor: Doctor): Observable<any> {
    return this.http.patch<any>(`http://localhost:7000/api/v1/doctors/${id}`, JSON.stringify(doctor), this.httpOptions)
  }
  deleteDoctor(id: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:7000/api/v1/doctors/${id}`)
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

  deleteAppointment(id: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:7000/api/v1/appointments/${id}`)
  }


}

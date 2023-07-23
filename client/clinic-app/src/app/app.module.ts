import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PatientsComponent } from './patients/patients.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './services/data.service';
import { PatientComponent } from './patients/patient/patient.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PatientProfileComponent } from './patients/patient-profile/patient-profile.component';
import { AppointmentComponent } from './appointments/appointment/appointment.component';
import { AppointmentProfileComponent } from './appointments/appointment-profile/appointment-profile.component';
import { DoctorProfileComponent } from './doctors/doctor-profile/doctor-profile.component';
import { DoctorComponent } from './doctors/doctor/doctor.component';
import { AppointmentFromAppointmentsComponent } from './appointments/appointment-from-appointments/appointment-from-appointments.component';
import { AddAppointmentButtonComponent } from './appointments/add-appointment-button/add-appointment-button.component';
import { MatDialogModule } from '@angular/material/dialog';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModuleConfig } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { AddNewPersonButtonComponent } from './add-new-person-button/add-new-person-button.component';
import { NewPatientFormComponent } from './patients/new-patient-form/new-patient-form.component';
import { EditPatientFormComponent } from './patients/edit-patient-form/edit-patient-form.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NewDoctorFormComponent } from './doctors/new-doctor-form/new-doctor-form.component';
import { EditDoctorFormComponent } from './doctors/edit-doctor-form/edit-doctor-form.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    PatientsComponent,
    DoctorsComponent,
    AppointmentsComponent,
    PatientComponent,
    PatientProfileComponent,
    AppointmentComponent,
    AppointmentProfileComponent,
    DoctorProfileComponent,
    DoctorComponent,
    AppointmentFromAppointmentsComponent,
    AddAppointmentButtonComponent,
    AddNewPersonButtonComponent,
    NewPatientFormComponent,
    EditPatientFormComponent,
    NewDoctorFormComponent,
    EditDoctorFormComponent,
    SearchbarComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    MatProgressSpinnerModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    MatRadioModule,
    MatFormFieldModule,
    MatDialogModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { AddAppointmentButtonComponent } from "./appointments/add-appointment-button/add-appointment-button.component";

import { AppointmentProfileComponent } from "./appointments/appointment-profile/appointment-profile.component";
import { AppointmentsComponent } from "./appointments/appointments.component";
import { DoctorProfileComponent } from "./doctors/doctor-profile/doctor-profile.component";
import { DoctorsComponent } from "./doctors/doctors.component";
import { NewPatientFormComponent } from "./patients/new-patient-form/new-patient-form.component";
import { PatientProfileComponent } from "./patients/patient-profile/patient-profile.component";
import { PatientsComponent } from "./patients/patients.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router'



const appRoutes: Routes = [
    { path: 'add-patient', component: NewPatientFormComponent },
    { path: 'patients', component: PatientsComponent },
    { path: 'doctors', component: DoctorsComponent },
    { path: 'doctors/:id', component: DoctorProfileComponent },
    { path: 'appointments', component: AppointmentsComponent },
    { path: 'appointments/:id', component: AppointmentProfileComponent },
    { path: 'patients/:id', component: PatientProfileComponent },
    { path: 'patients/:id/:appId', component: AppointmentProfileComponent },

]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}
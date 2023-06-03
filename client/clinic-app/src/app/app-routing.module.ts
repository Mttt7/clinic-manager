import { AppointmentProfileComponent } from "./appointments/appointment-profile/appointment-profile.component";
import { AppointmentsComponent } from "./appointments/appointments.component";
import { DoctorsComponent } from "./doctors/doctors.component";
import { PatientProfileComponent } from "./patients/patient-profile/patient-profile.component";
import { PatientsComponent } from "./patients/patients.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router'



const appRoutes: Routes = [
    { path: 'patients', component: PatientsComponent },
    { path: 'doctors', component: DoctorsComponent },
    { path: 'appointments', component: AppointmentsComponent },
    { path: 'appointments/:id', component: AppointmentProfileComponent },
    { path: 'patients/:id', component: PatientProfileComponent }
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
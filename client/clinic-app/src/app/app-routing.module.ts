import { AppointmentsComponent } from "./appointments/appointments.component";
import { DoctorsComponent } from "./doctors/doctors.component";
import { PatientsComponent } from "./patients/patients.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router'



const appRoutes: Routes = [
    { path: '', component: PatientsComponent },
    { path: 'patients', component: PatientsComponent },
    { path: 'doctors', component: DoctorsComponent },
    { path: 'appointments', component: AppointmentsComponent },

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
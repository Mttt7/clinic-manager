import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';
import { Patient } from 'src/app/models/patient.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-appointment-button',
  templateUrl: './add-appointment-button.component.html',
  styleUrls: ['./add-appointment-button.component.scss']
})
export class AddAppointmentButtonComponent {


  appID: string = 'new-appointment';
  @Input() patient: Patient
  @Input() doctor: Doctor


  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router) { }




  addAppointment() {
    console.log(this.patient)
    console.log(this.doctor)

    if (this.patient) {
      this.router.navigate([`/appointments/${this.appID}`],
        { queryParams: { mode: 'create', patientID: this.patient._id } })
    }
    else if (this.doctor) {
      this.router.navigate([`/appointments/${this.appID}`],
        { queryParams: { mode: 'create', doctorID: this.doctor?._id } })
    }
    else if (!this.patient && !this.doctor) {
      this.router.navigate([`/appointments/${this.appID}`],
        { queryParams: { mode: 'create' } })
    }

  }
}

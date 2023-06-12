import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment.model';
import { Patient } from 'src/app/models/patient.model';
import { DataService } from 'src/app/services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit {

  id: string
  patient: Patient
  appointments: string[] = []
  constructor(private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router) { }



  onEditButtonClicked() {
    this.router.navigate([`edit-patient`, `${this.patient._id}`])
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    this.dataService.getPatientById(this.id).subscribe((data) => {
      this.patient = data.data.patient as Patient

    })
    this.dataService.getPatientAppointment(this.id).subscribe((data) => {
      this.appointments = data.data.appointments
    })

  }





}

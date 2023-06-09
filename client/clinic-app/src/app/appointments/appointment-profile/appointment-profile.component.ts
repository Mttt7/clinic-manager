import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Appointment } from 'src/app/models/appointment.model';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Doctor } from 'src/app/models/doctor.model';
import { Patient } from 'src/app/models/patient.model';

@Component({
  selector: 'app-appointment-profile',
  templateUrl: './appointment-profile.component.html',
  styleUrls: ['./appointment-profile.component.scss']
})
export class AppointmentProfileComponent implements OnInit {

  myForm: FormGroup


  id: string
  appointment: Appointment
  mode: string //display edit create

  searchedDoctors: Doctor[] = []
  searchedPatients: Patient[] = []

  success: boolean = false
  loading: boolean = false

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private fb: FormBuilder) { }


  submitCreate() {
    this.loading = true
    const formValue = this.myForm.value;

    try {
      console.log('------')
      console.log(formValue)
      this.success = true
    } catch (error) {

    }
    this.loading = false

  }

  searchDoctor() {
    if (this.myForm.value.doctorFullName.length > 2) {
      this.dataService.searchForDoctor(this.myForm.value.doctorFullName).subscribe((data) => {
        this.searchedDoctors = data.data.doctors
        console.log(this.searchedDoctors)
      })
    }
    else {
      this.searchedDoctors = []
    }

  }


  ngOnInit(): void {
    this.myForm = this.fb.group({
      doctorFullName: '',
      patientFullName: '',
      date: '',
    })
    this.myForm.valueChanges.subscribe(() => this.searchDoctor())

    this.mode = this.route.snapshot.queryParams['mode']
    this.route.queryParams.subscribe((params: Params) => {
      this.mode = params['mode']
    })

    this.id = this.route.snapshot.params['id']
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    this.dataService.getAppointmentById(this.id).subscribe((data) => {
      this.appointment = data.data.appointment as Appointment
      console.log(this.appointment)
    })
  }
}

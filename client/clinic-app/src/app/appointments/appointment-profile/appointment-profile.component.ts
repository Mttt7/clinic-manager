import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Appointment } from 'src/app/models/appointment.model';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { Doctor } from 'src/app/models/doctor.model';
import { Patient } from 'src/app/models/patient.model';

@Component({
  selector: 'app-appointment-profile',
  templateUrl: './appointment-profile.component.html',
  styleUrls: ['./appointment-profile.component.scss']
})
export class AppointmentProfileComponent implements OnInit {

  myForm: FormGroup

  selectedDate: Date | null;
  id: string
  appointment: Appointment
  mode: string //display edit create

  searchedDoctors: Doctor[] = []
  searchedPatients: Patient[] = []

  //patient: Patient
  patientID: string
  //doctor: Doctor
  doctorID: string

  patientChosen: boolean = false
  doctorChosen: boolean = false

  success: boolean = false
  loading: boolean = false

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private fb: FormBuilder) { }


  submitCreate() {
    this.loading = true
    const formValue = this.myForm.value;

    try {
      this.selectedDate.setHours(formValue.time.split(':')[0]);
      this.selectedDate.setMinutes(formValue.time.split(':')[1]);
      this.success = true

      const appointment = {
        date: this.selectedDate.toISOString(),
        patient: this.patientID,
        doctor: this.doctorID

      }
      console.log('APPOINTMENT:--->', appointment)
      this.dataService.createNewAppointment(appointment).subscribe(data => {
        console.log(data)
      }, (error) => console.log(error))

    } catch (error) {
      console.log('ERROR:--->', error)
    }
    this.loading = false

  }

  searchPatient() {
    if (this.myForm.value.patientFullName?.length > 1) {
      this.dataService.searchForPatient(this.myForm.value.patientFullName).subscribe((data) => {
        this.searchedPatients = data.data.patients
        console.log(this.searchedPatients)
      })
    }
    else {
      this.searchedPatients = []
    }
  }

  searchDoctor() {
    if (this.myForm.value.doctorFullName?.length > 1) {
      this.dataService.searchForDoctor(this.myForm.value.doctorFullName).subscribe((data) => {
        this.searchedDoctors = data.data.doctors
        console.log(this.searchedDoctors)
      })
    }
    else {
      this.searchedDoctors = []
    }
  }

  choosePatient(patient: Patient) {
    this.patientID = patient._id
    this.myForm.patchValue({ patientFullName: patient.fullName })
    this.patientChosen = true
    this.myForm.get('patientFullName')?.disable()
    this.searchedPatients = []
  }
  resetPatient() {
    this.patientID = ''
    this.myForm.patchValue({ patientFullName: '' })
    this.patientChosen = false
    this.myForm.get('patientFullName')?.enable()
    this.searchedPatients = []
  }
  chooseDoctor(doctor: Doctor) {
    this.doctorID = doctor._id
    this.myForm.patchValue({ doctorFullName: doctor.fullName })
    this.doctorChosen = true
    this.myForm.get('doctorFullName')?.disable()
    this.searchedDoctors = []
  }
  resetDoctor() {
    this.doctorID = ''
    this.myForm.patchValue({ doctorFullName: '' })
    this.doctorChosen = false
    this.myForm.get('doctorFullName')?.enable()
    this.searchedDoctors = []
    console.log(this.myForm.get('time').value)
  }

  missingChoicesValidator = () => {
    if (this.doctorChosen && this.patientChosen && this.selectedDate !== undefined) {
      console.log(this.selectedDate)
      return null;
    } else {
      return { missingChoices: true };
    }
  }

  runValidator = () => {
    this.myForm.get('time').updateValueAndValidity()
  }
  showdate() {
    console.log(this.selectedDate)
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      doctorFullName: ['', [Validators.required, this.missingChoicesValidator]],
      patientFullName: ['', [Validators.required, this.missingChoicesValidator]],
      time: ['', [Validators.required, this.missingChoicesValidator]]
    });
    this.myForm.valueChanges.subscribe(() => this.searchDoctor())
    this.myForm.valueChanges.subscribe(() => this.searchPatient())

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

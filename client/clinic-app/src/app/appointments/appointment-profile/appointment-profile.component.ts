import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment.model';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { Doctor } from 'src/app/models/doctor.model';
import { Patient } from 'src/app/models/patient.model';
import { MatCalendar } from '@angular/material/datepicker';

@Component({
  selector: 'app-appointment-profile',
  templateUrl: './appointment-profile.component.html',
  styleUrls: ['./appointment-profile.component.scss']
})
export class AppointmentProfileComponent implements OnInit {

  @ViewChild(MatCalendar) calendar: MatCalendar<Date>
  @ViewChild('time', { static: false }) timeInput!: ElementRef<HTMLInputElement>;



  myForm: FormGroup

  selectedDate: Date | null;
  id: string
  appointment: Appointment
  mode: string // /display/ /edit/ /create/

  searchedDoctors: Doctor[] = []
  searchedPatients: Patient[] = []

  patient: Patient //if clicked on a patient profile
  doctor: Doctor  //if clicked on a doctor profile
  patientID: string
  doctorID: string

  patientChosen: boolean = false
  doctorChosen: boolean = false

  success: boolean = false
  loading: boolean = false

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router) { }



  submit(): void {
    if (this.mode === 'create') this.submitCreate()
    else if (this.mode === 'edit') this.submitEdit()
  }
  submitCreate() {
    this.loading = true
    const formValue = this.myForm.value;
    this.selectedDate.setHours(formValue.time.split(':')[0]);
    this.selectedDate.setMinutes(formValue.time.split(':')[1]);

    try {
      const appointment = {
        date: this.selectedDate.toISOString(),
        patient: this.patientID,
        doctor: this.doctorID
      }

      let appID: string

      this.dataService.createNewAppointment(appointment).subscribe(
        (response) => {
          appID = response.data.appointment._id
          this.id = appID;
          this.success = true
        }, (error) => console.log(error))

    } catch (error) {
      console.log('ERROR:--->', error)
    }
    this.loading = false

  }
  submitEdit() {
    this.loading = true
    const formValue = this.myForm.value;
    this.selectedDate.setHours(formValue.time.split(':')[0]);
    this.selectedDate.setMinutes(formValue.time.split(':')[1]);

    try {

      const appointment = {
        date: this.selectedDate.toISOString(),
        patient: this.patientID,
        doctor: this.doctorID
      }

      let appID = this.route.snapshot.params['id']

      this.dataService.editAppointment(appID, appointment).subscribe(
        (response) => {
          this.success = true
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
  }

  missingChoicesValidator = () => {
    if (this.doctorChosen && this.patientChosen && this.selectedDate !== undefined) {
      return null;
    } else {
      return { missingChoices: true };
    }
  }

  runValidator = () => {
    this.myForm.get('time').updateValueAndValidity()
  }

  showNewAppointment() {
    this.updateData()
    this.router.navigate([`appointments/${this.id}`], { queryParams: { mode: 'display' } })
  }

  changeToEditMode() {
    this.success = false
    this.dataService.getAppointmentById(this.id).subscribe(data => {
      this.patient = data.data.appointment.patient
      this.doctor = data.data.appointment.doctor
      this.selectedDate = new Date(data.data.appointment.date)
      console.log(this.selectedDate)
      console.log(typeof this.selectedDate)
      console.log(this.myForm.get('time'))
      this.myForm.get('time').patchValue(this.selectedDate.getHours().toString().padStart(2, '0') + ':' + this.selectedDate.getMinutes().toString().padStart(2, '0'))

      this.choosePatient(this.patient)
      this.chooseDoctor(this.doctor)
      this.mode = 'edit'
      this.router.navigate([], { queryParams: { mode: 'edit' } })
    })
  }


  ngAfterViewInit() {
    if (this.calendar) {
      this.calendar.updateTodaysDate();
    }
  }

  updateData() {
    if (this.mode === 'create' || this.mode === 'edit') {
      const patientID = this.route.snapshot.queryParams['patientID']
      const doctorID = this.route.snapshot.queryParams['doctorID']
      if (patientID) {
        this.dataService.getPatientById(patientID).subscribe(data => {
          const patient = data.data.patient as Patient;
          this.choosePatient(patient)
        })
      }
      else if (doctorID) {
        this.dataService.getDoctorById(doctorID).subscribe(data => {
          const doctor = data.data.doctor as Doctor;
          this.chooseDoctor(doctor)
        })
      }
    }


    if (this.mode === 'display' || this.mode === 'edit') {
      this.dataService.getAppointmentById(this.id).subscribe((data) => {
        this.appointment = data.data.appointment as Appointment
      })
    }
  }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id']
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })

    this.mode = this.route.snapshot.queryParams['mode']
    this.route.queryParams.subscribe((params: Params) => {
      this.mode = params['mode']
    })
    this.myForm = this.fb.group({
      doctorFullName: ['', [Validators.required, this.missingChoicesValidator]],
      patientFullName: ['', [Validators.required, this.missingChoicesValidator]],
      time: ['', [Validators.required, this.missingChoicesValidator]]
    });

    this.myForm.valueChanges.subscribe(() => this.searchDoctor())
    this.myForm.valueChanges.subscribe(() => this.searchPatient())
    this.updateData()


  }
}

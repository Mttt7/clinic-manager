import { query } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/models/patient.model';
import { DataService } from 'src/app/services/data.service';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-edit-patient-form',
  templateUrl: './edit-patient-form.component.html',
  styleUrls: ['./edit-patient-form.component.scss']
})
export class EditPatientFormComponent {

  constructor(private fb: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog) { }


  myForm: FormGroup
  success: boolean = false
  loading: boolean = false

  patient: Patient
  id: string

  submit() {
    this.loading = true;
    const editedPatient = this.myForm.value
    let dateOfBirth = this.myForm.get('dateOfBirth').value

    if (typeof dateOfBirth !== 'string') {
      dateOfBirth = dateOfBirth.toISOString()
    }

    console.log(editedPatient)
    this.dataService.editPatient(this.id, { ...editedPatient, dateOfBirth: dateOfBirth }).subscribe(
      (response) => {
        console.log(response)
        // this.newID = response.data.patient._id
        this.success = true
      },
      (error) => {
        console.log(error)
      }
    )
    this.loading = false;

  }


  seePatient() {
    this.router.navigate([`patients/${this.id}`])
  }

  deletePatient() {
    const dialogData: ConfirmDialogModel = {
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this patient?"
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        // If user clicked yes, proceed with deletion
        this.dataService.getPatientById(this.id).subscribe((data) => {
          console.log("deleting patient", data.data.patient.fullName + "...")
        })
        this.dataService.getPatientAppointment(this.id).subscribe((data) => {
          const appointments = data.data.appointments;
          appointments.forEach((appointmentID) => {
            this.dataService.deleteAppointment(appointmentID).subscribe((data) => { });
          });
        });
        this.dataService.deletePatient(this.id).subscribe((data) => { });
      }
    });
  }


  ngOnInit(): void {
    this.myForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      sex: ['', Validators.required],
      pesel: ['', [Validators.required, Validators.minLength(9)]],
      dateOfBirth: ['', Validators.required],
      city: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
    });

    this.id = this.route.snapshot.params['id']
    this.dataService.getPatientById(this.id).subscribe((data) => {
      this.patient = data.data.patient as Patient;
      this.myForm.get('fullName').setValue(this.patient.fullName)
      this.myForm.get('sex').setValue(this.patient.sex)
      this.myForm.get('pesel').setValue(this.patient.pesel)
      this.myForm.get('dateOfBirth').setValue(this.patient.dateOfBirth)
      this.myForm.get('city').setValue(this.patient.city)
      this.myForm.get('address').setValue(this.patient.address)


    })
  }



}




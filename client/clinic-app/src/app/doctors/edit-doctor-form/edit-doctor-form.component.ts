import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';
import { DataService } from 'src/app/services/data.service';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-doctor-form',
  templateUrl: './edit-doctor-form.component.html',
  styleUrls: ['./edit-doctor-form.component.scss']
})
export class EditDoctorFormComponent {

  constructor(private fb: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog) { }


  myForm: FormGroup
  success: boolean = false
  loading: boolean = false

  doctor: Doctor
  id: string

  submit() {
    this.loading = true;
    const newDoctor = this.myForm.value
    let dateOfBirth = this.myForm.get('dateOfBirth').value
    if (typeof dateOfBirth !== 'string') {
      dateOfBirth = dateOfBirth.toISOString()
    }
    this.dataService.editDoctor(this.id, { ...newDoctor, dateOfBirth: dateOfBirth }).subscribe(
      (response) => {
        console.log(response)
        this.id = response.data.doctor._id
        this.success = true
      },
      (error) => {
        console.log(error)
      }
    )
    this.loading = false;

  }

  seeDoctor() {
    this.router.navigate([`doctors/${this.id}`])
  }

  deleteDoctor() {
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
        this.dataService.getDoctorById(this.id).subscribe((data) => {
          console.log("deleting doctor", data.data.doctor.fullName + "...")
        })
        this.dataService.getDoctorAppointment(this.id).subscribe((data) => {
          const appointments = data.data.appointments;
          appointments.forEach((appointmentID) => {
            this.dataService.deleteAppointment(appointmentID).subscribe((data) => { });
          });
        });
        this.dataService.deleteDoctor(this.id).subscribe((data) => { });
      }
    });
  }



  ngOnInit(): void {
    this.myForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      sex: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      specialization: ['', [Validators.required]],
    });

    this.id = this.route.snapshot.params['id']
    this.dataService.getDoctorById(this.id).subscribe((data) => {
      this.doctor = data.data.doctor as Doctor;
      this.myForm.get('fullName').setValue(this.doctor.fullName)
      this.myForm.get('sex').setValue(this.doctor.sex)
      this.myForm.get('dateOfBirth').setValue(this.doctor.dateOfBirth)
      this.myForm.get('specialization').setValue(this.doctor.specialization)



    })

  }
}

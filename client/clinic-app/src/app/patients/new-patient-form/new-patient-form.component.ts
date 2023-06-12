import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-new-patient-form',
  templateUrl: './new-patient-form.component.html',
  styleUrls: ['./new-patient-form.component.scss']
})
export class NewPatientFormComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private dataService: DataService,
    private router: Router) { }


  myForm: FormGroup
  success: boolean = false
  loading: boolean = false

  newID: string

  submit() {
    this.loading = true;
    const newPatient = this.myForm.value
    const dateOfBirth = this.myForm.get('dateOfBirth').value.toISOString()
    console.log(newPatient)
    this.dataService.createNewPatient({ ...newPatient, dateOfBirth: dateOfBirth }).subscribe(
      (response) => {
        console.log(response)
        this.newID = response.data.patient._id
        this.success = true
      },
      (error) => {
        console.log(error)
      }
    )
    this.loading = false;

  }

  seePatient() {
    this.router.navigate([`patients/${this.newID}`])
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
  }
}



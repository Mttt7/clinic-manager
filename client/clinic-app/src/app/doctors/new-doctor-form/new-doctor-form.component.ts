import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-new-doctor-form',
  templateUrl: './new-doctor-form.component.html',
  styleUrls: ['./new-doctor-form.component.scss']
})
export class NewDoctorFormComponent {

  constructor(private fb: FormBuilder,
    private dataService: DataService,
    private router: Router) { }


  myForm: FormGroup
  success: boolean = false
  loading: boolean = false

  newID: string

  submit() {
    this.loading = true;
    const newDoctor = this.myForm.value
    const dateOfBirth = this.myForm.get('dateOfBirth').value.toISOString()
    console.log(newDoctor)
    this.dataService.createNewDoctor({ ...newDoctor, dateOfBirth: dateOfBirth }).subscribe(
      (response) => {
        console.log(response)
        this.newID = response.data.doctor._id
        this.success = true
      },
      (error) => {
        console.log(error)
      }
    )
    this.loading = false;

  }

  seeDoctor() {
    this.router.navigate([`doctors/${this.newID}`])
  }



  ngOnInit(): void {
    this.myForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      sex: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      specialization: ['', [Validators.required]],
    });
  }
}

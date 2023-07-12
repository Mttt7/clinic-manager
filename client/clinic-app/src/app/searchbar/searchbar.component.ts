import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Patient } from '../models/patient.model';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  myForm: FormGroup;

  searchedPatients: Patient[] = []


  constructor(private fb: FormBuilder,
    private dataService: DataService) { }



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




  ngOnInit(): void {
    this.myForm = this.fb.group({
      search: ['']
    });
  }





}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import { Patient } from '../models/patient.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  patients: Patient[] = []
  patientsCount: number
  patientsFullCount: number
  pageNumber = 1
  isLoading = true

  nextPage = () => {
    if (this.patientsCount !== 0) {
      this.pageNumber++
      this.patients = []
      this.isLoading = true
      this.updateData()
    }


  }
  previousPage = () => {
    if (this.pageNumber > 1) {
      this.pageNumber--
      this.patients = []
      this.isLoading = true
      this.updateData()
    }

  }

  constructor(private dataService: DataService) { }

  updateData() {
    this.dataService.getData(this.pageNumber).subscribe((data) => {
      this.patients = data.data.patients as Patient[];
      this.patientsFullCount = data.data.fullCount
      this.patientsCount = data.data.count
      // console.log(this.patients);
      // console.log(this.patients[4]._id);
      this.isLoading = false
    })


  }


  ngOnInit(): void {
    this.updateData()
  }

}

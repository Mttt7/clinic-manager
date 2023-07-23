import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import { Patient } from '../models/patient.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  patients: Patient[] = []
  patientsCount: number
  patientsFullCount: number
  pageNumber: number = +this.route.snapshot.queryParams['page']
  isLoading = true
  pageMultipler: number = null
  searchString = ''

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router) { }

  nextPage = () => {
    if (this.patientsCount !== 0) {
      this.pageNumber++
      this.patients = []
      this.isLoading = true
      this.updateData(this.searchString)
    }


  }
  previousPage = () => {
    if (this.pageNumber > 1) {
      this.pageNumber--
      this.patients = []
      this.isLoading = true
      this.updateData(this.searchString)
    }

  }

  getIndex(i) {
    return i + (this.pageMultipler * (this.pageNumber - 1))
  }

  handlePatientsNarroved(searchString: string) {
    this.updateData(searchString)
    this.searchString = searchString
  }

  updateData(searchString?: string) {
    if (!searchString) {
      this.dataService.getPatients(this.pageNumber).subscribe((data) => {
        this.patients = data.data.patients as Patient[];
        this.patientsFullCount = data.data.fullCount
        this.patientsCount = data.data.count
        if (!this.pageMultipler) this.pageMultipler = this.patientsCount

        this.isLoading = false
        this.router.navigate([], { queryParams: { page: this.pageNumber } })
      })
    } else {
      this.dataService.searchForPatient(searchString, this.pageNumber).subscribe((data) => {
        this.patients = data.data.patients as Patient[];
        this.patientsFullCount = data.data.searchCount
        this.patientsCount = data.data.count
        if (!this.pageMultipler) this.pageMultipler = this.patientsCount

        this.isLoading = false
        this.router.navigate([], { queryParams: { page: this.pageNumber } })
      })
    }



  }


  ngOnInit(): void {
    this.updateData()
  }

}

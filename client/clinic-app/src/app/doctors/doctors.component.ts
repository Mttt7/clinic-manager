import { Component } from '@angular/core';
import { Doctor } from '../models/doctor.model';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { query } from '@angular/animations';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent {
  doctors: Doctor[] = []
  doctorsCount: number
  doctorsFullCount: number
  pageNumber: number = +this.route.snapshot.queryParams['page']
  isLoading = true
  pageMultipler: number = null
  searchString = ''

  constructor(private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router) { }



  nextPage = () => {
    if (this.doctorsCount !== 0) {
      this.pageNumber++
      this.doctors = []
      this.isLoading = true
      this.updateData(this.searchString)

    }


  }
  previousPage = () => {
    if (this.pageNumber > 1) {
      this.pageNumber--
      this.doctors = []
      this.isLoading = true
      this.updateData(this.searchString)

    }

  }

  handleDoctorsNarroved(searchString: string) {
    this.updateData(searchString)
    this.searchString = searchString
  }

  getIndex(i) {
    return i + (this.pageMultipler * (this.pageNumber - 1))
  }

  updateData(searchString?: string) {
    if (!searchString) {
      this.dataService.getDoctors(this.pageNumber).subscribe((data) => {
        this.doctors = data.data.doctors as Doctor[];
        this.doctorsFullCount = data.data.fullCount
        this.doctorsCount = data.data.count
        this.isLoading = false
        if (!this.pageMultipler) this.pageMultipler = this.doctorsCount

        this.router.navigate([], { queryParams: { page: this.pageNumber } })
      })
    }
    else {
      this.dataService.searchForDoctor(searchString, this.pageNumber).subscribe((data) => {
        this.doctors = data.data.doctors as Doctor[];
        this.doctorsFullCount = data.data.searchCount
        this.doctorsCount = data.data.count
        if (!this.pageMultipler) this.pageMultipler = this.doctorsCount

        this.isLoading = false
        this.router.navigate([], { queryParams: { page: this.pageNumber } })
      })
    }



  }


  ngOnInit(): void {
    this.updateData()

  }


}

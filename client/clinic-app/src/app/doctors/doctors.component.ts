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

  constructor(private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router) { }



  nextPage = () => {
    if (this.doctorsCount !== 0) {
      this.pageNumber++
      this.doctors = []
      this.isLoading = true
      this.updateData()

    }


  }
  previousPage = () => {
    if (this.pageNumber > 1) {
      this.pageNumber--
      this.doctors = []
      this.isLoading = true
      this.updateData()

    }

  }



  updateData() {
    this.dataService.getDoctors(this.pageNumber).subscribe((data) => {
      this.doctors = data.data.doctors as Doctor[];
      this.doctorsFullCount = data.data.fullCount
      this.doctorsCount = data.data.count
      this.isLoading = false
      // this.pageNumber = +this.route.snapshot.queryParams['page']
      // console.log()
      // console.log(this.pageNumber)

      this.router.navigate([], { queryParams: { page: this.pageNumber } })
    })


  }


  ngOnInit(): void {
    this.updateData()

  }


}

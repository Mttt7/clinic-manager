import { Component } from '@angular/core';
import { Appointment } from '../models/appointment.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent {
  appointments: Appointment[] = []
  appointmentsCount: number
  appointmentsFullCount: number
  pageNumber: number = +this.route.snapshot.queryParams['page']
  isLoading = true

  constructor(private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router) { }



  nextPage = () => {
    if (this.appointmentsCount !== 0) {
      this.pageNumber++
      this.appointments = []
      this.isLoading = true
      this.updateData()

    }


  }
  previousPage = () => {
    if (this.pageNumber > 1) {
      this.pageNumber--
      this.appointments = []
      this.isLoading = true
      this.updateData()

    }

  }



  updateData() {
    this.dataService.getAppointments(this.pageNumber).subscribe((data) => {
      this.appointments = data.data.appointments as Appointment[];
      this.appointmentsFullCount = data.data.fullCount
      this.appointmentsCount = data.data.count
      this.isLoading = false
      console.log(this.appointments)

      this.router.navigate([], { queryParams: { page: this.pageNumber } })
    })


  }


  ngOnInit(): void {
    this.updateData()

  }

}

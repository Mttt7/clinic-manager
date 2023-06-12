import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent {

  id: string
  doctor: Doctor
  appointments: string[] = []

  constructor(private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router) { }

  onEditButtonClicked() {
    this.router.navigate([`edit-doctor`, `${this.doctor._id}`])
  }



  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    this.dataService.getDoctorById(this.id).subscribe((data) => {
      this.doctor = data.data.doctor as Doctor

    })
    this.dataService.getDoctorAppointment(this.id).subscribe((data) => {
      this.appointments = data.data.appointments
    })

  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Appointment } from 'src/app/models/appointment.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-appointment-profile',
  templateUrl: './appointment-profile.component.html',
  styleUrls: ['./appointment-profile.component.scss']
})
export class AppointmentProfileComponent implements OnInit {

  id: string
  appointment: Appointment
  constructor(private dataService: DataService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    this.dataService.getAppointmentById(this.id).subscribe((data) => {
      this.appointment = data.data.appointment as Appointment
      console.log(this.appointment)
    })
  }
}

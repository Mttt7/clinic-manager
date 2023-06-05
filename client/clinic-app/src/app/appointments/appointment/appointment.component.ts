import { Component, Input, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent {
  @Input('appointment') id: string
  @Input() fromDoctor: boolean
  @Input() fromPatient: boolean

  appointment: Appointment



  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAppointmentById(this.id).subscribe(data => {
      this.appointment = data.data.appointment as Appointment
    })
  }



}

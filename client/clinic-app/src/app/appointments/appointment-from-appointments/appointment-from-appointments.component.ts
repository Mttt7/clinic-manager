import { Component, Input } from '@angular/core';
import { Appointment } from 'src/app/models/appointment.model';

@Component({
  selector: 'app-appointment-from-appointments',
  templateUrl: './appointment-from-appointments.component.html',
  styleUrls: ['./appointment-from-appointments.component.scss']
})
export class AppointmentFromAppointmentsComponent {

  @Input() appointment: Appointment
  @Input() index: number
}

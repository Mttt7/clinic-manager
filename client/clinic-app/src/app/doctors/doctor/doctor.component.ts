import { Component, Input } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.model';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent {
  @Input() doctor: Doctor
  @Input() index: number


}

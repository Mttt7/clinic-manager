import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-appointment-button',
  templateUrl: './add-appointment-button.component.html',
  styleUrls: ['./add-appointment-button.component.scss']
})
export class AddAppointmentButtonComponent {


  appID: string = '647891053daccbe20796ec51'



  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router) { }




  addAppointment() {
    this.router.navigate([`/appointments/${this.appID}`], { queryParams: { mode: 'create' } })
  }
}

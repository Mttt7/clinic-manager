import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  data: string

  constructor(private dataService: DataService) { }


  ngOnInit(): void {
    this.dataService.getAllPatients().subscribe(res => {
      console.log(res)
      this.data = res
    })
  }



}

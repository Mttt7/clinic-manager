import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Patient } from '../models/patient.model';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  myForm: FormGroup;


  @Output() patientsNarroved = new EventEmitter<string>();

  constructor(private fb: FormBuilder) { }

  emitSearchString() {
    console.log(this.myForm.value.search)
    this.patientsNarroved.emit(this.myForm.value.search)
  }


  ngOnInit(): void {
    this.myForm = this.fb.group({
      search: ['']
    });
    this.myForm.valueChanges.subscribe(() => this.emitSearchString())
  }







}
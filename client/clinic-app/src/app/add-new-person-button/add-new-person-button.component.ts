import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-new-person-button',
  templateUrl: './add-new-person-button.component.html',
  styleUrls: ['./add-new-person-button.component.scss']
})
export class AddNewPersonButtonComponent {

  @Input() mode: string

}

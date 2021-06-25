import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchForm = new FormGroup({
    colors: new FormArray([
      new FormControl('Red'),
      new FormControl('Blue'),
      new FormControl('White'),
      new FormControl('Black'),
      new FormControl('Green')
    ]),
    timesUsed: new FormControl(''),
    timesWon: new FormControl(''),
    timesLost: new FormControl(''),
    winningPercentage: new FormControl('')
  });

}

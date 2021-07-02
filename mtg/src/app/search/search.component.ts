import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup;

  ngOnInit() {
    this.searchForm = new FormGroup({
      timesUsed: new FormControl(''),
      timesWon: new FormControl(''),
      timesLost: new FormControl(''),
      colors: new FormArray([
        new FormControl('Red'),
        new FormControl('Blue'),
        new FormControl('Green'),
        new FormControl('Black'),
        new FormControl('White')
      ]),
      winningPercentage: new FormControl('')
    })
  }

  onSearch(form: FormGroup) {
      console.log("Searching with values...");
      console.log("Times Used:", form.value.timesUsed);
      console.log("Times Won:", form.value.timesWon);
      console.log("Times Lost:", form.value.timesLost);
      console.log("Colors Included:", form.value.colorsSelection);
  }

  get colors() {
    return this.searchForm.get('colors') as FormArray;
  }

}

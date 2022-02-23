import { Component, OnInit } from '@angular/core';

import { Person } from './../../models/person';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  people: Person[] = [
    new Person('Nicolas', 'Molina', 28, 68, 1.70),
    new Person('Valentina', 'Molina', 13, 40, 1.60),
  ];
  selectedPerson!: Person;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(person: Person){
    this.selectedPerson = person;
  }

}

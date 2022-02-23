import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Person } from './../../models/person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  @Input() person!: Person;
  @Output() onSelected = new EventEmitter<Person>();
  imc = '';

  constructor() { }

  ngOnInit(): void {
  }

  calcIMC() {
    this.imc = this.person.calcIMC();
  }

  onClick() {
    this.onSelected.emit(this.person);
  }

}

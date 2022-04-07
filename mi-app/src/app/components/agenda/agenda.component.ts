import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona.model';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  personas: Array<Persona> = [];
  displayedColumns: Array<string> = [];

  constructor( private utilities: UtilitiesService) { }

  ngOnInit(): void {
    this.personas = this.utilities.getPersonas()
    this.displayedColumns = ['position', 'name', 'dni'];

  }

  getIndex(element: Persona): number {
    return this.personas.indexOf(element);
  }

  

}

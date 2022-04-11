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
    this.displayedColumns = ['position', 'name', 'dni', 'accion'];

  }

  getIndex(element: Persona): number {
    return this.personas.indexOf(element);
  }

  editPersona(p: Persona): void {
    // TODO
    console.log(p)
  }

  removePersona(p: Persona): void {
    // TODO
    let indexToRemove: number = this.getIndex(p);
    this.personas = this.personas.splice(indexToRemove,1);
  }

  

}

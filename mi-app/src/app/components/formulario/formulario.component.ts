import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Persona } from 'src/app/models/persona.model';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  formulario: FormGroup = new FormGroup({});

  constructor(private utilities: UtilitiesService) { }

  ngOnInit(): void {
    this.createForm();
  }

  addPersona(value: any): void {
    let persona: Persona = new Persona(value.sexo, value.name, value.apellidos, value.cumple, value.dni, value.color )
    this.utilities.addPersonas(persona);
  }

  createForm(): void {

    this.formulario = new FormGroup({name: new FormControl(), 
                                    dni: new FormControl(),
                                    apellidos: new FormControl(),
                                    color: new FormControl(), 
                                    sexo: new FormControl(),
                                    cumple: new FormControl()});

  }

}

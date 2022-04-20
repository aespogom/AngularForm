import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, Input, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Persona } from 'src/app/models/persona.model';
import { UtilitiesService } from 'src/app/services/utilities.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  @Input('fillPersona') fillPersona: Persona | undefined;

  formulario: FormGroup = new FormGroup({});
  name: FormControl;
  apellidos: FormControl;
  dni: FormControl;
  cumple: FormControl;
  sexo: FormControl;
  color: FormControl;

  maxDate: Date = new Date();
  minDate: Date = new Date();

  constructor(private utilities: UtilitiesService,
              public dialog: MatDialog) { 
    
    let year = this.minDate.getFullYear() - 125;
    this.minDate = new Date(year, 1, 1);

    this.name = new FormControl('', [Validators.required, Validators.minLength(3)]) 
    this.dni= new FormControl('', [Validators.required, Validators.pattern('[0-9]+[A-Z]?'), Validators.minLength(9), Validators.maxLength(9)])
    this.apellidos= new FormControl('', [Validators.required, Validators.minLength(3)])
    this.color= new FormControl('', [Validators.required, Validators.minLength(3)]) 
    this.sexo= new FormControl('', [Validators.required])
    this.cumple= new FormControl('', [Validators.required])
    this.formulario = new FormGroup({'name': this.name, 'dni': this.dni, 'apellidos': this.apellidos, 'color': this.color, 'sexo': this.sexo, 'colorFav': this.color, 'cumple': this.cumple});
  
  }

  ngOnInit(): void {
    if (this.fillPersona) {
      this.name.setValue(this.fillPersona.nombre);
      this.dni.setValue(this.fillPersona.dni);
      this.dni.disable();
      this.apellidos.setValue(this.fillPersona.apellidos.toString());
      this.color.setValue(this.fillPersona.color_favorito);
      this.sexo.setValue(this.fillPersona.sexo);
      this.cumple.setValue(this.fillPersona.cumpleaños);

    }
  }

  addPersona(): void {
    let apellidosArray: Array<string> = this.apellidos.value.split(' ');
    let cumpleaños: Date = new Date(this.cumple.value);
    let persona: Persona = new Persona(this.sexo.value, this.name.value, apellidosArray, cumpleaños, this.dni.value, this.color.value )
    
    const found_P: Persona | undefined = this.utilities.getPersonas().find((p: Persona) => 
      p.dni ==this.dni.value
    );
    if (found_P) {
      let index_found: number = this.utilities.getPersonas().indexOf(found_P);
      this.utilities.editPersona(index_found, persona);
      this.dialog.closeAll();
    } else {
      this.utilities.addPersonas(persona);
      this.createNewForm();
    } 
  }

  createNewForm() : void {
    this.formulario.reset();
    console.log('reincio')
  }

}

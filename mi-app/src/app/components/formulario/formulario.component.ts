import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
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

  formulario: FormGroup = new FormGroup({});
  matcher = new MyErrorStateMatcher();

  name: FormControl;
  apellidos: FormControl;
  dni: FormControl;
  cumple: FormControl;
  sexo: FormControl;
  color: FormControl;

  maxDate: Date = new Date();
  minDate: Date = new Date();

  constructor(private utilities: UtilitiesService) { 
    
    let year = this.minDate.getFullYear() - 125;
    this.minDate = new Date(year, 1, 1);

    this.name = new FormControl('', [Validators.required, Validators.minLength(3)]) 
    this.dni= new FormControl('', [Validators.required, Validators.pattern('[0-9]+[A-Z]?'), Validators.minLength(9), Validators.maxLength(9)])
    this.apellidos= new FormControl('', [Validators.required, Validators.minLength(3)])
    this.color= new FormControl('', [Validators.required, Validators.minLength(3)]) 
    this.sexo= new FormControl('', [Validators.required])
    // TODO
    this.cumple= new FormControl('', [Validators.required])
    this.formulario = new FormGroup({'name': this.name, 'dni': this.dni, 'apellidos': this.apellidos, 'color': this.color, 'sexo': this.sexo, 'colorFav': this.color, 'cumple': this.cumple});
  
  }

  ngOnInit(): void {
    
  }

  addPersona(): void {
    let apellidosArray: Array<string> = this.apellidos.value.split(' ');
    let cumpleaños: Date = new Date(this.cumple.value)
    let persona: Persona = new Persona(this.sexo.value, this.name.value, apellidosArray, cumpleaños, this.dni.value, this.color.value )
    this.utilities.addPersonas(persona);
    this.createNewForm();
    
  }

  

  getErrorMessage(name: string): any {
    // if (name == 'name') {
    //     return this.name.hasError('required') ? 'Debe introducir un valor' :
    //       this.name.hasError('name') ? 'No es válido' :
    //           '';
    // } else if (name=='apellidos') {
    //     return this.apellidos.hasError('required') ? 'Debe introducir un valor' :
    //       this.apellidos.hasError('name') ? 'No es válido' :
    //           '';

    // } else if (name=='dni') {
    //   return this.dni.hasError('required') ? 'Debe introducir un valor' :
    //     this.dni.hasError('name') ? 'No es válido: 8 números y 1 letra' :
    //         '';

    // }  else if (name=='sexo') {
    //   return this.sexo.hasError('required') ? 'Debe introducir un valor' :
    //     this.sexo.hasError('name') ? 'No es válido' :
    //         '';

    // } else if (name=='cumple') {
    //   return this.cumple.hasError('required') ? 'Debe introducir un valor' :
    //     this.cumple.hasError('name') ? 'No es válido' :
    //         '';

    // } else if (name=='color') {
    //   return this.color.hasError('required') ? 'Debe introducir un valor' :
    //     this.color.hasError('name') ? 'No es válido' :
    //         '';

    // } 
  }

  createNewForm() : void {
    // TODO
    this.formulario.reset();
    Object.keys(this.formulario.controls).forEach(key => {
      this.formulario.controls[key].markAsUntouched();
      this.formulario.controls[key].markAsPristine();
    });
    //this.formulario = new FormGroup({'name': this.name, 'dni': this.dni, 'apellidos': this.apellidos, 'color': this.color, 'sexo': this.sexo, 'colorFav': this.color, 'cumple': this.cumple});
    
  }

}

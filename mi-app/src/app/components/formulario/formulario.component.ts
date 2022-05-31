import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, Input, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Socio } from 'src/app/models/socio.model';
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

  @Input('fillSocio') fillSocio: Socio | undefined;

  formulario: FormGroup = new FormGroup({});
  name: FormControl;
  apellidos: FormControl;
  dni: FormControl;
  telefono: FormControl;
  sexo: FormControl;
  num_socio: FormControl;

  constructor(private utilities: UtilitiesService,
              public dialog: MatDialog) { 
    
    this.name = new FormControl('', [Validators.required, Validators.minLength(3)]) 
    this.dni= new FormControl('', [Validators.required, Validators.pattern('[0-9]+[A-Z]?'), Validators.minLength(9), Validators.maxLength(9)])
    this.apellidos= new FormControl('', [Validators.required, Validators.minLength(3)])
    this.num_socio= new FormControl('', [Validators.required]) 
    this.num_socio.setValue(UtilitiesService.getRandomNumber(999999,100000));
    this.num_socio.disable()
    this.sexo = new FormControl('', [Validators.required])
    this.telefono= new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)])
    this.formulario = new FormGroup({'name': this.name, 'dni': this.dni, 'apellidos': this.apellidos, 'num_socio': this.num_socio, 'sexo': this.sexo, 'telefono': this.telefono});
  
  }

  ngOnInit(): void {
    if (this.fillSocio) {
      this.name.setValue(this.fillSocio.nombre);
      this.dni.setValue(this.fillSocio.dni);
      this.dni.disable();
      this.apellidos.setValue(this.fillSocio.apellidos.toString());
      this.sexo.setValue(this.fillSocio.sexo);
      this.num_socio.setValue(this.fillSocio.socio);
      this.num_socio.disable();
      this.telefono.setValue(this.fillSocio.telefono);
    }
  }

  addSocio(): void {
    let apellidosArray: Array<string> = this.apellidos.value.split(' ');
    let socio: Socio = new Socio(this.sexo.value, this.name.value, apellidosArray, this.dni.value, this.num_socio.value, this.telefono.value )
    
    const found_S: Socio | undefined = this.utilities.getSocios().find((s: Socio) => 
      s.dni ==this.dni.value || s.socio == this.num_socio.value
    );
    if (found_S) {
      let index_found: number = this.utilities.getSocios().indexOf(found_S);
      this.utilities.editSocio(index_found, socio);
      this.dialog.closeAll();
    } else {
      this.utilities.addSocios(socio);
      this.createNewForm();
    } 
  }

  createNewForm() : void {
    this.formulario.reset();
    console.log('reinicio')
  }

}

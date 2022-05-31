import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormularioComponent } from './components/formulario/formulario.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { ModalComponent } from './shared/modal/modal.component';

// Angular material
import { AngularMaterialModule } from "./modules/angular-material/angular-material.module";
import { MAT_DATE_LOCALE, DateAdapter, MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    AgendaComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MatNativeDateModule,
            { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
            ],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }

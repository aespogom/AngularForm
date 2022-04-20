import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Persona } from 'src/app/models/persona.model';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  personas: Array<Persona> = [];
  displayedColumns: Array<string> = [];

  constructor(private utilities: UtilitiesService,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.personas = this.utilities.getPersonas()
    this.displayedColumns = ['position', 'name', 'dni', 'accion'];

  }

  getIndex(element: Persona): number {
    return this.personas.indexOf(element);
  }

  editPersona(p: Persona): void {
    console.log(p);
    const modal_edit = this.dialog.open(ModalComponent, {width: '70%', data: p})
    modal_edit.afterClosed().subscribe(res => {
      this.refreshTable();
    });
  }

  removePersona(p: Persona): void {
    let indexToRemove: number = this.getIndex(p);
    this.utilities.removePersonas(indexToRemove);
    this.refreshTable();
  }

  refreshTable(): void {
    this.personas = [...this.utilities.getPersonas()];
  }

  

}

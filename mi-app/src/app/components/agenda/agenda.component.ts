import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Socio } from 'src/app/models/socio.model';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  socios: Array<Socio> = [];
  displayedColumns: Array<string> = [];

  constructor(private utilities: UtilitiesService,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.socios = this.utilities.getSocios()
    this.displayedColumns = ['socio', 'name', 'dni', 'accion'];

  }

  getIndex(element: Socio): number {
    return this.socios.indexOf(element);
  }

  editSocio(p: Socio): void {
    console.log(p);
    const modal_edit = this.dialog.open(ModalComponent, {width: '70%', data: p})
    modal_edit.afterClosed().subscribe(res => {
      this.refreshTable();
    });
  }

  removeSocio(p: Socio): void {
    let indexToRemove: number = this.getIndex(p);
    this.utilities.removeSocios(indexToRemove);
    this.refreshTable();
  }

  refreshTable(): void {
    this.socios = [...this.utilities.getSocios()];
  }

  

}

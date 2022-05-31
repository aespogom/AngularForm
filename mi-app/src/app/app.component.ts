import { Component, OnInit } from '@angular/core';
import { Socio } from './models/socio.model'
import { UtilitiesService } from './services/utilities.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'mi-app';

  constructor( private utilities: UtilitiesService) {

    
   }

  ngOnInit(): void {
    for (let i=0; i<4; i++){
      let new_socio: Socio = UtilitiesService.getRandomSocio(); 
      // Asegura que el numero de socio es unico
      while (this.utilities.foundNumSocio(new_socio)){
        new_socio = UtilitiesService.getRandomSocio(); 
      }
      this.utilities.addSocios(new_socio)
    }

  }
}

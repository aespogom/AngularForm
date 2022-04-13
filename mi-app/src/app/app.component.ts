import { Component, OnInit } from '@angular/core';
import { Persona } from './models/persona.model';
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
      let new_persona: Persona = UtilitiesService.getRandomPersona(); 
      this.utilities.addPersonas(new_persona)
    }

  }
}

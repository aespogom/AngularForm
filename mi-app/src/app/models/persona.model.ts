// ANA ESPONERA GOMEZ PRACTICA TYPESCRIPT 2022

import { NAMES } from "../constants/names";
import { COLORES } from "../constants/colores";
import { UtilitiesService } from "../services/utilities.service";


export class Persona {
    
    nombre: string;
    apellidos: Array<string>;
    edad: number;
    dni: string;
    cumpleaños: Date;
    color_favorito: string;
    sexo: string;

    constructor(sexo: string, name: string, apellidos: Array<string>, cumple: Date,
                dni: string, color: string){

        this.sexo = sexo;
        this.nombre = name;
        this.apellidos = [];
        for (let i: number = 0; i < apellidos.length; i++ ) {
            this.apellidos[i] = apellidos[i];
        }
        this.cumpleaños = cumple;
        this.edad = new Date().getFullYear() - this.cumpleaños.getFullYear();
        this.dni = dni;
        this.color_favorito = color;
    }

    getRandomPersona(): void {
        this.sexo = UtilitiesService.getRandomGender();
        this.nombre = NAMES[this.sexo][UtilitiesService.getRandomNumber(95)];
        this.apellidos = [];
        for (let i: number = 0; i < 2; i++ ) {
            this.apellidos[i] = NAMES['apellidos'][UtilitiesService.getRandomNumber(97)];
        }
        this.cumpleaños = UtilitiesService.getRandomFecha();
        this.edad = new Date().getFullYear() - this.cumpleaños.getFullYear();
        this.dni = UtilitiesService.getRandomNumber(99999999,10000000).toString() + UtilitiesService.getRandomString(1);
        this.color_favorito = COLORES[UtilitiesService.getRandomNumber(36)];
    }
    
}
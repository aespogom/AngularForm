import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { COLORES } from '../constants/colores';
import { NAMES } from '../constants/names';
// import * as readline from 'readline';
// import { stdin as input, stdout as output } from 'node:process';
import { TIPOS } from '../constants/tipos';
import { Socio } from '../models/socio.model';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

    private _socios: Array<Socio> = [];
  
    constructor() { }
    
    /**
     * Función que devuelve una cadena de caracteres de longitud "length"
     * @param length longitud de la cadena a devolver
     * @returns cadena de caracteres aleatoria
     */
    static getRandomString(length: number): string {
        var randomChars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var result: string = '';
        for ( var i: number = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }
    
    /**
     * Función que devuelve un numero aleatorio entre min y max
     * @param max numero maximo
     * @param min numero minimo
     * @returns 
     */
    static getRandomNumber(max: number, min: number = 0): number {
        let numero: number = Math.floor(Math.random() * (max - min + 1)) + min;
        return numero;
    }

    /**
     * Función que devuelve una fecha aleatoria entre 1970 y 1990
     * @returns 
     */
    static getRandomFecha(): Date {
        let start: number = Date.parse('1970-01-01');
        let end: number = Date.parse('1990-01-01');
        var date: Date = new Date(Math.floor(Math.random() * (end - start + 1) + start))
        return date;
    }
    
    /**
     * Función que devuelve el género de una persona aleatoriamente
     * @returns 
     */
    static getRandomGender(): string {
        const genders: Array<string> = ['femenino', 'masculino'];
        let index: number = Math.round(Math.random());
        return genders[index]
    }

    /**
     * Función que devuelve un tipo aleatorio
     * @param key clave que identifica en que diccionario consultar
     * @returns 
     */
    static getRandomTipo(key: string): string {
        let max: number = TIPOS[key].length
        let index: number = Math.floor(Math.random() * (max ));
        return TIPOS[key][index]
    }
 
    addSocios(s: Socio): void {
        this._socios.push(s);
    }

    getSocios(): Array<Socio> {
        return this._socios;
    }

    editSocio(index: number, s: Socio): void {
        this.removeSocios(index);
        this.addSocios(s);
    }

    removeSocios(index_remove: number): void {
        this._socios.splice(index_remove,1);
    }

    foundNumSocio(s: Socio): Boolean {
        let socios: Array<Socio> = this.getSocios();
        if (socios.filter(e => e.socio === s.socio).length > 0){
            return true
        } else {
            return false
        }

    }

    static getRandomSocio(): Socio {
        let sexo = UtilitiesService.getRandomGender();
        let nombre = NAMES[sexo][UtilitiesService.getRandomNumber(95)];
        let apellidos = [];
        for (let i: number = 0; i < 2; i++ ) {
            apellidos[i] = NAMES['apellidos'][UtilitiesService.getRandomNumber(97)];
        }
        let num_socio: number = UtilitiesService.getRandomNumber(999999,100000);      
        let telefono: number = UtilitiesService.getRandomNumber(999999999,6000000);
        let dni = UtilitiesService.getRandomNumber(99999999,10000000).toString() + UtilitiesService.getRandomString(1);
        let socioOutput: Socio = new Socio(sexo,nombre,apellidos,dni,num_socio,telefono);
        return socioOutput
    }




    // static getRandomPersona(): Persona {
    //     let sexo = UtilitiesService.getRandomGender();
    //     let nombre = NAMES[sexo][UtilitiesService.getRandomNumber(95)];
    //     let apellidos = [];
    //     for (let i: number = 0; i < 2; i++ ) {
    //         apellidos[i] = NAMES['apellidos'][UtilitiesService.getRandomNumber(97)];
    //     }
    //     let cumpleaños = UtilitiesService.getRandomFecha();
    //     let edad = new Date().getFullYear() - cumpleaños.getFullYear();
    //     let dni = UtilitiesService.getRandomNumber(99999999,10000000).toString() + UtilitiesService.getRandomString(1);
    //     let color_favorito = COLORES[UtilitiesService.getRandomNumber(36)];
    //     let personaOutput: Persona = new Persona(sexo,nombre,apellidos,cumpleaños,dni,color_favorito);
    //     return personaOutput
    // }

    // addPersonas(p: Persona): void {
    //     this._personas.push(p);
    // }

    // getPersonas(): Array<Persona> {
    //     return this._personas;
    // }

    // editPersona(index: number, p: Persona): void {
    //     this.removePersonas(index);
    //     this.addPersonas(p);
    // }

    // removePersonas(index_remove: number): void {
    //     this._personas.splice(index_remove,1);
    // }

    

}

import { Injectable } from '@angular/core';
// import * as readline from 'readline';
// import { stdin as input, stdout as output } from 'node:process';
// import { Persona } from '../models/persona.model';
import { TIPOS } from '../constants/tipos';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

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

  // /**
  //  * Función que modifica la dirección, telefono e email de una persona basado en su DNI
  //  * @param personas array de personas 
  //  */
  // static async search_by_DNI(personas: Array<Persona>): Promise<void> {
  //     let rl: readline.Interface = readline.createInterface({
  //         input, output
  //     });
  //     let DNI_search: string;
  //     console.log("Introduzca el DNI de la persona a modificar: ")
  
  //     await rl.question("", (answer: string) => {
  //         DNI_search = answer;
  //         let persona_a_modificar: Persona | undefined = personas.find(p => p.dni == DNI_search);
  //         if (persona_a_modificar){
  //             console.log('Encontrado. Modificando el contacto...');
  //             personas.splice(personas.indexOf(persona_a_modificar), 1);
  //             let persona_editada: Persona = persona_a_modificar.modify_p_by_DNI();
  //             personas.push(persona_editada);
  //             personas.forEach((p: Persona, index: number) => {
  //                 console.log('Persona número ', index+1 , p)
  //             });
  //             rl.close();
              
  //         } else {
  //             console.log('El DNI no corresponde a ninguna persona, inténtelo de nuevo.');
  //             rl.close();
  //             Utilities.search_by_DNI(personas);
  //         }
  //     });
  // };

}

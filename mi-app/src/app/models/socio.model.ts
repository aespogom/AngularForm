// ANA ESPONERA GOMEZ PRACTICA TYPESCRIPT 2022
export class Socio {
    
    nombre: string;
    apellidos: Array<string>;
    socio: number;
    dni: string;
    telefono: number;
    sexo: string;

    constructor(sexo: string, name: string, apellidos: Array<string>,
                dni: string, socio: number, telefono: number){

        this.sexo = sexo;
        this.nombre = name;
        this.apellidos = [];
        for (let i: number = 0; i < apellidos.length; i++ ) {
            this.apellidos[i] = apellidos[i];
        }
        this.dni = dni;
        this.socio = socio;
        this.telefono = telefono;
    }

    
    
}
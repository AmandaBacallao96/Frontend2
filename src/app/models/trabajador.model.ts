export class Trabajador {
    dni: string;
    nombre: string;
    direccion: string;
    numeroTelefono: string;
    cif: string;
  
    constructor(dni: string, nombre: string, direccion: string, numeroTelefono: string, cif: string) {
      this.dni = dni;
      this.nombre = nombre;
      this.direccion = direccion;
      this.numeroTelefono = numeroTelefono;
      this.cif = cif;
    }
  }
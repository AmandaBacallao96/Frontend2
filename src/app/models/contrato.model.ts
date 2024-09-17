export class Contrato {
    id_contrato: string;
    precio: number;
    estado: string;
    dni: string;
  
    constructor(id_contrato: string, precio: number, estado: string, dni: string) {
      this.id_contrato = id_contrato;
      this.precio = precio;
      this.estado = estado;
      this.dni = dni;
    }
  }
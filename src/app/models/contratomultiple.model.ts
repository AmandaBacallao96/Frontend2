export class ContratoMultiple {
    id_contrato_multiple: string;
    fecha_cobro: Date;
    id_contrato: string;
  
    constructor(id_contrato_multiple: string, fecha_cobro: Date, id_contrato: string) {
      this.id_contrato_multiple = id_contrato_multiple;
      this.fecha_cobro = fecha_cobro;
      this.id_contrato = id_contrato;
    }
  }

  export class ContratoMultipleFull {
    id_contrato: string;
    precio: number;
    estado: string;
    dni: string;
    fecha: Date;  // Campo de ContratoMultiple
    id_contrato_multiple: string;

    constructor(id_contrato: string, precio: number, estado: string, dni: string, fecha: Date,id_contrato_multiple: string) {
      this.id_contrato = id_contrato;
      this.precio = precio;
      this.estado = estado;
      this.dni = dni;
      this.fecha = fecha;
      this.id_contrato_multiple=id_contrato_multiple;
    }
  }
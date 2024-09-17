import { Servicio } from "./servicio.model";

export class Contrata {
    fecha: Date;
    id_servicio: string;
    cif: string;
  
    constructor(fecha: Date, id_servicio: string, cif: string) {
      this.fecha = fecha;
      this.id_servicio = id_servicio;
      this.cif = cif;
    }
  }

  export class ContrataFull {
    fecha: Date;
    servicio: Servicio;
    cif: any;
  
    constructor(fecha: Date, servicio: Servicio, cif: any) {
      this.fecha = fecha;
      this.servicio = servicio;
      this.cif = cif;
    }
  }
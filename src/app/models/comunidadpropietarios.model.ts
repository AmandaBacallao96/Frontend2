export class ComunidadPropietarios {
    id_comunidad: string;
    nombre_fiscal: string;
    cif: string;
  
    constructor(id_comunidad: string, nombre_fiscal: string, cif: string) {
      this.id_comunidad = id_comunidad;
      this.nombre_fiscal = nombre_fiscal;
      this.cif = cif;
    }
  }
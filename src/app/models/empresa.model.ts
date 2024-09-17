export class Empresa {
    id_empresa: string;
    representante_legal: string;
    dni_representante_legal: string;
    sector: string;
    actividad: string;
    cnae: string;
    numero_trabajadores: number;
    cif: string;
  
    constructor(id_empresa: string, representante_legal: string, dni_representante_legal: string, sector: string, actividad: string, cnae: string, numero_trabajadores: number, cif: string) {
      this.id_empresa = id_empresa;
      this.representante_legal = representante_legal;
      this.dni_representante_legal = dni_representante_legal;
      this.sector = sector;
      this.actividad = actividad;
      this.cnae = cnae;
      this.numero_trabajadores = numero_trabajadores;
      this.cif = cif;
    }
  }
export class Factura {
    codigo_factura: number;
    iva: number;
    pagado: boolean;
    irpf: number;
    re: number;
    rectificativa: boolean;
    dni: string;
  
    constructor(codigo_factura: number, iva: number, pagado: boolean, irpf: number, re: number, rectificativa: boolean, dni: string) {
      this.codigo_factura = codigo_factura;
      this.iva = iva;
      this.pagado = pagado;
      this.irpf = irpf;
      this.re = re;
      this.rectificativa = rectificativa;
      this.dni = dni;
    }
  }
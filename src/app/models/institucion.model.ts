export class Institucion {
    cif: string;
    nombre: string;
    direccion: string;
    codigo_postal: string;
    provincia: string;
    telefono: string;
    correo: string;
    poblacion: string;
    numero_cuenta_corriente: string;
    dni: string;
  
    constructor(cif: string, nombre: string, direccion: string, codigo_postal: string, provincia: string, telefono: string, correo: string, poblacion: string, numero_cuenta_corriente: string, dni: string) {
      this.cif = cif;
      this.nombre = nombre;
      this.direccion = direccion;
      this.codigo_postal = codigo_postal;
      this.provincia = provincia;
      this.telefono = telefono;
      this.correo = correo;
      this.poblacion = poblacion;
      this.numero_cuenta_corriente = numero_cuenta_corriente;
      this.dni = dni;
    }
  }
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionService {

  private apiUrl = 'http://localhost:8000/api/'; // URL de tu API en Laravel

  constructor(private http: HttpClient) { }

  // Método genérico para obtener todos los registros de un modelo
  getAll(modelo: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${modelo}`);
  }

  // Método genérico para obtener un registro por ID
  getById(modelo: string, id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${modelo}/${id}`);
  }

  // Método genérico para crear un nuevo registro
  create(modelo: string, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.post<any>(`${this.apiUrl}${modelo}`, data);
  }

  // Método genérico para actualizar un registro
  update(modelo: string, id: string, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.put<any>(`${this.apiUrl}${modelo}/${id}`, data);
  }

  // Método genérico para eliminar un registro
  delete(modelo: string, id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.delete<any>(`${this.apiUrl}${modelo}/${id}`);
  }
}
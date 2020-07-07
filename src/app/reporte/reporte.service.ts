import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import Lang from '../../assets/app.lang.json';
import { Observable } from 'rxjs';
import { Evolucion } from '../evolucion/evolucion.js';

@Injectable({
  providedIn: 'root'
})

export class ReporteService {

  private urlEndPoint: string = Lang.urlEndPoint.reporte;
  //private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private httpHeaders = new HttpHeaders({ 'responseType': 'blob' });

  constructor(private http: HttpClient) { }

  getReporteTema(idPersona: number, idTema: number): Observable<Blob> {
    return this.http.get(`${this.urlEndPoint}/reporteTema/${idPersona}/${idTema}`, { responseType: 'blob' })
  }

  getReporteEvolucion(idPersona: number, idTema: number): Observable<Blob> {
    return this.http.get(`${this.urlEndPoint}/reporteEvolucion/${idPersona}/${idTema}`, { responseType: 'blob' })
    //return this.http.post<Blob>(`${this.urlEndPoint}/reporteEvolucion/${idPersona}/${idTema}`, {}, {headers: this.httpHeaders})
  }

  getReporteHito(idPersona: number, idTema: number): Observable<Blob> {
    return this.http.get(`${this.urlEndPoint}/reporteHito/${idPersona}/${idTema}`, { responseType: 'blob' })
  }
  
}

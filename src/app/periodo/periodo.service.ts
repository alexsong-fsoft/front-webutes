import { Injectable } from '@angular/core';
import { Periodo } from './periodo';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Lang from '../../assets/app.lang.json';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

  private urlEndPoint: string = Lang.urlEndPoint.periodo;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  create(periodotipo: Periodo) : Observable<Boolean> {
    return this.http.post<Boolean>(`${this.urlEndPoint}/create`, periodotipo, {headers: this.httpHeaders})
  }

  update(periodotipo: Periodo): Observable<Periodo>{
    return this.http.post<Periodo>(`${this.urlEndPoint}/update`, periodotipo, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Periodo>{
    return this.http.delete<Periodo>(`${this.urlEndPoint}/delete/${id}`, {headers: this.httpHeaders})
  }

  getAll(): Observable<Periodo[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerListadoPeriodoActivo`).pipe(
      map( response => response as Periodo[] )
    );
  }

  getById(id: number): Observable<Periodo>{
    return this.http.get<Periodo>(`${this.urlEndPoint}/obtenerPeriodoPorId/${id}`)
  }

  getAll2(): Observable<Periodo[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerListadoPeriodo`).pipe(
      map( response => response as Periodo[] )
    );
  }

  getAllByNumero(numero: number): Observable<Periodo[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerListadoPeriodobyNumero/${numero}`).pipe(
      map( response => response as Periodo[] )
    );
  }

  getUltimoRegistroPeriodo(): Observable<number>{
    return this.http.get<number>(`${this.urlEndPoint}/obtenerUltimoRegistroPeriodo`)
  }

  getByIdActivo(idperiodo: number): Observable<Periodo>{
    return this.http.get<Periodo>(`${this.urlEndPoint}/obtenerPeriodoPorIdActivo/${idperiodo}`)
  }
}


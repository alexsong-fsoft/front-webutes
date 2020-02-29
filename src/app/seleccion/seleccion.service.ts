import { Injectable } from '@angular/core';
import { Seleccion } from './seleccion';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Lang from '../../assets/app.lang.json';

@Injectable({
  providedIn: 'root'
})
export class SeleccionService {

  private urlEndPoint: string = Lang.urlEndPoint.seleccion;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  create(selecciontipo: Seleccion) : Observable<Boolean> {
    return this.http.post<Boolean>(`${this.urlEndPoint}/create`, selecciontipo, {headers: this.httpHeaders})
  }

  update(selecciontipo: Seleccion): Observable<Seleccion>{
    return this.http.post<Seleccion>(`${this.urlEndPoint}/update`, selecciontipo, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Seleccion>{
    return this.http.delete<Seleccion>(`${this.urlEndPoint}/delete/${id}`, {headers: this.httpHeaders})
  }

  getAll(): Observable<Seleccion[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerListadoSeleccion`).pipe(
      map( response => response as Seleccion[] )
    );
  }

  getById(id: number): Observable<Seleccion>{
    return this.http.get<Seleccion>(`${this.urlEndPoint}/obtenerSeleccion/${id}`)
  }

  getAllByIdPeriodo(fkperiodo: number): Observable<Seleccion[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerListadoPeriodo/${fkperiodo}`).pipe(
      map( response => response as Seleccion[] )
    );
  }

  getByPerioNumIdPersona(periodonum: number, fkpersona: number): Observable<Seleccion>{
    return this.http.get<Seleccion>(`${this.urlEndPoint}/obtenerSeleccionPorPeriodoPersona/${periodonum}/${fkpersona}`)
  }

  getByIdPeriodoIdPersona(idperiodo: number, fkpersona: number): Observable<Seleccion>{
    return this.http.get<Seleccion>(`${this.urlEndPoint}/obtenerSeleccionPorIdPeriodoPersona/${idperiodo}/${fkpersona}`)
  }

}

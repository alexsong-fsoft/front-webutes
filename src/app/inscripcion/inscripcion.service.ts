import { Injectable } from '@angular/core';
import { Inscripcion } from './inscripcion';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Lang from '../../assets/app.lang.json';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {

  private urlEndPoint: string = Lang.urlEndPoint.inscripcion;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  create(inscripciontipo: Inscripcion) : Observable<Boolean> {
    return this.http.post<Boolean>(`${this.urlEndPoint}/create`, inscripciontipo, {headers: this.httpHeaders})
  }

  update(inscripciontipo: Inscripcion): Observable<Inscripcion>{
    return this.http.post<Inscripcion>(`${this.urlEndPoint}/update`, inscripciontipo, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Inscripcion>{
    return this.http.delete<Inscripcion>(`${this.urlEndPoint}/delete/${id}`, {headers: this.httpHeaders})
  }

  getAll(): Observable<Inscripcion[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerListadoInscripcion`).pipe(
      map( response => response as Inscripcion[] )
    );
  }

  getById(id: number): Observable<Inscripcion>{
    return this.http.get<Inscripcion>(`${this.urlEndPoint}/obtenerInscripcionPorId/${id}`)
  }

  getAllByEstado(): Observable<Inscripcion[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerListadoInscripcionPorEstado`).pipe(
      map( response => response as Inscripcion[] )
    );
  }

  getUltimoRegistroInscripcion(): Observable<number>{
    return this.http.get<number>(`${this.urlEndPoint}/obtenerUltimoRegistroInscripcion`)
  }

  getSecuencialInscripcion(): Observable<number>{
    return this.http.get<number>(`${this.urlEndPoint}/obtenerSecuencialInscripcion`)
  }

  getInscripcionActivaMaxSecuencial(): Observable<number>{
    return this.http.get<number>(`${this.urlEndPoint}/obtenerInscripcionActivaMaxSecuencial`)
  }

  getByIdPeriodo(idperiodo: number): Observable<Inscripcion>{
    return this.http.get<Inscripcion>(`${this.urlEndPoint}/obtenerInscripcionPorPeriodo/${idperiodo}`)
  }
}


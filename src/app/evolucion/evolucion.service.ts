import { Injectable } from '@angular/core';
import { Evolucion } from './evolucion';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Lang from '../../assets/app.lang.json';

@Injectable({
  providedIn: 'root'
})
export class EvolucionService {
  private urlEndPoint: string = Lang.urlEndPoint.evolucion;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  create(evoluciontipo: Evolucion) : Observable<Boolean> {
    return this.http.post<Boolean>(`${this.urlEndPoint}/create`, evoluciontipo, {headers: this.httpHeaders})
  }

  update(evoluciontipo: Evolucion): Observable<Evolucion>{
    return this.http.post<Evolucion>(`${this.urlEndPoint}/update`, evoluciontipo, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Evolucion>{
    return this.http.delete<Evolucion>(`${this.urlEndPoint}/delete/${id}`, {headers: this.httpHeaders})
  }

  getAll(): Observable<Evolucion[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerListadoEvolucion`).pipe(
      map( response => response as Evolucion[] )
    );
  }

  getById(id: number): Observable<Evolucion>{
    return this.http.get<Evolucion>(`${this.urlEndPoint}/obtenerEntidadaEvolucionPorId/${id}`)
  }

  getAllByIdTema(idTema: number): Observable<Evolucion[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerEvolucionxTema/${idTema}`).pipe(
      map( response => response as Evolucion[] )
    );
  }

  getByTema(id: number): Observable<Evolucion>{
    return this.http.get<Evolucion>(`${this.urlEndPoint}/obtenerEntidadaEvolucionxTema/${id}`)
  }

  getSecuencialEvolucion(idtema: number): Observable<number>{
    return this.http.get<number>(`${this.urlEndPoint}/obtenerSecuencialEvolucion/${idtema}`)
  }

  getUltimoRegistroporTema(idtema: number, idestadoevolucion: number): Observable<number>{
    return this.http.get<number>(`${this.urlEndPoint}/obtenerUltimoRegistroporTema/${idtema}/${idestadoevolucion}`)
  }

}

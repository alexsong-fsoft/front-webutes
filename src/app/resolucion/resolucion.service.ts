import { Injectable } from '@angular/core';
import { Resolucion } from './resolucion';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Lang from '../../assets/app.lang.json';

@Injectable({
  providedIn: 'root'
})
export class ResolucionService {

  private urlEndPoint: string = Lang.urlEndPoint.resolucion;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }create(resoluciontipo: Resolucion) : Observable<Boolean> {
    return this.http.post<Boolean>(`${this.urlEndPoint}/create`, resoluciontipo, {headers: this.httpHeaders})
  }

  update(resoluciontipo: Resolucion): Observable<Resolucion>{
    return this.http.post<Resolucion>(`${this.urlEndPoint}/update`, resoluciontipo, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Resolucion>{
    return this.http.delete<Resolucion>(`${this.urlEndPoint}/delete/${id}`, {headers: this.httpHeaders})
  }

  getAll(): Observable<Resolucion[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerListadoResolucion`).pipe(
      map( response => response as Resolucion[] )
    );
  }

  getById(id: number): Observable<Resolucion>{
    return this.http.get<Resolucion>(`${this.urlEndPoint}/obtenerResolucionxId/${id}`)
  }

  getAllByIdTema(idtema: number): Observable<Resolucion[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerResolucionxTema/${idtema}`).pipe(
      map( response => response as Resolucion[] )
    );
  }

  getByIdTemaIdTipoRes(idtema: number, idtipores: number): Observable<Resolucion>{
    return this.http.get<Resolucion>(`${this.urlEndPoint}/obtenerResolucionxTemaIdTipoRes/${idtema}/${idtipores}`)
  }

  getAllByIdTemaIdTipoRes(idtema: number, idtipores: number): Observable<Resolucion[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerResolucionxTemaEstadoresolucion/${idtema}/${idtipores}`).pipe(
      map( response => response as Resolucion[] )
    );
  }
  
  getAllByIdPersona(idpersona: number): Observable<Resolucion[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerResolucionxPersona/${idpersona}`).pipe(
      map( response => response as Resolucion[] )
    );
  }

  UteResolucionCreate(resolucion: Resolucion) : Observable<Boolean> {
    return this.http.post<Boolean>(`${this.urlEndPoint}/ute/resolucion/create`, resolucion, {headers: this.httpHeaders})
  }
  
}

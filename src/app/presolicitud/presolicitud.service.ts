import { Injectable } from '@angular/core';
import { Presolicitud } from './presolicitud';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Lang from '../../assets/app.lang.json';
import { Persona } from '../persona/persona';
import { Page } from '../Page/page';

@Injectable({
  providedIn: 'root'
})
export class PresolicitudService {

  private urlEndPoint: string = Lang.urlEndPoint.presolicitud;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  create(presolicitudtipo: Presolicitud) : Observable<Boolean> {
    return this.http.post<Boolean>(`${this.urlEndPoint}/create`, presolicitudtipo, {headers: this.httpHeaders})
  }

  update(presolicitudtipo: Presolicitud): Observable<Presolicitud>{
    return this.http.post<Presolicitud>(`${this.urlEndPoint}/update`, presolicitudtipo, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Presolicitud>{
    return this.http.delete<Presolicitud>(`${this.urlEndPoint}/delete/${id}`, {headers: this.httpHeaders})
  }

  getAll(): Observable<Presolicitud[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerListadoPresolicitud`).pipe(
      map( response => response as Presolicitud[] )
    );
  }

  getAllPageable(pagenumber: number): Observable<Page<Presolicitud>> {
    let httpHeaders2 = new HttpHeaders({'Content-Type': 'application/json', 'Page': pagenumber.toString() });
    return this.http.get(`${this.urlEndPoint}/obtenerListadoPresolicitudPageable`, {headers: httpHeaders2}).pipe(
      map( response => response as Page<Presolicitud>)
    );
  }

  getById(id: number): Observable<Presolicitud>{
    return this.http.get<Presolicitud>(`${this.urlEndPoint}/obtenerPresolicitudPorId/${id}`)
  }

  getAllByCedula(persona: Persona): Observable<Presolicitud[]> {
    return this.http.post<Presolicitud[]>(`${this.urlEndPoint}/obtenerListadoPresolicitudPorCedula`, persona, {headers: this.httpHeaders}).pipe(
      map( response => response as Presolicitud[] )
    );
  }

  getAllByCedula2(presolicitudtipo: Presolicitud): Observable<Presolicitud> {
    return this.http.post<Presolicitud>(`${this.urlEndPoint}/obtenerPresolicitudPorCedula`, presolicitudtipo, {headers: this.httpHeaders});
  }

  getAllByEstado(idestado: number): Observable<Presolicitud[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerPresolicitudPorEstado/${idestado}`).pipe(
      map( response => response as Presolicitud[] )
    );
  }

  getAllByEstado2(idestado: number): Observable<Presolicitud[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerListadoPresolicitudPorEstado2/${idestado}`).pipe(
      map( response => response as Presolicitud[] )
    );
  }

  getAllByIdsPersona(ids: string): Observable<Presolicitud[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerListadoPresolicitudPorIdsPersona/${ids}`).pipe(
      map( response => response as Presolicitud[] )
    );
  }

  getAllByCedulaId(presolicitudtipo: Presolicitud): Observable<Presolicitud[]> {
    return this.http.post<Presolicitud[]>(`${this.urlEndPoint}/obtenerListadoPresolicitudPorCedulaId`, presolicitudtipo, {headers: this.httpHeaders}).pipe(
      map( response => response as Presolicitud[] )
    );
  }

  getByIdPeronaIdInscripcion(idpersona: number, idinscripcion: number): Observable<Presolicitud> {
    return this.http.get<Presolicitud>(`${this.urlEndPoint}/obtenerPresolicitudPorPersonaId/${idpersona}/${idinscripcion}`);
  }

  getByIdPresolicitud(idpresolicitud: number): Observable<Presolicitud> {
    return this.http.get<Presolicitud>(`${this.urlEndPoint}/obtenerListadoPresolicitudPorId/${idpresolicitud}`);
  }

  getByIdPeronaIdInscripcion2(idpersona: number, idinscripcion: number): Observable<Presolicitud> {
    return this.http.get<Presolicitud>(`${this.urlEndPoint}/obtenerPresolicitudPorPersonaIdInscripcion/${idpersona}/${idinscripcion}`);
  }

  getIdPresolicidutxUltimoRegistrado(idPersona: number): Observable<number>{
    return this.http.get<number>(`${this.urlEndPoint}/obtenerIdPresolicidutxUltimoRegistrado/${idPersona}`)
  }

  getAllByOpcionEstado(idopcion: number, idestados: string): Observable<Presolicitud[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerListadoPresolicitudbyOpcionEstado/${idopcion}/${idestados}`).pipe(
      map( response => response as Presolicitud[] )
    );
  }

  getAllByEstados(opciones: string, idestados: string): Observable<Presolicitud[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerListadoPresolicitudPorEstados/${opciones}/${idestados}`).pipe(
      map( response => response as Presolicitud[] )
    );
  }

}

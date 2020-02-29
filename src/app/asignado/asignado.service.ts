import { Injectable } from '@angular/core';
import { Asignado } from './asignado';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Lang from '../../assets/app.lang.json';

@Injectable({
  providedIn: 'root'
})
export class AsignadoService {

  private urlEndPoint: string = Lang.urlEndPoint.asignado;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getAll(): Observable<Asignado[]> {
    //return this.http.get<Asignado[]>(this.urlEndPoint);
    return this.http.get(`${this.urlEndPoint}/obtenerListadoAsignado`).pipe(
      map( response => response as Asignado[] )
    );
  }

  getById(id): Observable<Asignado>{
    return this.http.get<Asignado>(`${this.urlEndPoint}/obtenerEntidadAsignadoxId/${id}`)
  }

  create(asignadotipo: Asignado) : Observable<Boolean> {
    return this.http.post<Boolean>(`${this.urlEndPoint}/create`, asignadotipo, {headers: this.httpHeaders})
  }

  update(asignadotipo: Asignado): Observable<Asignado>{
    return this.http.post<Asignado>(`${this.urlEndPoint}/update`, asignadotipo, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Asignado>{
    return this.http.delete<Asignado>(`${this.urlEndPoint}/delete/${id}`, {headers: this.httpHeaders})
  }
  
  getByIdTemaIdPersona(idtema: number, idpersona: number): Observable<Asignado[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerAsignadoDTOxTemaPersona/${idtema}/${idpersona}`).pipe(
      map( response => response as Asignado[] )
    );
  }

  getByCedula(cedula: string): Observable<Asignado[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerAsignadoxTemaCedula/${cedula}`).pipe(
      map( response => response as Asignado[] )
    );
  }
  
  getByCedula2(cedula: string): Observable<Asignado>{
    return this.http.get<Asignado>(`${this.urlEndPoint}/obtenerEntidadAsignadoxTemaCedula/${cedula}`)
  }

  getByIdTema(idtema: number): Observable<Asignado[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerAsignadoxTema/${idtema}`).pipe(
      map( response => response as Asignado[] )
    );
  }

  getByIdTemaIdTipo(idtema: number, idtipo: number): Observable<Asignado[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerAsignadoxTema/${idtema}/${idtipo}`).pipe(
      map( response => response as Asignado[] )
    );
  }
  
  getByTemaPersonaVerifica(idtema: number, idtipo: number): Observable<Asignado>{
    return this.http.get<Asignado>(`${this.urlEndPoint}/obtenerAsignadoxTemaPersonaVerifica/${idtema}/${idtipo}`)
  }

  getByIdsTema(idstema: string, idestado: number): Observable<Asignado[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerAsignadoxIdstema/${idstema}/${idestado}`).pipe(
      map( response => response as Asignado[] )
    );
  }

  getByEstado(idestado: number): Observable<Asignado[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerAsignadoxEstado/${idestado}`).pipe(
      map( response => response as Asignado[] )
    );
  }

  getByIdPersonaAsgIdTipoIdTema(idPersona: number, asgIdTipo: number, idTema: number): Observable<Asignado>{
    return this.http.get<Asignado>(`${this.urlEndPoint}/obtenerEntidadAsignadoxIdPersona/${idPersona}/${asgIdTipo}/${idTema}`)
  }

  getByIdPersona2(idPersona: number): Observable<Asignado>{
    return this.http.get<Asignado>(`${this.urlEndPoint}/obtenerEntidadAsignadoxIdPersona/${idPersona}`)
  }

  getByIdPersonaAsgIdTipo(idPersona: number, asgIdTipo: number): Observable<Asignado>{
    return this.http.get<Asignado>(`${this.urlEndPoint}/obtenerEntidadAsignadoxIdPersona/${idPersona}/${asgIdTipo}`)
  }

  getByIdPersonaAsgIdTipoList(idPersona: number, asgIdTipo: number): Observable<Asignado[]>{
    return this.http.get(`${this.urlEndPoint}/obtenerListadoAsignadoxIdPersona/${idPersona}/${asgIdTipo}`).pipe(
      map( response => response as Asignado[] )
    );
  }

  getCountAsignado(idPersona: number, asgIdTipo: number, estadoaccion: number): Observable<number>{
    return this.http.get<number>(`${this.urlEndPoint}/obtenerCountAsignado/${idPersona}/${asgIdTipo}/${estadoaccion}`)
  }

  getByIdPersonaAsgIdTipoIdEstadorev(idPersona: number, asgIdTipo: number, idestadorev: number): Observable<Asignado>{
    return this.http.get<Asignado>(`${this.urlEndPoint}/obtenerAsignadoxTemaPersonaVerificaAsignadoRevisor/${idPersona}/${asgIdTipo}/${idestadorev}`)
  }

  getByIdPersonaIdTemaAsgIdTipoIdEstadorev(idPersona: number, idTema: number, asgIdTipo: number, idestadorev: number): Observable<Asignado>{
    return this.http.get<Asignado>(`${this.urlEndPoint}/obtenerAsignadoxTemaPersonaVerificaAsignadoTipo/${idPersona}/${idTema}/${asgIdTipo}/${idestadorev}`)
  }

  getIdAsignadoByTemaUltimoEstado(idPersona: number, idtema: number, idtipo: number): Observable<number>{
    return this.http.get<number>(`${this.urlEndPoint}/obtenerIdAsignadoxTemaUltimoEstado/${idPersona}/${idtema}/${idtipo}`)
  }

  getAsignadoxIdsTipos(idstema: string, idstipo: number): Observable<number>{
    return this.http.get<number>(`${this.urlEndPoint}/obtenerAsignadoxIdsTipos/${idstema}/${idstipo}`)
  }

}

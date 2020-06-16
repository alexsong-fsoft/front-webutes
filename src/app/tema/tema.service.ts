import { Injectable } from '@angular/core';
import { Tema } from './tema';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Lang from '../../assets/app.lang.json';
import { Page } from '../Page/page';
import { ConsultaDocente } from './consultaDocente';
import { DocenteReporte } from './DocenteReporte';


@Injectable({
  providedIn: 'root'
})
export class TemaService {

  private urlEndPoint: string = Lang.urlEndPoint.tema;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  create(tematipo: Tema) : Observable<Boolean> {
    return this.http.post<Boolean>(`${this.urlEndPoint}/create`, tematipo, {headers: this.httpHeaders})
  }

  update(tematipo: Tema): Observable<Tema>{
    return this.http.post<Tema>(`${this.urlEndPoint}/update`, tematipo, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Tema>{
    return this.http.delete<Tema>(`${this.urlEndPoint}/delete/${id}`, {headers: this.httpHeaders})
  }

  getAll(): Observable<Tema[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerTemas`).pipe(
      map( response => response as Tema[] )
    );
  }

  getById(id: number): Observable<Tema>{
    return this.http.get<Tema>(`${this.urlEndPoint}/obtenerTemasxId/${id}`)
  }

  getAllExceptoEstado(codigos: string): Observable<Tema[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerTemasExceptoEstado/${codigos}`).pipe(
      map( response => response as Tema[] )
    );
  }

  getAllByEstado(codigos: string): Observable<Tema[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerTemasEstados/${codigos}`).pipe(
      map( response => response as Tema[] )
    );
  }

  getAllByEstadoPageable(codigos: string, pagenumber: number): Observable<Page<Tema>> {
    let httpHeaders2 = new HttpHeaders({'Content-Type': 'application/json', 'Page': pagenumber.toString() });
    return this.http.get(`${this.urlEndPoint}/obtenerTemasEstadosPageable/${codigos}`, {headers: httpHeaders2}).pipe(
      map( response => response as Page<Tema>)
    );
  }

  getAllByNombreUsuarioIdEstado(nameuser: string, idestado: number): Observable<Tema[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerTemasxUsuarioEstado/${nameuser}/${idestado}`).pipe(
      map( response => response as Tema[] )
    );
  }

  getAllByNombreUsuario(nameuser: string): Observable<Tema[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerTemasxUsuario/${nameuser}`).pipe(
      map( response => response as Tema[] )
    );
  }

  getAllByIdEstado(idestado: number): Observable<Tema[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerTemasxEstado/${idestado}`).pipe(
      map( response => response as Tema[] )
    );
  }

  obtenerTema(tematipo: Tema): Observable<Tema>{
    return this.http.post<Tema>(`${this.urlEndPoint}/obtenerTema`, tematipo, {headers: this.httpHeaders})
  }

  getAllByIdConvocatoria(fkconv: number): Observable<Tema[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerTemasxConvocatoria/${fkconv}`).pipe(
      map( response => response as Tema[] )
    );
  }

  getAllByUsuarioEstados(nameuser: String, estados: String): Observable<Tema[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerTemasxUsuarioEstadosIn/${nameuser}/${estados}`).pipe(
      map( response => response as Tema[] )
    );
  }

  getByNombreTema(nombretema: String): Observable<Tema>{
    return this.http.get<Tema>(`${this.urlEndPoint}/obtenerTemaxNombre/${nombretema}`)
  }

  getByTemasPk(idtem: number): Observable<Tema[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerTemasxPk/${idtem}`).pipe(
      map( response => response as Tema[] )
    );
  }

  getByTemasPk2(codigos: String): Observable<Tema[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerTemasxIdstemas/${codigos}`).pipe(
      map( response => response as Tema[] )
    );
  }

  getByIdstemasEstados(codigos: string, estados: string): Observable<Tema[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerTemasxIdstemasEstados/${codigos}/${estados}`).pipe(
      map( response => response as Tema[] )
    );
  }

  getByIdstemasEstadosPageable(codigos: string, estados: string, pagenumber: number): Observable<Page<Tema>> {
    let httpHeaders2 = new HttpHeaders({'Content-Type': 'application/json', 'Page': pagenumber.toString() });
    return this.http.get(`${this.urlEndPoint}/obtenerTemasxIdstemasEstadosPageable/${codigos}/${estados}`, {headers: httpHeaders2}).pipe(
      map( response => response as Page<Tema>)
    );
  }

  getByIdExceptoActual(idtem: number): Observable<Tema[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerTemasPorIdExceptoActual/${idtem}`).pipe(
      map( response => response as Tema[] )
    );
  }

  getByParametro(parametro: string): Observable<Tema[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerConsultaTemas/${parametro}`).pipe(
      map( response => response as Tema[] )
    );
  }

  getByUsuarioEstadosIdConvoctoria(nameuser: string, estados: string, idconvocatoria: number): Observable<Tema[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerTemasxUsuarioEstadoConvocatoria/${nameuser}/${estados}/${idconvocatoria}`).pipe(
      map( response => response as Tema[] )
    );
  }

  getConsultaDocente(consulta: ConsultaDocente): Observable<DocenteReporte[]> {
    return this.http.post<DocenteReporte[]>(`${this.urlEndPoint}/consultaDocente`, consulta).pipe(
      map( response => response as DocenteReporte[] )
    );
  }

}

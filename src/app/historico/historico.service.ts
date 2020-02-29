import { Injectable } from '@angular/core';
import { Historico } from './historico';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Lang from '../../assets/app.lang.json';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {

  private urlEndPoint: string = Lang.urlEndPoint.historico;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  create(historicotipo: Historico) : Observable<Boolean> {
    return this.http.post<Boolean>(`${this.urlEndPoint}/create`, historicotipo, {headers: this.httpHeaders})
  }

  update(historicotipo: Historico): Observable<Historico>{
    return this.http.post<Historico>(`${this.urlEndPoint}/update`, historicotipo, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Historico>{
    return this.http.delete<Historico>(`${this.urlEndPoint}/delete/${id}`, {headers: this.httpHeaders})
  }

  getAll(): Observable<Historico[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerHistorico`).pipe(
      map( response => response as Historico[] )
    );
  }

  getById(id: number): Observable<Historico>{
    return this.http.get<Historico>(`${this.urlEndPoint}/obtenerHistorico/${id}`)
  }

  getAllByIdTema(idtema: number): Observable<Historico[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerHistoricoxTema/${idtema}`).pipe(
      map( response => response as Historico[] )
    );
  }

  getAllByIdTemaIdPersona(idtema: number, idpersona: number): Observable<Historico[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerHistoricoxTema/${idtema}/${idpersona}`).pipe(
      map( response => response as Historico[] )
    );
  }

  getByIdTema(idtema: number): Observable<Historico>{
    return this.http.get<Historico>(`${this.urlEndPoint}/obtenerEntidadHistorico/${idtema}`)
  }

  getByIdTemaIdPersona(idtema: number, idpersona: number): Observable<Historico>{
    return this.http.get<Historico>(`${this.urlEndPoint}/obtenerEntidadHistorico/${idtema}/${idpersona}`)
  }

}

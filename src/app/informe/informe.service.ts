import { Injectable } from '@angular/core';
import { Informe } from './informe';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Lang from '../../assets/app.lang.json';

@Injectable({
  providedIn: 'root'
})
export class InformeService {

  private urlEndPoint: string = Lang.urlEndPoint.informe;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  create(informetipo: Informe) : Observable<Boolean> {
    return this.http.post<Boolean>(`${this.urlEndPoint}/create`, informetipo, {headers: this.httpHeaders})
  }

  update(informetipo: Informe): Observable<Informe>{
    return this.http.post<Informe>(`${this.urlEndPoint}/update`, informetipo, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Informe>{
    return this.http.delete<Informe>(`${this.urlEndPoint}/delete/${id}`, {headers: this.httpHeaders})
  }

  getAll(): Observable<Informe[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerListadoInforme`).pipe(
      map( response => response as Informe[] )
    );
  }

  getById(id: number): Observable<Informe>{
    return this.http.get<Informe>(`${this.urlEndPoint}/obtenerInforme/${id}`)
  }

  getAllByIdTema(idtema: number): Observable<Informe[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerInformesxTema/${idtema}`).pipe(
      map( response => response as Informe[] )
    );
  }

  getAllByIdTemaIdPersona(idtema: number, idpersona: number): Observable<Informe[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerInformesxTemaPersona/${idtema}/${idpersona}`).pipe(
      map( response => response as Informe[] )
    );
  }
}

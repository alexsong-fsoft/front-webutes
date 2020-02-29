import { Injectable } from '@angular/core';
import { Hito } from './hito';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Lang from '../../assets/app.lang.json';

@Injectable({
  providedIn: 'root'
})
export class HitoService {

  private urlEndPoint: string = Lang.urlEndPoint.hito;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  create(hitotipo: Hito) : Observable<Boolean> {
    return this.http.post<Boolean>(`${this.urlEndPoint}/create`, hitotipo, {headers: this.httpHeaders})
  }

  update(hitotipo: Hito): Observable<Hito>{
    return this.http.post<Hito>(`${this.urlEndPoint}/update`, hitotipo, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Hito>{
    return this.http.delete<Hito>(`${this.urlEndPoint}/delete/${id}`, {headers: this.httpHeaders})
  }

  getAll(): Observable<Hito[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerListadoHito`).pipe(
      map( response => response as Hito[] )
    );
  }

  getById(id: number): Observable<Hito>{
    return this.http.get<Hito>(`${this.urlEndPoint}/obtenerHito/${id}`)
  }

  getAllByIdTema(idtema: number): Observable<Hito[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerHitoxTema/${idtema}`).pipe(
      map( response => response as Hito[] )
    );
  }

  getByIdTema(idtema: number): Observable<Hito>{
    return this.http.get<Hito>(`${this.urlEndPoint}/obtenerEntidadaHitoxTema/${idtema}`)
  }

  getSecuencialHito(idtema: number): Observable<number>{
    return this.http.get<number>(`${this.urlEndPoint}/obtenerSecuencialHito/${idtema}`)
  }
}

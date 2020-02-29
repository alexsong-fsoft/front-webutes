import { Injectable } from '@angular/core';
import { Areatipo } from './areatipo';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Lang from '../../assets/app.lang.json';

@Injectable({
  providedIn: 'root'
})
export class AreatipoService {
  private urlEndPoint: string = Lang.urlEndPoint.areatipo;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  create(areatipo: Areatipo) : Observable<Boolean> {
    return this.http.post<Boolean>(`${this.urlEndPoint}/create`, areatipo, {headers: this.httpHeaders})
  }

  update(areatipo: Areatipo): Observable<Areatipo>{
    return this.http.post<Areatipo>(`${this.urlEndPoint}/update`, areatipo, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Areatipo>{
    return this.http.delete<Areatipo>(`${this.urlEndPoint}/delete/${id}`, {headers: this.httpHeaders})
  }

  getAll(): Observable<Areatipo[]> {
    //return this.http.get<Areatipo[]>(this.urlEndPoint);
    return this.http.get(`${this.urlEndPoint}/obtenerListadoAreaTipo`).pipe(
      map( response => response as Areatipo[] )
    );
  }

  getById(id: number): Observable<Areatipo>{
    return this.http.get<Areatipo>(`${this.urlEndPoint}/obtenerAreaTipo/${id}`)
  }

  getByIdTipo(idtipo: number): Observable<Areatipo[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerListadoAreatipo/${idtipo}`).pipe(
      map( response => response as Areatipo[] )
    );
  }

  
}

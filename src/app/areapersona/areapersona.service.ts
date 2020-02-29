import { Injectable } from '@angular/core';
import { Areapersona } from './areapersona';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Lang from '../../assets/app.lang.json';

@Injectable({
  providedIn: 'root'
})
export class AreapersonaService {

  private urlEndPoint: string = Lang.urlEndPoint.areapersona;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  create(areapersonatipo: Areapersona) : Observable<Boolean> {
    return this.http.post<Boolean>(`${this.urlEndPoint}/create`, areapersonatipo, {headers: this.httpHeaders})
  }

  update(areapersonatipo: Areapersona): Observable<Areapersona>{
    return this.http.post<Areapersona>(`${this.urlEndPoint}/update`, areapersonatipo, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Areapersona>{
    return this.http.delete<Areapersona>(`${this.urlEndPoint}/delete/${id}`, {headers: this.httpHeaders})
  }

  getAll(): Observable<Areapersona[]> {
    //return this.http.get<Areapersona[]>(this.urlEndPoint);
    return this.http.get(`${this.urlEndPoint}/obtenerListadoAreaPersona`).pipe(
      map( response => response as Areapersona[] )
    );
  }

  getById(id: number): Observable<Areapersona>{
    return this.http.get<Areapersona>(`${this.urlEndPoint}/obtenerAreaPersona/${id}`)
  }

  getByIdPersona(idPersona: number): Observable<Areapersona[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerListadoAreapersonaxPersona/${idPersona}`).pipe(
      map( response => response as Areapersona[] )
    );
  }

  getByIdPersonaIdArea(idPersona: number, idArea: number): Observable<Areapersona>{
    return this.http.get<Areapersona>(`${this.urlEndPoint}/obtenerListadoAreapersonaxPersona/${idPersona}/${idArea}`)
  }

  getByIdsAreasIdPersona(idsAreas: string, idPersona: number): Observable<Areapersona[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerListadoAreapersonaxPersona/${idsAreas}/${idPersona}`).pipe(
      map( response => response as Areapersona[] )
    );
  }
}

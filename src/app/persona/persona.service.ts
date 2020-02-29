import { Injectable } from '@angular/core';
import { Persona } from './persona';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Lang from '../../assets/app.lang.json';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private urlEndPoint: string = Lang.urlEndPoint.persona;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  create(personatipo: Persona) : Observable<Boolean> {
    return this.http.post<Boolean>(`${this.urlEndPoint}/create`, personatipo, {headers: this.httpHeaders})
  }

  update(personatipo: Persona): Observable<Persona>{
    return this.http.post<Persona>(`${this.urlEndPoint}/update`, personatipo, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Persona>{
    return this.http.delete<Persona>(`${this.urlEndPoint}/delete/${id}`, {headers: this.httpHeaders})
  }

  getAll(): Observable<Persona[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerListadoPersona`).pipe(
      map( response => response as Persona[] )
    );
  }

  getById(id: number): Observable<Persona>{
    return this.http.get<Persona>(`${this.urlEndPoint}/obtenerPersonaPorId/${id}`)
  }

  getByCedula(cedula: String): Observable<Persona>{
    return this.http.get<Persona>(`${this.urlEndPoint}/obtenerPersonaPorCedula/${cedula}`)
  }

}
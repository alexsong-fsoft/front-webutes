import { Injectable } from '@angular/core';
import { Correo } from './correo';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Lang from '../../assets/app.lang.json';

@Injectable({
  providedIn: 'root'
})
export class CorreoService {

  private urlEndPoint: string = Lang.urlEndPoint.correo;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  create(correotipo: Correo) : Observable<Boolean> {
    return this.http.post<Boolean>(`${this.urlEndPoint}/create`, correotipo, {headers: this.httpHeaders})
  }

  update(correotipo: Correo): Observable<Correo>{
    return this.http.post<Correo>(`${this.urlEndPoint}/update`, correotipo, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Correo>{
    return this.http.delete<Correo>(`${this.urlEndPoint}/delete/${id}`, {headers: this.httpHeaders})
  }

  getAll(): Observable<Correo[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerCorreo`).pipe(
      map( response => response as Correo[] )
    );
  }

  getById(id: number): Observable<Correo>{
    return this.http.get<Correo>(`${this.urlEndPoint}/obtenerCorreoPorId/${id}`)
  }

  getAllById(id: number): Observable<Correo[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerListadoCorreoPorId/${id}`).pipe(
      map( response => response as Correo[] )
    );
  }

  
}

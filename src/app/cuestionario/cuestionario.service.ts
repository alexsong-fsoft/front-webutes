import { Injectable } from '@angular/core';
import { Cuestionario } from './cuestionario';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Lang from '../../assets/app.lang.json';

@Injectable({
  providedIn: 'root'
})
export class CuestionarioService {

  private urlEndPoint: string = Lang.urlEndPoint.cuestionario;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  create(cuestionariotipo: Cuestionario) : Observable<Boolean> {
    return this.http.post<Boolean>(`${this.urlEndPoint}/create`, cuestionariotipo, {headers: this.httpHeaders})
  }

  update(cuestionariotipo: Cuestionario): Observable<Cuestionario>{
    return this.http.post<Cuestionario>(`${this.urlEndPoint}/update`, cuestionariotipo, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Cuestionario>{
    return this.http.delete<Cuestionario>(`${this.urlEndPoint}/delete/${id}`, {headers: this.httpHeaders})
  }

  getAll(): Observable<Cuestionario[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerListadoCuestionario`).pipe(
      map( response => response as Cuestionario[] )
    );
  }

  getById(id: number): Observable<Cuestionario>{
    return this.http.get<Cuestionario>(`${this.urlEndPoint}/obtenerCuestionario/${id}`)
  }

  getByEstado(): Observable<Cuestionario[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerListadoCuestionarioPorEstado`).pipe(
      map( response => response as Cuestionario[] )
    );
  }

  getByIdsTipoIdInscripcion(idsTipos: string, idinscripcion: number): Observable<Cuestionario[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerListadoCuestionarioPorEstadoTipo/${idsTipos}/${idinscripcion}`).pipe(
      map( response => response as Cuestionario[] )
    );
  }

  
}

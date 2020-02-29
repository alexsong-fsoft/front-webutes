import { Injectable } from '@angular/core';
import { Tiporesolucion } from './tiporesolucion';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Lang from '../../assets/app.lang.json';

@Injectable({
  providedIn: 'root'
})
export class TiporesolucionService {

  private urlEndPoint: string = Lang.urlEndPoint.tiporesolucion;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getAll(): Observable<Tiporesolucion[]> {
    //return this.http.get<Tiporesolucion[]>(this.urlEndPoint);
    return this.http.get(`${this.urlEndPoint}/obtenerListadoTipoResolucion`).pipe(
      map( response => response as Tiporesolucion[] )
    );
  }

  getById(id): Observable<Tiporesolucion>{
    return this.http.get<Tiporesolucion>(`${this.urlEndPoint}/obtenerTipoResolucion/${id}`)
  }

  create(tiporesoluciontipo: Tiporesolucion) : Observable<Boolean> {
    return this.http.post<Boolean>(`${this.urlEndPoint}/create`, tiporesoluciontipo, {headers: this.httpHeaders})
  }

  update(tiporesoluciontipo: Tiporesolucion): Observable<Tiporesolucion>{
    return this.http.post<Tiporesolucion>(`${this.urlEndPoint}/update`, tiporesoluciontipo, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Tiporesolucion>{
    return this.http.delete<Tiporesolucion>(`${this.urlEndPoint}/delete/${id}`, {headers: this.httpHeaders})
  }
}

import { Injectable } from '@angular/core';
import { Tipoopcion } from './tipoopcion';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Lang from '../../assets/app.lang.json';

@Injectable({
  providedIn: 'root'
})
export class TipoopcionService {

  private urlEndPoint: string = Lang.urlEndPoint.tipoopcion;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  create(tipoopciontipo: Tipoopcion) : Observable<Boolean> {
    return this.http.post<Boolean>(`${this.urlEndPoint}/create`, tipoopciontipo, {headers: this.httpHeaders})
  }

  update(tipoopciontipo: Tipoopcion): Observable<Tipoopcion>{
    return this.http.post<Tipoopcion>(`${this.urlEndPoint}/update`, tipoopciontipo, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Tipoopcion>{
    return this.http.delete<Tipoopcion>(`${this.urlEndPoint}/delete/${id}`, {headers: this.httpHeaders})
  }

  getAll(): Observable<Tipoopcion[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerListadoTipoOpcion`).pipe(
      map( response => response as Tipoopcion[] )
    );
  }

  getById(id: number): Observable<Tipoopcion>{
    return this.http.get<Tipoopcion>(`${this.urlEndPoint}/obtenerTipoOpcion/${id}`)
  }

}


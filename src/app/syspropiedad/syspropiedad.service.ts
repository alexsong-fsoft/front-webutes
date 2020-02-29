import { Injectable } from '@angular/core';
import { Syspropiedad } from './syspropiedad';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Lang from '../../assets/app.lang.json';

@Injectable({
  providedIn: 'root'
})
export class SyspropiedadService {

  private urlEndPoint: string = Lang.urlEndPoint.syspropiedad;
    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    constructor(private http: HttpClient) { }

    create(syspropiedadtipo: Syspropiedad) : Observable<Boolean> {
      return this.http.post<Boolean>(`${this.urlEndPoint}/create`, syspropiedadtipo, {headers: this.httpHeaders})
    }

    update(syspropiedadtipo: Syspropiedad): Observable<Syspropiedad>{
      return this.http.post<Syspropiedad>(`${this.urlEndPoint}/update`, syspropiedadtipo, {headers: this.httpHeaders})
    }

    delete(id: number): Observable<Syspropiedad>{
      return this.http.delete<Syspropiedad>(`${this.urlEndPoint}/delete/${id}`, {headers: this.httpHeaders})
    }

    getAll(): Observable<Syspropiedad[]> {
      return this.http.get(`${this.urlEndPoint}/obtenerPropiedades`).pipe(
        map( response => response as Syspropiedad[] )
      );
    }

    getById(id: number): Observable<Syspropiedad>{
      return this.http.get<Syspropiedad>(`${this.urlEndPoint}/obtenerPropiedadesbyPk/${id}`)
    }

    getPropiedad(): Observable<Syspropiedad[]> {
      return this.http.get(`${this.urlEndPoint}/obtenerPropiedad`).pipe(
        map( response => response as Syspropiedad[] )
      );
    }
  }

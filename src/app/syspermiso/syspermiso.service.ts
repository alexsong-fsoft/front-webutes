import { Injectable } from '@angular/core';
import { Syspermiso } from './syspermiso';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Lang from '../../assets/app.lang.json';

@Injectable({
  providedIn: 'root'
})
export class SyspermisoService {

  private urlEndPoint: string = Lang.urlEndPoint.syspermiso;
    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    constructor(private http: HttpClient) { }

    create(syspermisotipo: Syspermiso) : Observable<Boolean> {
      return this.http.post<Boolean>(`${this.urlEndPoint}/create`, syspermisotipo, {headers: this.httpHeaders})
    }

    update(syspermisotipo: Syspermiso): Observable<Syspermiso>{
      return this.http.post<Syspermiso>(`${this.urlEndPoint}/update`, syspermisotipo, {headers: this.httpHeaders})
    }

    delete(id: number): Observable<Syspermiso>{
      return this.http.delete<Syspermiso>(`${this.urlEndPoint}/delete/${id}`, {headers: this.httpHeaders})
    }

    getAll(): Observable<Syspermiso[]> {
      return this.http.get(`${this.urlEndPoint}/obtenerListadoSysPermiso`).pipe(
        map( response => response as Syspermiso[] )
      );
    }

    getById(id: number): Observable<Syspermiso>{
      return this.http.get<Syspermiso>(`${this.urlEndPoint}/obtenerSysPermiso/${id}`)
    }

    getAllByNombrePerfil(nombreperfil: string): Observable<Syspermiso[]> {
      return this.http.get(`${this.urlEndPoint}/obtenerListadoPermisoPorNombrePerfil/${nombreperfil}`).pipe(
        map( response => response as Syspermiso[] )
      );
    }

    getAllByPerfil(syspermiso: Syspermiso) : Observable<Syspermiso[]> {
      return this.http.post<Syspermiso[]>(`${this.urlEndPoint}/obtenerListadoPermisoPorPerfil`, syspermiso, {headers: this.httpHeaders}).pipe(
        map( response => response as Syspermiso[] )
      );
    }

    getByPerfil(syspermiso: Syspermiso) : Observable<Syspermiso> {
      return this.http.post<Syspermiso>(`${this.urlEndPoint}/obtenerPermisoPorPerfil`, syspermiso, {headers: this.httpHeaders})
    }

    
  }

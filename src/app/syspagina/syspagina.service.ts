import { Injectable } from '@angular/core';
import { Syspagina } from './syspagina';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Lang from '../../assets/app.lang.json';


@Injectable({
  providedIn: 'root'
})
export class SyspaginaService {

  private urlEndPoint: string = Lang.urlEndPoint.syspagina;
    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    constructor(private http: HttpClient) { }

    create(syspaginatipo: Syspagina) : Observable<Boolean> {
      return this.http.post<Boolean>(`${this.urlEndPoint}/create`, syspaginatipo, {headers: this.httpHeaders})
    }

    update(syspaginatipo: Syspagina): Observable<Syspagina>{
      return this.http.post<Syspagina>(`${this.urlEndPoint}/update`, syspaginatipo, {headers: this.httpHeaders})
    }

    delete(id: number): Observable<Syspagina>{
      return this.http.delete<Syspagina>(`${this.urlEndPoint}/delete/${id}`, {headers: this.httpHeaders})
    }

    getAll(): Observable<Syspagina[]> {
      return this.http.get(`${this.urlEndPoint}/obtenerListadoPagina`).pipe(
        map( response => response as Syspagina[] )
      );
    }

    getById(id: number): Observable<Syspagina>{
      return this.http.get<Syspagina>(`${this.urlEndPoint}/obtenerPaginaPorId/${id}`)
    }

    getAllPaginaPadres(): Observable<Syspagina[]> {
      return this.http.get(`${this.urlEndPoint}/obtenerListadoPaginaPadres`).pipe(
        map( response => response as Syspagina[] )
      );
    }

  }


import { Injectable } from '@angular/core';
import { Sysperfil } from './sysperfil';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Lang from '../../assets/app.lang.json';

@Injectable({
  providedIn: 'root'
})
export class SysperfilService {

  private urlEndPoint: string = Lang.urlEndPoint.sysperfil;
    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    constructor(private http: HttpClient) { }

    create(sysperfiltipo: Sysperfil) : Observable<Boolean> {
      return this.http.post<Boolean>(`${this.urlEndPoint}/create`, sysperfiltipo, {headers: this.httpHeaders})
    }

    update(sysperfiltipo: Sysperfil): Observable<Sysperfil>{
      return this.http.post<Sysperfil>(`${this.urlEndPoint}/update`, sysperfiltipo, {headers: this.httpHeaders})
    }

    delete(id: number): Observable<Sysperfil>{
      return this.http.delete<Sysperfil>(`${this.urlEndPoint}/delete/${id}`, {headers: this.httpHeaders})
    }

    getAll(): Observable<Sysperfil[]> {
      return this.http.get(`${this.urlEndPoint}/obtenerListadoPerfil`).pipe(
        map( response => response as Sysperfil[] )
      );
    }

    getById(id: number): Observable<Sysperfil>{
      return this.http.get<Sysperfil>(`${this.urlEndPoint}/obtenerPerfilPorId/${id}`)
    }

    getAllByNombreUsuario(nombreusuario: string): Observable<Sysperfil[]> {
      return this.http.get(`${this.urlEndPoint}/obtenerListadoPerfilPorNombreUsuario/${nombreusuario}`).pipe(
        map( response => response as Sysperfil[] )
      );
    }

    getByNombreUsuario(nombreusuario: string): Observable<Sysperfil>{
      return this.http.get<Sysperfil>(`${this.urlEndPoint}/obtenerPerfilPorNombreUsuario/${nombreusuario}`)
    }

    getAllByNombreUsuario2(nombreusuario: string): Observable<Sysperfil[]> {
      return this.http.get(`${this.urlEndPoint}/obtenerListadoPerfilPorNombreUsuario2/${nombreusuario}`).pipe(
        map( response => response as Sysperfil[] )
      );
    }

    getByNombrePerfil(nombreperfil: string): Observable<Sysperfil>{
      return this.http.get<Sysperfil>(`${this.urlEndPoint}/obtenerPerfilPorNombre/${nombreperfil}`)
    }

  }

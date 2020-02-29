import { Injectable } from '@angular/core';
import { Syspaginaperfil } from './syspaginaperfil';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Lang from '../../assets/app.lang.json';
import { Sysperfil } from '../sysperfil/sysperfil';

@Injectable({
  providedIn: 'root'
})
export class SyspaginaperfilService {

  private urlEndPoint: string = Lang.urlEndPoint.syspaginaperfil;
    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    constructor(private http: HttpClient) { }

    create(syspaginaperfiltipo: Syspaginaperfil) : Observable<Boolean> {
      return this.http.post<Boolean>(`${this.urlEndPoint}/create`, syspaginaperfiltipo, {headers: this.httpHeaders})
    }

    update(syspaginaperfiltipo: Syspaginaperfil): Observable<Syspaginaperfil>{
      return this.http.post<Syspaginaperfil>(`${this.urlEndPoint}/update`, syspaginaperfiltipo, {headers: this.httpHeaders})
    }

    delete(id: number): Observable<Syspaginaperfil>{
      return this.http.delete<Syspaginaperfil>(`${this.urlEndPoint}/delete/${id}`, {headers: this.httpHeaders})
    }

    getAll(): Observable<Syspaginaperfil[]> {
      return this.http.get(`${this.urlEndPoint}/obtenerListadoSysPaginaPerfil`).pipe(
        map( response => response as Syspaginaperfil[] )
      );
    }

    getById(id: number): Observable<Syspaginaperfil>{
      return this.http.get<Syspaginaperfil>(`${this.urlEndPoint}/obtenerSysPaginaPerfil/${id}`)
    }

    getAllByNombrePerfil(nombreperfil: string): Observable<Syspaginaperfil[]> {
      return this.http.get(`${this.urlEndPoint}/obtenerListadoPaginaPerfilPorNombrePerfil/${nombreperfil}`).pipe(
        map( response => response as Syspaginaperfil[] )
      );
    }
    
    getAllByPerfil(sysperfil: Sysperfil) : Observable<Syspaginaperfil[]> {
      return this.http.post<Syspaginaperfil[]>(`${this.urlEndPoint}/obtenerListadoPaginaPerfilPorPerfil`, sysperfil, {headers: this.httpHeaders}).pipe(
        map( response => response as Syspaginaperfil[] )
      );
    }
    
    getAllByPerfil2(sysperfil: Sysperfil) : Observable<Syspaginaperfil[]> {
      return this.http.post<Syspaginaperfil[]>(`${this.urlEndPoint}/obtenerPaginaPerfilPorPerfil`, sysperfil, {headers: this.httpHeaders}).pipe(
        map( response => response as Syspaginaperfil[] )
      );
    }
    
    getAllByPerfil3(sysperfil: Sysperfil) : Observable<Syspaginaperfil[]> {
      return this.http.post<Syspaginaperfil[]>(`${this.urlEndPoint}/obtenerListadoPaginaPerfilPorPerfil2`, sysperfil, {headers: this.httpHeaders}).pipe(
        map( response => response as Syspaginaperfil[] )
      );
    }

}

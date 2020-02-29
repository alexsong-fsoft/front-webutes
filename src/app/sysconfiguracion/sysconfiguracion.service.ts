import { Injectable } from '@angular/core';
import { Sysconfiguracion } from './sysconfiguracion';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Lang from '../../assets/app.lang.json';

@Injectable({
  providedIn: 'root'
})
export class SysconfiguracionService {

  private urlEndPoint: string = Lang.urlEndPoint.sysconfiguracion;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  create(sysconfiguraciontipo: Sysconfiguracion) : Observable<Boolean> {
    return this.http.post<Boolean>(`${this.urlEndPoint}/create`, sysconfiguraciontipo, {headers: this.httpHeaders})
  }

  update(sysconfiguraciontipo: Sysconfiguracion): Observable<Sysconfiguracion>{
    return this.http.post<Sysconfiguracion>(`${this.urlEndPoint}/update`, sysconfiguraciontipo, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Sysconfiguracion>{
    return this.http.delete<Sysconfiguracion>(`${this.urlEndPoint}/delete/${id}`, {headers: this.httpHeaders})
  }

  getAll(): Observable<Sysconfiguracion[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerListadoSysConfiguracion`).pipe(
      map( response => response as Sysconfiguracion[] )
    );
  }

  getById(id: number): Observable<Sysconfiguracion>{
    return this.http.get<Sysconfiguracion>(`${this.urlEndPoint}/obtenerConfiguracionbyPk/${id}`)
  }

  getAllByTipo(tipo: string): Observable<Sysconfiguracion[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerConfiguracionbyTipo/${tipo}`).pipe(
      map( response => response as Sysconfiguracion[] )
    );
  }

  getByCampo(campo: string): Observable<Sysconfiguracion>{
    return this.http.get<Sysconfiguracion>(`${this.urlEndPoint}/obtenerConfiguracionbyCampo/${campo}`)
  }

  activaProcesoByCampo(campo: string): Observable<Sysconfiguracion>{
    return this.http.get<Sysconfiguracion>(`${this.urlEndPoint}/activaProcesoByCampo/${campo}`)
  }

}

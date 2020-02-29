import { Injectable } from '@angular/core';
import { Convocatoria } from './convocatoria';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Lang from '../../assets/app.lang.json';

@Injectable({
  providedIn: 'root'
})
export class ConvocatoriaService {

  private urlEndPoint: string = Lang.urlEndPoint.convocatoria;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  create(convocatoriatipo: Convocatoria) : Observable<Boolean> {
    return this.http.post<Boolean>(`${this.urlEndPoint}/create`, convocatoriatipo, {headers: this.httpHeaders})
  }

  update(convocatoriatipo: Convocatoria): Observable<Convocatoria>{
    return this.http.post<Convocatoria>(`${this.urlEndPoint}/update`, convocatoriatipo, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Convocatoria>{
    return this.http.delete<Convocatoria>(`${this.urlEndPoint}/delete/${id}`, {headers: this.httpHeaders})
  }

  getAll(): Observable<Convocatoria[]> {
    //return this.http.get<Convocatoria[]>(this.urlEndPoint);
    return this.http.get(`${this.urlEndPoint}/obtenerListadoConvocatoria`).pipe(
      map( response => response as Convocatoria[] )
    );
  }

  getById(id: number): Observable<Convocatoria>{
    return this.http.get<Convocatoria>(`${this.urlEndPoint}/obtenerConvocatoriaPorId/${id}`)
  }

  getConvocatoriaSecuencia(): Observable<number>{
    return this.http.get<number>(`${this.urlEndPoint}/obtenerConvocatoriaSecuencia`)
  }

  getUltimoRegistroConvocatoria(): Observable<number>{
    return this.http.get<number>(`${this.urlEndPoint}/obtenerUltimoRegistroConvocatoria`)
  }

  getSecuencialConvocatoria(): Observable<number>{
    return this.http.get<number>(`${this.urlEndPoint}/obtenerSecuencialConvocatoria`)
  }

  getByActivo(): Observable<Convocatoria[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerListadoConvocatoriaPorActivo`).pipe(
      map( response => response as Convocatoria[] )
    );
  }

  getByIdActivo(id: number): Observable<Convocatoria>{
    return this.http.get<Convocatoria>(`${this.urlEndPoint}/obtenerConvocatoriaPorIdActivo/${id}`)
  }

  getByIdPeriodo(conPeriodo: number): Observable<Convocatoria>{
    return this.http.get<Convocatoria>(`${this.urlEndPoint}/obtenerConvocatoriaPorIdPeriodo/${conPeriodo}`)
  }
  
}

import { Injectable } from '@angular/core';
import { Respuesta } from './respuesta';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Lang from '../../assets/app.lang.json';


@Injectable({
  providedIn: 'root'
})
export class RespuestaService {

  private urlEndPoint: string = Lang.urlEndPoint.respuesta;
    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    constructor(private http: HttpClient) { }

    create(respuestatipo: Respuesta) : Observable<Boolean> {
      return this.http.post<Boolean>(`${this.urlEndPoint}/create`, respuestatipo, {headers: this.httpHeaders})
    }

    update(respuestatipo: Respuesta): Observable<Respuesta>{
      return this.http.post<Respuesta>(`${this.urlEndPoint}/update`, respuestatipo, {headers: this.httpHeaders})
    }

    delete(id: number): Observable<Respuesta>{
      return this.http.delete<Respuesta>(`${this.urlEndPoint}/delete/${id}`, {headers: this.httpHeaders})
    }

    getAll(): Observable<Respuesta[]> {
      return this.http.get(`${this.urlEndPoint}/obtenerListadoRespuesta`).pipe(
        map( response => response as Respuesta[] )
      );
    }

    getById(id: number): Observable<Respuesta>{
      return this.http.get<Respuesta>(`${this.urlEndPoint}/obtenerRespuesta/${id}`)
    }

    getAllByIdPresolicitud(idpresolicitud: number): Observable<Respuesta[]> {
      return this.http.get(`${this.urlEndPoint}/obtenerListadoRespuestaPorIdPresolicitud/${idpresolicitud}`).pipe(
        map( response => response as Respuesta[] )
      );
    }

    getByIdPresolicitudIdCuestionario(idpresolicitud: number, idcuestionario): Observable<Respuesta>{
      return this.http.get<Respuesta>(`${this.urlEndPoint}/obtenerRespuestaPorIds/${idpresolicitud}/${idcuestionario}`)
    }
  }

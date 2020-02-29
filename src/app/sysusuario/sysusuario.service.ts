import { Injectable } from '@angular/core';
import { Sysusuario } from './sysusuario';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Lang from '../../assets/app.lang.json';
import { Persona } from '../persona/persona';

@Injectable({
  providedIn: 'root'
})
export class SysusuarioService {

  private urlEndPoint: string = Lang.urlEndPoint.sysusuario;
    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    constructor(private http: HttpClient) { }

    create(sysusuariotipo: Sysusuario) : Observable<Boolean> {
      return this.http.post<Boolean>(`${this.urlEndPoint}/create`, sysusuariotipo, {headers: this.httpHeaders})
    }

    update(sysusuariotipo: Sysusuario): Observable<Sysusuario>{
      return this.http.post<Sysusuario>(`${this.urlEndPoint}/update`, sysusuariotipo, {headers: this.httpHeaders})
    }

    delete(id: number): Observable<Sysusuario>{
      return this.http.delete<Sysusuario>(`${this.urlEndPoint}/delete/${id}`, {headers: this.httpHeaders})
    }

    getAll(): Observable<Sysusuario[]> {
      return this.http.get(`${this.urlEndPoint}/obtenerListadoUsuario`).pipe(
        map( response => response as Sysusuario[] )
      );
    }

    getById(id: number): Observable<Sysusuario>{
      return this.http.get<Sysusuario>(`${this.urlEndPoint}/obtenerUsuarioPorId/${id}`)
    }

    loginUsuario(sysusuariotipo: Sysusuario): Observable<Sysusuario>{
      return this.http.post<Sysusuario>(`${this.urlEndPoint}/loginUsuario`, sysusuariotipo, {headers: this.httpHeaders})
    }

    getByNombreUsuario(nombreusuario: string): Observable<Sysusuario>{
      return this.http.get<Sysusuario>(`${this.urlEndPoint}/obtenerUsuarioPorNombreUsuario/${nombreusuario}`)
    }

    getAllByNombreUsuario(nombreusuario: string): Observable<Sysusuario[]> {
      return this.http.get(`${this.urlEndPoint}/obtenerListadoUsuarioPorNombre/${nombreusuario}`).pipe(
        map( response => response as Sysusuario[] )
      );
    }

    getAllByNombreUsuario2(nombreusuario: string): Observable<Sysusuario[]> {
      return this.http.get(`${this.urlEndPoint}/obtenerListadoUsuarioPorUsuarioNombre/${nombreusuario}`).pipe(
        map( response => response as Sysusuario[] )
      );
    }

    getByPersona(persona: Persona): Observable<Sysusuario>{
      return this.http.post<Sysusuario>(`${this.urlEndPoint}/obtenerUsuarioPorPersona`, persona, {headers: this.httpHeaders})
    }

    getByIdPersona(idpersona: number): Observable<Sysusuario>{
      return this.http.get<Sysusuario>(`${this.urlEndPoint}/obtenerUsuarioPorPersonaId/${idpersona}`)
    }

    getAllByNombrePerfil(perfilnombre: string): Observable<Sysusuario[]> {
      return this.http.get(`${this.urlEndPoint}/obtenerListadoUsuarioPorPerfil/${perfilnombre}`).pipe(
        map( response => response as Sysusuario[] )
      );
    }

    getAllByNombrePerfilEstadosOpciones(perfilnombre: string, preslestados: string, preslopciones: string): Observable<Sysusuario[]> {
      return this.http.get(`${this.urlEndPoint}/obtenerListadoUsuarioPorPerfilPresolicitud/${perfilnombre}/${preslestados}/${preslopciones}`).pipe(
        map( response => response as Sysusuario[] )
      );
    }

    getAllByNombrePerfil2(perfilnombre: string): Observable<Sysusuario[]> {
      return this.http.get(`${this.urlEndPoint}/obtenerListadoUsuarioPorPerfilAsignado/${perfilnombre}`).pipe(
        map( response => response as Sysusuario[] )
      );
    }

    getAllByNombrePerfilIdTemaIdPeriodo(perfilnombre: string, idtema: number, idperiodo: number): Observable<Sysusuario[]> {
      return this.http.get(`${this.urlEndPoint}/obtenerListadoUsuarioPorPerfilAsignado/${perfilnombre}/${idtema}/${idperiodo}`).pipe(
        map( response => response as Sysusuario[] )
      );
    }

    getAllByNombrePerfilPeriodo(perfilnombre: string, periodo: number): Observable<Sysusuario[]> {
      return this.http.get(`${this.urlEndPoint}/obtenerListadoUsuarioPorPerfilSeleccion/${perfilnombre}/${periodo}`).pipe(
        map( response => response as Sysusuario[] )
      );
    }

    getAllByNombrePerfilIdPersonaTutor(perfilnombre: string, idpersonatutor: number): Observable<Sysusuario[]> {
      return this.http.get(`${this.urlEndPoint}/obtenerListadoUsuarioPorPerfil/${perfilnombre}/${idpersonatutor}`).pipe(
        map( response => response as Sysusuario[] )
      );
    }

    getAllByIdUsuario(idusuario: number): Observable<Sysusuario[]> {
      return this.http.get(`${this.urlEndPoint}/obtenerListadoUsuarioPorUsuarioId/${idusuario}`).pipe(
        map( response => response as Sysusuario[] )
      );
    }

    getAllByNombrePerfilIdUsuario(perfilnombre: string, idusuario: number, estados: string): Observable<Sysusuario[]> {
      return this.http.get(`${this.urlEndPoint}/obtenerListadoUsuarioPorTemaPorPerfil/${perfilnombre}/${idusuario}/${estados}`).pipe(
        map( response => response as Sysusuario[] )
      );
    }

    getByCorreo(correo: string): Observable<Sysusuario> {
      return this.http.get<Sysusuario>(`${this.urlEndPoint}/obtenerUsuarioPorCorreo/${correo}`)
    }

    getAllByNombrePerfilEstados(perfilnombre: string, preslestados: string, preslopciones: string, idinscripcion: number): Observable<Sysusuario[]> {
      return this.http.get(`${this.urlEndPoint}/obtenerListadoUsuarioPorPerfilPresolicitud/${perfilnombre}/${preslestados}/${preslopciones}/${idinscripcion}`).pipe(
        map( response => response as Sysusuario[] )
      );
    }

    getAllByNombrePerfilIdUsuarioEstados(perfilnombre: string, idusuario: number, estados: string, idperiodo: string): Observable<Sysusuario[]> {
      return this.http.get(`${this.urlEndPoint}/obtenerListadoUsuarioPorTemaPorPerfil/${perfilnombre}/${idusuario}/${estados}/${idperiodo}`).pipe(
        map( response => response as Sysusuario[] )
      );
    }

  }

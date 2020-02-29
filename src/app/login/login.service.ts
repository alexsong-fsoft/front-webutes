import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import Lang from '../../assets/app.lang.json';
import { Sysusuario } from '../sysusuario/sysusuario.js';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private urlEndPoint: string = Lang.urlEndPoint.login;
    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    
    constructor(private http: HttpClient) {
    }

    login(sysUsuario: Sysusuario): Observable<Sysusuario> {
        return this.http.post<Sysusuario>(`${this.urlEndPoint}/loginUsuario`, sysUsuario, {headers: this.httpHeaders});
    }
}
import { Injectable } from '@angular/core';
import { Area } from './area';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Lang from '../../assets/app.lang.json';
import { Page } from '../Page/page';

@Injectable({
  providedIn: 'root'
})

export class AreaService {
  private urlEndPoint: string = Lang.urlEndPoint.area;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  create(areatipo: Area) : Observable<Boolean> {
    return this.http.post<Boolean>(`${this.urlEndPoint}/create`, areatipo, {headers: this.httpHeaders})
  }

  update(areatipo: Area): Observable<Area>{
    return this.http.post<Area>(`${this.urlEndPoint}/update`, areatipo, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Area>{
    return this.http.delete<Area>(`${this.urlEndPoint}/delete/${id}`, {headers: this.httpHeaders})
  }  

  getAll(): Observable<Area[]> {
    //return this.http.get<Area[]>(this.urlEndPoint);
    return this.http.get(`${this.urlEndPoint}/obtenerListadoArea`).pipe(
      map( response => response as Area[] )
    );
  }

  getAllPageable(pagenumber: number): Observable<Page<Area>> {
    let httpHeaders2 = new HttpHeaders({'Content-Type': 'application/json', 'Page': pagenumber.toString() });
    return this.http.get(`${this.urlEndPoint}/obtenerListadoAreaPageable`, {headers: httpHeaders2}).pipe(
      map( response => response as Page<Area>)
    );
  }

  getById(id): Observable<Area>{
    return this.http.get<Area>(`${this.urlEndPoint}/obtenerArea/${id}`)
  }

  getListadoAreaPorTipo(tipoarea: number): Observable<Area[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerListadoAreaPorTipo/${tipoarea}`).pipe(
      map( response => response as Area[] )
    );
  }  

  getListadoAreaPorIds(ids: string): Observable<Area[]> {
    return this.http.get(`${this.urlEndPoint}/obtenerListadoArea/${ids}`).pipe(
      map( response => response as Area[] )
    );
  }

}

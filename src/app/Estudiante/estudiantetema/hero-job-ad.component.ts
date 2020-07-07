import { Component, Input } from '@angular/core';

import { AdComponent }      from './ad.component';
import { Tema } from 'src/app/tema/tema';
import { TemaService } from 'src/app/tema/tema.service';
import { Estado } from 'src/app/estado/Estado';
import { Tipo } from 'src/app/tipo/Tipo';
import { DatePipe } from '@angular/common';
import { Estaticos } from 'src/app/app.constants';

@Component({
  //selector: 'app-formtema',
  templateUrl: './formestudiantetema.component.html'
})
export class HeroJobAdComponent implements AdComponent {
  @Input() data: any;
  private tema: Tema = new Tema();
  private listEstadoPrePostTema: Estado[] = [];
  private listTipoDocumento: Tipo[];
  
  constructor(private temaService: TemaService,
    private datepipe: DatePipe) { }

  ngOnInit() {
    this.load();
    this.listEstadoPrePostTema = Estado.loadPrePostTema();
    this.listTipoDocumento = Tipo.loadDocumento();
  }

  public load(): void {
    let id = this.data.idTema;
    if (id) {
      this.temaService.getById(id).subscribe((tema) => this.tema = tema)
    }
  }

  public getNombreEstadoPorLista(idEstado: number): String {
    return Estado.getNombreEstadoPorLista(idEstado, this.listEstadoPrePostTema);
  }

  public getNombreTipoPorLista(idTipo: number): String {
    return Tipo.getNombreTipoPorLista(idTipo, this.listTipoDocumento);
  }

  public parseDateToString(date: Date): String {
    return this.datepipe.transform(date, Estaticos.FORMAT_DATE);
  }
  
}

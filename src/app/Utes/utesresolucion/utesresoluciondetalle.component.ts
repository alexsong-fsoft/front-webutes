import { Component, OnInit, Input, ComponentFactoryResolver } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { Tema } from 'src/app/tema/tema';
import { TemaService } from 'src/app/tema/tema.service';
import { Estado } from 'src/app/estado/Estado';
import { Tipo } from 'src/app/tipo/Tipo';
import { DatePipe } from '@angular/common';
import { Estaticos } from 'src/app/app.constants';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  //selector: 'app-utesresoluciondetalle',
  templateUrl: './utesresoluciondetalle.component.html'
})
export class UtesresoluciondetalleComponent implements AdComponent {
  @Input() data: any;
  private tema: Tema = new Tema();
  private listEstadoPrePostTema: Estado[];
  private listEstadoInscripcion: Estado[] = [];
  private listTipoDocumento: Tipo[];
  private listTipoAsignacion: Tipo[] = [];
  
  constructor(private temaService: TemaService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private datepipe: DatePipe) { }

  ngOnInit() {
    this.tema = new Tema();
    this.load();
    this.listEstadoPrePostTema = Estado.loadPrePostTema();
    this.listEstadoInscripcion = Estado.loadInscripcion();
    this.listTipoDocumento = Tipo.loadDocumento();
    this.listTipoAsignacion = Tipo.loadAsignacion();
    $("#tabs_docentetema_detalle").tabs();
    this.showTab('tab-tema');
  }

  public load(): void {        
    let id = this.data.idTema;
    if (id) {
      this.temaService.getById(id).subscribe(
        (tema) => {
          if (tema != null) {
            this.tema = tema; 
          } 
        }

      )
    }
  }

  public parseDateToString(date: Date): String{
    return this.datepipe.transform(date, Estaticos.FORMAT_DATE);
  }

  public showTab(tabid: String){
    Gestor.fn.showTab(tabid);
  }
  public getNombreEstadoAsignado(idEstado: number): String {
    return Estado.getNombreEstadoPorLista(idEstado, this.listEstadoInscripcion);
  }
  
  public getNombreTipoAsignado(idTipo: number): String {
    return Tipo.getNombreTipoPorLista(idTipo, this.listTipoAsignacion);
  }

  public getNombreEstadoPorLista(idEstado: number, tab: string): String {
    return Estado.getNombreEstadoPorLista(idEstado, this.listEstadoPrePostTema);
  }

  public getNombreTipoPorLista(idTipo: number): String {
    return Tipo.getNombreTipoPorLista(idTipo, this.listTipoDocumento);
  }
}

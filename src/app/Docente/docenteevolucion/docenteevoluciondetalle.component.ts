import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { AdDirective } from 'src/app/Estudiante/estudiantetema/ad.directive';
import { Tema } from 'src/app/tema/tema';
import { TemaService } from 'src/app/tema/tema.service';
import { Resolucion } from 'src/app/resolucion/resolucion';
import { DocenteevolucionresoluciondialogComponent } from './docenteevolucionresoluciondialog.component';
import { AdItem } from 'src/app/Estudiante/estudiantetema/ad-item';
import { Estado } from 'src/app/estado/Estado';
import { Tipo } from 'src/app/tipo/Tipo';
import { ReporteService } from 'src/app/reporte/reporte.service';
import { reporteDownload, Estaticos } from 'src/app/app.constants';
import { DatePipe } from '@angular/common';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-docenteevoluciondetalle',
  templateUrl: './docenteevoluciondetalle.component.html'
})
export class DocenteevoluciondetalleComponent implements OnInit {
  private tema: Tema = new Tema();
  private listEstadoPrePostTema: Estado[];
  private listEstadoAsignadoLector: Estado[] = [];
  private listTipoDocumento: Tipo[];
  private listTipoAsignacion: Tipo[] = [];
  public reporteDownload = reporteDownload;

  @ViewChild(AdDirective, {static: true}) adHost: AdDirective;
  
  constructor(private temaService: TemaService, 
    private reporteService: ReporteService,
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private datepipe: DatePipe) { }

  ngOnInit() {
    this.load();
    this.listEstadoAsignadoLector = Estado.loadAsignaLector();
    this.listEstadoPrePostTema = Estado.loadPrePostTema();
    this.listTipoDocumento = Tipo.loadDocumento();
    this.listTipoAsignacion = Tipo.loadAsignacion();
    $("#tabs_evolucion_detalle").tabs();
    this.showTab('tab-tema');
  }

  public load(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.temaService.getById(id).subscribe(
          (tema) => {
            if (tema != null) {
              this.tema = tema;
              this.tema.asignados = this.tema.asignados.filter(s => (s.asgIdTipo == Estaticos.TIPO_ID_ASIGNACION_ESTUDIANTE || s.asgIdTipo == Estaticos.TIPO_ID_ASIGNACION_LECTORPLAN || s.asgIdTipo == Estaticos.TIPO_ID_ASIGNACION_LECTORPROYECTO));
            } 
          }

        )
      }
    })
  }

  loadComponent(idRsl: number) {
    const adItem = new AdItem(DocenteevolucionresoluciondialogComponent, { idRsl: idRsl });
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }
  
  openDialog(resolucion: Resolucion): void {
    this.loadComponent(resolucion.idRsl);
    $('#dialog').dialog({
      title: 'Detalle',
      modal: true,
      minWidth: 1000,
      resizable: false
    });
    Gestor.fn.positionDialog();
  }

  public parseDateToString(date: Date): String{
    return this.datepipe.transform(date, Estaticos.FORMAT_DATE);
  }

  public showTab(tabid: String){
    Gestor.fn.showTab(tabid);
  }

  public getNombreEstadoAsignadoLector(idEstado: number): String {
    return Estado.getNombreEstadoPorLista(idEstado, this.listEstadoAsignadoLector);
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

  public reporteTema(): void {
    this.reporteService.getReporteTema(this.tema.idPersona, this.tema.idTem).subscribe(x => {
      this.reporteDownload(x, "reporte.pdf");
    });
  }

  

}

import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Tema } from 'src/app/tema/tema';
import { Estado } from 'src/app/estado/Estado';
import { AdDirective } from 'src/app/Estudiante/estudiantetema/ad.directive';
import { TemaService } from 'src/app/tema/tema.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Resolucion } from 'src/app/resolucion/resolucion';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { UtesresoluciondialogComponentComponent } from './utesresoluciondialog-component.component';
import { AdItem } from 'src/app/Estudiante/estudiantetema/ad-item';
import { Tipo } from 'src/app/tipo/Tipo';
import { UtesresolucionnuevodialogComponent } from './utesresolucionnuevodialog.component';
import { parseDate, reporteDownload, Estaticos } from 'src/app/app.constants';
import swal from 'sweetalert2';
import Lang from '../../../assets/app.lang.json';
import { DatePipe } from '@angular/common';
import { Tiporesolucion } from 'src/app/tiporesolucion/tiporesolucion';
import { TiporesolucionService } from 'src/app/tiporesolucion/tiporesolucion.service';
import { ResolucionService } from 'src/app/resolucion/resolucion.service';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-utesresoluciondesarrollo',
  templateUrl: './utesresoluciondesarrollo.component.html'
})
export class UtesresoluciondesarrolloComponent implements OnInit {
  private tema: Tema = new Tema();
  private listEstadoEvolucion: Estado[] = [];
  private listTipoAsignacion: Tipo[] = [];
  private listTipoDocumento: Tipo[];

  private resolucionnew: Resolucion = new Resolucion();
  private listResolucionTipo: Tiporesolucion[] = [];

  public parseDate2 = parseDate;
  public reporteDownload = reporteDownload;

  @ViewChild(AdDirective, { static: true }) adHost: AdDirective;

  constructor(private temaService: TemaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private tiporesolucionService: TiporesolucionService,
    private resolucionService: ResolucionService,
    private datepipe: DatePipe) { }

  ngOnInit() {
    this.tema = new Tema();
    this.load();
    this.listEstadoEvolucion = Estado.loadEvolucion();
    this.listTipoAsignacion = Tipo.loadAsignacion();
    this.listTipoDocumento = Tipo.loadDocumento();
    $("#dialogAsignados").dialog({
      autoOpen: false
    });
  }

  public load(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.temaService.getById(id).subscribe(
          (tema) => {
            if (tema != null) {
              this.tema = tema;
              this.tema.asignados = this.tema.asignados.filter(
                (x) => (x.asgIdTipo == Estaticos.TIPO_ID_ASIGNACION_ESTUDIANTE ||
                  x.asgIdTipo == Estaticos.TIPO_ID_ASIGNACION_LECTORPLAN ||
                  x.asgIdTipo == Estaticos.TIPO_ID_ASIGNACION_LECTORPROYECTO)
              );
            }
          }

        )
      }
    })
  }

  public habilitaProceso(estado: number): boolean {
    if (estado != Estaticos.ESTADO_RESOLUCION_PROCESADO) {
      return false;
    }
    return true;
  }

  loadComponent(idRsl: number) {
    const adItem = new AdItem(UtesresoluciondialogComponentComponent, { idRsl: idRsl });
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }

  loadComponent2() {
    // const adItem = new AdItem(UtesresolucionnuevodialogComponent, {});
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    // const viewContainerRef = this.adHost.viewContainerRef;
    // viewContainerRef.clear();
    // const componentRef = viewContainerRef.createComponent(componentFactory);
    // (<AdComponent>componentRef.instance).data = adItem.data;
    this.resolucionnew = new Resolucion();
    this.tiporesolucionService.getAll().subscribe(
      (tiporesoluciones) => {
        this.listResolucionTipo = tiporesoluciones;
      }
    );
  }

  openResolucionDetail(resolucion: Resolucion): void {
    Gestor.fn.destroyDialog('dialogUtesResolucion');
    $('#dialogUtesResolucion').dialog({
      title: 'Detalle Resolución',
      modal: true,
      minWidth: 800,
      resizable: false
    });
    this.loadComponent(resolucion.idRsl);
    Gestor.fn.positionDialog();
  }

  openResolucionNew(): void {
    Gestor.fn.destroyDialog('dialogUtesResolucionNew');
    $('#dialogUtesResolucionNew').dialog({
      title: 'Nueva Resolución',
      modal: true,
      minWidth: 800,
      resizable: false
    });
    this.loadComponent2();
    Gestor.fn.positionDialog();
    $('#dialogUtesResolucionNew div.dialog-content').show();
  }

  openAsignados(): void {
    Gestor.fn.destroyDialog('dialogAsignados');
    $('#dialogAsignados').dialog({
      title: 'Asignados',
      modal: true,
      minWidth: 800,
      resizable: false
    });
    Gestor.fn.positionDialog();
  }

  public getNombreTipoAsignado(idTipo: number): String {
    return Tipo.getNombreTipoPorLista(idTipo, this.listTipoAsignacion);
  }

  // public getNombreEstadoPorLista(idEstado: number): String {
  //   return Estado.getNombreEstadoPorLista(idEstado, this.listEstadoHito);
  // }

  public getNombreTipoPorLista(idTipo: number): String {
    return Tipo.getNombreTipoPorLista(idTipo, this.listTipoDocumento);
  }

  public parseDateToString(date: Date): String {
    return this.datepipe.transform(date, Estaticos.FORMAT_DATE);
  }

  public UteResolucionCreate(): void {
    let validacion: Boolean = false;
    try {
      this.tiporesolucionService.getById(this.resolucionnew.idTipoResolucion).subscribe(
        (auxtipores) => {
          if (auxtipores != null) {
            this.resolucionnew.idTema = this.tema.idTem;
            this.resolucionnew.idTipoResolucion = auxtipores.idTrsl;
            this.resolucionnew.rslObservacion = this.resolucionnew.rslObservacion != null ? this.resolucionnew.rslObservacion.toUpperCase().trim() : this.resolucionnew.rslObservacion;
            this.resolucionnew.rslActivo = true;
            this.resolucionnew.rslIdEstado = Estaticos.ESTADO_RESOLUCION_CREADO;    
            if (this.resolucionnew.idTipoResolucion == Estaticos.ESTADO_TEMA_POST_APROBADO) {
              this.resolucionnew.rslIdEstado = Estaticos.ESTADO_RESOLUCION_PROCESADO;
            }
    
            this.resolucionService.UteResolucionCreate(this.resolucionnew).subscribe( 
              response => {
                if(response){
                  $('#dialogUtesResolucionNew').dialog('close');
                  swal.fire(Lang.messages.register_new, Lang.messages.MENSAJE_OK_REGISTRA, 'success');
                  this.ngOnInit();
                  validacion = true;        
                  if (this.resolucionnew.idTipoResolucion == Estaticos.ESTADO_TEMA_POST_CERRADO) {
                    this.tema.temIdEstado = Estaticos.ESTADO_TEMA_POST_CERRADO;
                  }
                  if (this.resolucionnew.idTipoResolucion == Estaticos.ESTADO_TEMA_POST_ANULADO) {
                    this.tema.temIdEstado = Estaticos.ESTADO_TEMA_POST_ANULADO;
                  }
                  if (this.resolucionnew.idTipoResolucion == Estaticos.ESTADO_TEMA_POST_PRORROGA) {
                    this.tema.temIdEstado = Estaticos.ESTADO_TEMA_POST_PRORROGA;
                  }
                  //cleanResolucion();
                  //reloadLists(4, "");                  
                }else{
                  swal.fire(Lang.messages.register_new, Lang.messages.MENSAJE_ERROR_REGISTRA, 'error');
                }
              }
            )
          }
        }
      )
    } catch (error) {
      console.error('Here is the error message', error);
    }
  }





}

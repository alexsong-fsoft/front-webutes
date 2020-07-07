import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { AdDirective } from 'src/app/Estudiante/estudiantetema/ad.directive';
import { Router, ActivatedRoute } from '@angular/router';
import { Tema } from 'src/app/tema/tema';
import { TemaService } from 'src/app/tema/tema.service';
import { AdItem } from 'src/app/Estudiante/estudiantetema/ad-item';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { DocentehitodialogComponent } from './docentehitodialog.component';
import { Estado } from 'src/app/estado/Estado';
import { Tipo } from 'src/app/tipo/Tipo';
import { parseDate, reporteDownload, Estaticos } from 'src/app/app.constants';
import { DatePipe } from '@angular/common';
import { ReporteService } from 'src/app/reporte/reporte.service';
import { Hito } from 'src/app/hito/hito';
import { HitoService } from 'src/app/hito/hito.service';
import swal from 'sweetalert2';
import Lang from '../../../assets/app.lang.json';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-docentehitodesarrollo',
  templateUrl: './docentehitodesarrollo.component.html'
})
export class DocentehitodesarrolloComponent implements OnInit {
  private tema: Tema = new Tema();
  private hito: Hito = new Hito();
  private listEstadoHito: Estado[] = [];
  private listEstadoHitoAccion: Estado[] = [];
  private listTipoDocumento: Tipo[];
  public parseDate2 = parseDate;
  public reporteDownload = reporteDownload;

  @ViewChild(AdDirective, { static: true }) adHost: AdDirective;

  constructor(private temaService: TemaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private hitoService: HitoService,
    private reporteService: ReporteService,
    private datepipe: DatePipe) { }

  ngOnInit() {
    this.load();
    this.listEstadoHito = Estado.loadHito();
    this.listEstadoHitoAccion = Estado.loadHitoAccion();
    this.listTipoDocumento = Tipo.loadDocumento();
  }

  public load(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.temaService.getById(id).subscribe(
          (tema) => {
            if (tema != null) {
              this.tema = tema;
            }
          }

        )
      }
    })
  }

  loadComponent(idHit: number) {
    const adItem = new AdItem(DocentehitodialogComponent, { idHit: idHit });
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }

  loadComponent2(idHit: number) {
    this.hito = new Hito();
    if (idHit) {
      this.hitoService.getById(idHit).subscribe((hito) => this.hito = hito)
    }
  }

  openDialogDetalle(hito: Hito): void {
    Gestor.fn.destroyDialog('dialog');
    $('#dialog').dialog({
      title: 'Detalle',
      modal: true,
      minWidth: 800,
      resizable: false
    });
    console.log(hito);
    this.loadComponent(hito.idHit);
    Gestor.fn.positionDialog();
  }

  openDialogEditar(hito: Hito): void {
    Gestor.fn.destroyDialog('dialogEditar');
    $('#dialogEditar').dialog({
      title: 'Validación de hito',
      modal: true,
      minWidth: 800,
      resizable: false
    });
    this.loadComponent2(hito.idHit);
    Gestor.fn.positionDialog();
    $('#dialogEditar div.dialog-content').show();
  }

  public getNombreEstadoPorLista(idEstado: number): String {
    return Estado.getNombreEstadoPorLista(idEstado, this.listEstadoHito);
  }

  public getNombreTipoPorLista(idTipo: number): String {
    return Tipo.getNombreTipoPorLista(idTipo, this.listTipoDocumento);
  }

  public habilitaBotonHitoEstadoEstudiante(estado: number, validado: Boolean): boolean {
    if (estado != Estaticos.ESTADO_EVOLUCION_CREADO && validado == true) {
      return false;
    }
    return true;
  }

  public parseDateToString(date: Date): String {
    return this.datepipe.transform(date, Estaticos.FORMAT_DATE);
  }

  public updateTemaHitoDocente(): void {
    let validacion: Boolean = false;
    try {
      let utilfecha = new Date();
      this.hito.hitFechavalida = utilfecha;
      this.hito.hitValida = true;
      this.hitoService.update(this.hito).subscribe( 
        response => {
          if(response){
            $('#dialogEditar').dialog('close');
            swal.fire(Lang.messages.register_new, Lang.messages.MENSAJE_OK_ACTUALIZA, 'success');
            //this.router.navigate(['/dashboard/docentetema']);
            this.ngOnInit();
            validacion = true;
          }else{
            swal.fire(Lang.messages.register_new, Lang.messages.MENSAJE_ERROR_ACTUALIZA, 'error');
          }
        }
      )
    } catch (error) {
      console.error('Here is the error message', error);
    }
  }

  public reporteHito(): void {
    this.reporteService.getReporteHito(this.tema.idPersona, this.tema.idTem).subscribe(x => {
      this.reporteDownload(x, "reporteHito.pdf");
    });
  }

}

import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdDirective } from '../estudiantetema/ad.directive';
import { AdItem } from '../estudiantetema/ad-item';
import { AdComponent } from '../estudiantetema/ad.component';
import { Tema } from 'src/app/tema/tema';
import { TemaService } from 'src/app/tema/tema.service';
import { EstudiantehitodialogComponent } from './estudiantehitodialog.component';
import { EstudiantehitodialogeditarComponent } from './estudiantehitodialogeditar.component';
import { Hito } from 'src/app/hito/hito';
import { Estado } from 'src/app/estado/Estado';
import { Tipo } from 'src/app/tipo/Tipo';
import { parseDate, reporteDownload, Estaticos } from 'src/app/app.constants';
import { HitoService } from 'src/app/hito/hito.service';
import { ReporteService } from 'src/app/reporte/reporte.service';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
import Lang from '../../../assets/app.lang.json';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-estudiantehitodesarrollo',
  templateUrl: './estudiantehitodesarrollo.component.html'
})
export class EstudiantehitoDesarrolloComponent implements OnInit {
  private tema: Tema = new Tema();
  private hito: Hito = new Hito();
  private listEstadoHito: Estado[] = [];
  private listTipoDocumento: Tipo[];
  public parseDate2 = parseDate;
  public reporteDownload = reporteDownload;

  ads: AdItem[];

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
    const adItem = new AdItem(EstudiantehitodialogComponent, { idHit: idHit });
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }

  loadComponent2() {
    this.hito = new Hito();
    this.hitoService.getSecuencialHito(this.tema.idTem).subscribe(
      (secuencia) => {
        if (secuencia != null) {
          this.hito.hitCodigo = "HIT" + secuencia;
        } 
      }
    )
  }

  openDialogDetalle(hito: Hito): void {
    Gestor.fn.destroyDialog('dialog');
    $('#dialog').dialog({
      title: 'Detalle',
      modal: true,
      minWidth: 800,
      resizable: false
    });
    this.loadComponent(hito.idHit);
    Gestor.fn.positionDialog();
  }

  openDialogCrear(): void {
    Gestor.fn.destroyDialog('dialogCrear');
    $('#dialogCrear').dialog({
      title: 'Registro de hito',
      modal: true,
      minWidth: 800,
      resizable: false
    });
    this.loadComponent2();
    Gestor.fn.positionDialog();
    $('#dialogCrear div.dialog-content').show();
  }

  public getNombreEstadoPorLista(idEstado: number): String {
    return Estado.getNombreEstadoPorLista(idEstado, this.listEstadoHito);
  }

  public getNombreTipoPorLista(idTipo: number): String {
    return Tipo.getNombreTipoPorLista(idTipo, this.listTipoDocumento);
  }

  public parseDateToString(date: Date): String {
    return this.datepipe.transform(date, Estaticos.FORMAT_DATE);
  }

  public saveTemaHito(): void {
    let validacion: Boolean = false;
    try {
      let utilfecha = new Date();
      this.hito.idTema = this.tema.idTem;
      this.hito.hitDescripcion = this.hito.hitDescripcion.toUpperCase().trim();
      this.hito.hitSecuencia = Number(this.hito.hitCodigo.substring(2));
      this.hito.hitIdEstado = Estaticos.ESTADO_HITO_CREADO;
      
      this.hitoService.create(this.hito).subscribe( 
        response => {
          if(response){
            $('#dialogCrear').dialog('close');
            swal.fire(Lang.messages.register_new, Lang.messages.MENSAJE_OK_REGISTRA, 'success');
            //this.router.navigate(['/dashboard/docentetema']);
            this.ngOnInit();
            validacion = true;
          }else{
            swal.fire(Lang.messages.register_new, Lang.messages.MENSAJE_ERROR_REGISTRA, 'error');
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


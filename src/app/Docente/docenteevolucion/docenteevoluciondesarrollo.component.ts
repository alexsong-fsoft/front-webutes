import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdDirective } from 'src/app/Estudiante/estudiantetema/ad.directive';
import { Tema } from 'src/app/tema/tema';
import { TemaService } from 'src/app/tema/tema.service';
import { AdItem } from 'src/app/Estudiante/estudiantetema/ad-item';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { Evolucion } from 'src/app/evolucion/evolucion';
import { DocenteevoluciondialogComponent } from './docenteevoluciondialog.component';
import { DocenteevolucioneditardialogComponent } from './docenteevolucioneditardialog.component';
import { Estado } from 'src/app/estado/Estado';
import { Estaticos } from 'src/app/app.constants';
import { Tipo } from 'src/app/tipo/Tipo';
import { DatePipe } from '@angular/common';
import { EvolucionService } from 'src/app/evolucion/evolucion.service';
import { parseDate } from 'src/app/app.constants';
import { reporteDownload } from 'src/app/app.constants';
import swal from 'sweetalert2';
import Lang from '../../../assets/app.lang.json';
import { ReporteService } from 'src/app/reporte/reporte.service';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-docenteevoluciondesarrollo',
  templateUrl: './docenteevoluciondesarrollo.component.html'
})
export class DocenteevoluciondesarrolloComponent implements OnInit {
  private tema: Tema = new Tema();
  private evolucion: Evolucion = new Evolucion();
  private evolucionNew: Evolucion = new Evolucion();
  private enEvolucionPorcentajeActual: Evolucion = new Evolucion();
  private listEstadoEvolucion: Estado[] = [];
  private listEstadoEvolucionAccion: Estado[];
  private listTipoDocumento: Tipo[];
  public parseDate2 = parseDate;
  public reporteDownload = reporteDownload;

  @ViewChild(AdDirective, { static: true }) adHost: AdDirective;

  constructor(private temaService: TemaService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private componentFactoryResolver: ComponentFactoryResolver,
        private evolucionService: EvolucionService, 
        private reporteService: ReporteService,
        private datepipe: DatePipe) { }

  ngOnInit() {
    this.load();
    this.listEstadoEvolucion = Estado.loadEvolucion();
    this.listTipoDocumento = Tipo.loadDocumento();
    this.listEstadoEvolucionAccion = Estado.loadEvolucionAccion();
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

  public getNombreEstadoEvolucion(idEstado: number): String {
    return Estado.getNombreEstadoPorLista(idEstado, this.listEstadoEvolucion);
  }

  public habilitaBotonEvolucionEstado(estado: number): boolean {
    if (estado != Estaticos.ESTADO_EVOLUCION_CREADO && estado != Estaticos.ESTADO_EVOLUCION_REAGENDA) {
      return false;
    }
    return true;
  }

  public getNombreTipoPorLista(idTipo: number): String {
    return Tipo.getNombreTipoPorLista(idTipo, this.listTipoDocumento);
  }

  public parseDateToString(date: Date): String{
    return this.datepipe.transform(date, Estaticos.FORMAT_DATE);
  }

  loadComponent(idEvl: number) {
    const adItem = new AdItem(DocenteevoluciondialogComponent, { idEvl: idEvl });
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }

  loadComponent2(idEvl: number) {
    // const adItem = new AdItem(DocenteevolucioneditardialogComponent, { idEvl: idEvl });
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    // const viewContainerRef = this.adHost.viewContainerRef;
    // viewContainerRef.clear();
    // const componentRef = viewContainerRef.createComponent(componentFactory);
    // (<AdComponent>componentRef.instance).data = adItem.data;
    this.evolucion = new Evolucion();
    if (idEvl) {
      this.evolucionService.getById(idEvl).subscribe((evolucion) => this.evolucion = evolucion)
    }
  }

  loadComponent3() {
    this.evolucionNew = new Evolucion();
    this.evolucionService.getSecuencialEvolucion(this.tema.idTem).subscribe(
      (secuencia) => {
        if (secuencia != null) {
          this.evolucionNew.evlCodigo = "EVL" + secuencia;
        } 
      }
    )
  }
  
  loadComponent4(idTema: number) {
    this.enEvolucionPorcentajeActual = new Evolucion();
    if (idTema) {
      this.evolucionService.getUltimoRegistroporTema(idTema, Estaticos.ESTADO_EVOLUCION_ASISTENCIA).subscribe(
        (idevolucion) => {
          if (idevolucion != null) {
            this.evolucionService.getById(idevolucion).subscribe((evolucion) => this.enEvolucionPorcentajeActual = evolucion)
          }
        }
      )
    }
  }
  
  openDialogDetalle(evolucion: Evolucion): void {
    Gestor.fn.destroyDialog('dialog');
    $('#dialog').dialog({
      title: 'Detalle',
      modal: true,
      minWidth: 800,
      resizable: false
    });    
    this.loadComponent(evolucion.idEvl);
    Gestor.fn.positionDialog();
  }
  
  openDialogEditar(evolucion: Evolucion): void {
    Gestor.fn.destroyDialog('dialogEditar');
    $('#dialogEditar').dialog({
      title: 'Registro de Desarrollo de Cita',
      modal: true,
      minWidth: 800,
      resizable: false
    });
    this.loadComponent2(evolucion.idEvl);
    Gestor.fn.positionDialog();
    $('#dialogEditar div.dialog-content').show();
  }

  openDialogCrear(): void {
    Gestor.fn.destroyDialog('dialogCrear');
    $('#dialogCrear').dialog({
      title: 'Registro de Cita',
      modal: true,
      minWidth: 800,
      resizable: false
    });
    this.loadComponent3();
    Gestor.fn.positionDialog();
    $('#dialogCrear div.dialog-content').show();
  }

  openDialogUltimoAvance(idTema: number): void {
    //Gestor.fn.destroyDialog('dialogUltimoAvance');
    $('#dialogUltimoAvance').dialog({
      title: 'Datos última reunión',
      modal: true,
      minWidth: 600,
      resizable: false
    });
    console.log(idTema);
    this.loadComponent4(idTema);
    $('#dialogUltimoAvance div.dialog-content').show();
  }

  public updateTemaEvolucionEstudiante(): void {
    let utilfecha = new Date();
    this.evolucion.evlValida = true;
    this.evolucion.evlFechaValida = utilfecha;
    this.evolucionService.update(this.evolucion).subscribe(
      response => {
        //this.router.navigate(['/dashboard/docenteevoluciondesarrollo']);
        $('#dialogEditar').dialog('close');
        swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'success');
        this.ngOnInit();
      }
    )
  }

  public saveTemaEvolucion() {
    let validacion: Boolean = false;
      try {
        let fecha: String = this.datepipe.transform(this.evolucionNew.evlFechaCita, Estaticos.FORMAT_DATE_PATH);
        this.evolucionService.getEntidadaEvolucionPorFecha(this.tema.idTem, this.evolucionNew.evlHoracita, fecha).subscribe(
          (evolucionList) => {
            if (evolucionList != null && evolucionList.length > 0) {
              validacion = false;
              swal.fire(Lang.messages.register_new, "Ya existe una cita en la misma fecha y hora", 'warning');
            } else {
              let utilfecha = new Date();
              this.evolucionNew.idTema = this.tema.idTem;
              this.evolucionNew.evlFechaRegistro = utilfecha;
              //this.evolucionNew.setEvlFechacita(evfcita);
              //this.evolucionNew.setEvlHoracita(utilfecha.get_HHmm(evhora));
              this.evolucionNew.evlIdEstado = Estaticos.ESTADO_EVOLUCION_CREADO;
              this.evolucionNew.evlSecuencia =  Number(this.evolucionNew.evlCodigo.substring(2));
              this.evolucionNew.evlActivo = true;
              this.evolucionNew.evlTareas = (this.evolucionNew.evlTareas != null ? this.evolucionNew.evlTareas.toUpperCase().trim() : this.evolucionNew.evlTareas);
              this.evolucionService.create(this.evolucionNew).subscribe( 
                response => {
                  if(response){
                    $('#dialogCrear').dialog('close');
                    swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'success');
                    //this.router.navigate(['/dashboard/docentetema']);
                    this.ngOnInit();
                    validacion = true;
                  }else{
                    swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'error');
                  }
                }
              )
            }
          }
        )
      } catch (error) {
        console.error('Here is the error message', error);
        return false;
      }
  }


  public reporteEvolucion(): void {
    this.reporteService.getReporteEvolucion(this.tema.idPersona, this.tema.idTem).subscribe(x => {
      this.reporteDownload(x, "reporteEvolucion.pdf");
    });
  }

  
}

import { Component, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, RouterEvent, NavigationEnd } from '@angular/router';
import { AdDirective } from '../estudiantetema/ad.directive';
import { AdItem } from '../estudiantetema/ad-item';
import { AdComponent } from '../estudiantetema/ad.component';
import { Tema } from 'src/app/tema/tema';
import { TemaService } from 'src/app/tema/tema.service';
import { Evolucion } from 'src/app/evolucion/evolucion';
import { Estudianteevoluciondialog2Component } from './estudianteevoluciondialog2.component';
import { EstudianteevoluciondialogeditarComponent } from './estudianteevoluciondialogeditar.component';
import { Estado } from 'src/app/estado/Estado';
import { Subject } from 'rxjs';
import { filter, pairwise, startWith, takeUntil } from 'rxjs/operators';
import { Tipo } from 'src/app/tipo/Tipo';
import { parseDate, reporteDownload, Estaticos } from 'src/app/app.constants';
import { EvolucionService } from 'src/app/evolucion/evolucion.service';
import { ReporteService } from 'src/app/reporte/reporte.service';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
import Lang from '../../../assets/app.lang.json';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-estudianteevoluciondesarrollo',
  templateUrl: './estudianteevoluciondesarrollo.component.html'
})
export class EstudianteevolucionDesarrolloComponent implements OnInit, OnDestroy {
  private tema: Tema = new Tema();
  private evolucion: Evolucion = new Evolucion();
  private listEstadoEvolucion: Estado[] = [];
  private listEstadoEvolucionAccion: Estado[];
  private listTipoDocumento: Tipo[];
  public parseDate2 = parseDate;
  public reporteDownload = reporteDownload;

  ads: AdItem[];
  public destroyed = new Subject<any>();

  @ViewChild(AdDirective, { static: true }) adHost: AdDirective;

  constructor(private temaService: TemaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private evolucionService: EvolucionService,
    private reporteService: ReporteService,
    private datepipe: DatePipe) { }

  ngOnInit() {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      pairwise(),
      filter((events: RouterEvent[]) => events[0].url === events[1].url),
      startWith('initial call'),
      takeUntil(this.destroyed)
    ).subscribe(() => {
      this.load();
      this.listEstadoEvolucion = Estado.loadEvolucion();
      this.listTipoDocumento = Tipo.loadDocumento();
      this.listEstadoEvolucionAccion = Estado.loadEvolucionAccion();
    })
    // this.load();
    // this.listEstadoEvolucion = Estado.loadEvolucion();
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
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

  public getNombreTipoPorLista(idTipo: number): String {
    return Tipo.getNombreTipoPorLista(idTipo, this.listTipoDocumento);
  }

  public parseDateToString(date: Date): String {
    return this.datepipe.transform(date, Estaticos.FORMAT_DATE);
  }

  loadComponent(idEvl: number) {
    const adItem = new AdItem(Estudianteevoluciondialog2Component, { idEvl: idEvl });
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }

  loadComponent2(idEvl: number) {
    // const adItem = new AdItem(EstudianteevoluciondialogeditarComponent, { idEvl: idEvl });
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
      title: 'Regitro de tarea',
      modal: true,
      minWidth: 800,
      resizable: false
    });
    this.loadComponent2(evolucion.idEvl);
    Gestor.fn.positionDialog();
    $('#dialogEditar div.dialog-content').show();
  }

  closeDialog(): void {
    $('#dialogEditar').dialog('close');
  }

  public updateTemaEvolucionEstudiante(): void {
    let utilfecha = new Date();
    this.evolucion.evlValida = true;
    this.evolucion.evlFechaValida = utilfecha;
    this.evolucionService.update(this.evolucion).subscribe(
      response => {
        $('#dialogEditar').dialog('close');
        swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'success');
        //this.router.navigate([`/dashboard/estudianteevoluciondesarrollo/${this.evolucion.tema.idTem}`]);
        this.ngOnInit();
      }
    )
  }

  public reporteEvolucion(): void {
    this.reporteService.getReporteEvolucion(this.tema.idPersona, this.tema.idTem).subscribe(x => {
      this.reporteDownload(x, "reporteEvolucion.pdf");
    });
  }

}


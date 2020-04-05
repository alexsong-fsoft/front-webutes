import { Component, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { AdDirective } from 'src/app/Estudiante/estudiantetema/ad.directive';
import { UserService } from 'src/app/login/user.service';
import { AsignadoService } from 'src/app/asignado/asignado.service';
import { Sysusuario } from 'src/app/sysusuario/sysusuario';
import { Periodo } from 'src/app/periodo/periodo';
import { PeriodoService } from 'src/app/periodo/periodo.service';
import { Convocatoria } from 'src/app/convocatoria/convocatoria';
import { ConvocatoriaService } from 'src/app/convocatoria/convocatoria.service';
import { Inscripcion } from 'src/app/inscripcion/inscripcion';
import { InscripcionService } from 'src/app/inscripcion/inscripcion.service';
import { Cuestionario } from 'src/app/cuestionario/cuestionario';
import { CuestionarioService } from 'src/app/cuestionario/cuestionario.service';
import { AdItem } from 'src/app/Estudiante/estudiantetema/ad-item';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { UtesconfiguracionnewperiodoComponent } from './utesconfiguracionnewperiodo.component';
import { UtesconfiguracionnewconvocatoriaComponent } from './utesconfiguracionnewconvocatoria.component';
import { UtesconfiguracionnewinscripcionComponent } from './utesconfiguracionnewinscripcion.component';
import { UtesconfiguracionnewrequisitoComponent } from './utesconfiguracionnewrequisito.component';
import { Subject } from 'rxjs';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter, pairwise, startWith, takeUntil } from 'rxjs/operators';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-utesconfiguracion',
  templateUrl: './utesconfiguracion.component.html'
})
export class UtesconfiguracionComponent implements OnInit, OnDestroy {
  private titulo: string = "Configuraciones";
  public usserLogged: Sysusuario = null;
  listPeriodo: Periodo[];
  listConvocatoria: Convocatoria[];
  listInscripcion: Inscripcion[];
  listCuestionario: Cuestionario[];
  public destroyed = new Subject<any>();

  @ViewChild(AdDirective, {static: true}) adHost: AdDirective;
  
  constructor(private userService: UserService,
    private convocatoriaService: ConvocatoriaService, 
    private periodoService: PeriodoService, 
    private inscripcionService: InscripcionService,
    private cuestionarioService: CuestionarioService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router
    ) { }

  ngOnInit() {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      pairwise(),
      filter((events: RouterEvent[]) => events[0].url === events[1].url),
      startWith('initial call'),
      takeUntil(this.destroyed)
    ).subscribe(() => {
      console.log('cargando....');
      this.usserLogged = this.userService.getUserLoggedIn();
      this.reset();
      this.load();
    })
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  reset(): void{
    this.listPeriodo = [];
    this.listConvocatoria = [];
    this.listInscripcion = [];
    this.listCuestionario = [];
    $("#tabs_docentetema").tabs();
    this.showTab('tab-mistemas');
  }

  load(): void {
    this.getListPeriodo();
    this.getListConvocatoria();
    this.getListInscripcion();
    this.getListCuestionario();
  }

  getListPeriodo(): Periodo[] {
    this.periodoService.getAll2().subscribe(
      (periodos: Periodo[]) => {
        this.listPeriodo = periodos;
      }
    );
    return this.listPeriodo;
  }

  getListConvocatoria(): Convocatoria[] {
    this.convocatoriaService.getAll().subscribe(
      (convocatorias: Convocatoria[]) => {
        this.listConvocatoria = convocatorias;
      }
    );
    return this.listConvocatoria;
  }

  getListInscripcion(): Inscripcion[] {
    this.inscripcionService.getAll().subscribe(
      (inscripciones: Inscripcion[]) => {
        this.listInscripcion = inscripciones;
      }
    );
    return this.listInscripcion;
  }

  getListCuestionario(): Cuestionario[] {
    this.cuestionarioService.getAll().subscribe(
      (cuestionarios: Cuestionario[]) => {
        this.listCuestionario = cuestionarios;
      }
    );
    return this.listCuestionario;
  }

  public showTab(tabid: String){
    $('#tabs_docentetema .tab-pane').hide();
    $('#'+tabid).show();
  }

  loadComponentPeriodo(idPrd: number) {
    const adItem = new AdItem(UtesconfiguracionnewperiodoComponent, {idPrd: idPrd});
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }

  dialogCreatePeriodo(): void {
    this.loadComponentPeriodo(null);
    try {
      $('#dialogUtesConfiguracion').dialog('destroy');
    } catch (error) {
      console.log(error);
    }
    $('#dialogUtesConfiguracion').dialog({
      title: 'Registro de Periodo',
      modal: true,
      minWidth: 500,
      resizable: false
    });
    Gestor.fn.positionDialog();
  }

  dialogEditPeriodo(periodoSelected: Periodo): void {
    this.loadComponentPeriodo(periodoSelected.idPrd);
    try {
      $('#dialogUtesConfiguracion').dialog('destroy');
    } catch (error) {
      console.log(error);
    }
    $('#dialogUtesConfiguracion').dialog({
      title: 'Editar Periodo',
      modal: true,
      minWidth: 500,
      resizable: false
    });
    Gestor.fn.positionDialog();
  }

  loadComponentConvocatoria(idCon: number) {
    const adItem = new AdItem(UtesconfiguracionnewconvocatoriaComponent, {idCon: idCon});
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }

  dialogCreateConvocatoria(): void {
    this.loadComponentConvocatoria(null);
    try {
      $('#dialogUtesConfiguracion').dialog('destroy');
    } catch (error) {
      console.log(error);
    }
    $('#dialogUtesConfiguracion').dialog({
      title: 'Registro de Convocatoria',
      modal: true,
      minWidth: 500,
      resizable: false
    });
    Gestor.fn.positionDialog();
  }

  dialogEditConvocatoria(convocatoriaSelected: Convocatoria): void {
    this.loadComponentConvocatoria(convocatoriaSelected.idCon);
    try {
      $('#dialogUtesConfiguracion').dialog('destroy');
    } catch (error) {
      console.log(error);
    }
    $('#dialogUtesConfiguracion').dialog({
      title: 'Editar Convocatoria',
      modal: true,
      minWidth: 500,
      resizable: false
    });
    Gestor.fn.positionDialog();
  }

  loadComponentInscripcion(idIns: number) {
    const adItem = new AdItem(UtesconfiguracionnewinscripcionComponent, {idIns: idIns});
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }

  dialogCreateInscripcion(): void {
    this.loadComponentInscripcion(null);
    try {
      $('#dialogUtesConfiguracion').dialog('destroy');
    } catch (error) {
      console.log(error);
    }
    $('#dialogUtesConfiguracion').dialog({
      title: 'Registro de Inscripcion',
      modal: true,
      minWidth: 500,
      resizable: false
    });
    Gestor.fn.positionDialog();
  }

  dialogEditInscripcion(inscripcionSelected: Inscripcion): void {
    this.loadComponentInscripcion(inscripcionSelected.idIns);
    try {
      $('#dialogUtesConfiguracion').dialog('destroy');
    } catch (error) {
      console.log(error);
    }
    $('#dialogUtesConfiguracion').dialog({
      title: 'Editar Inscripcion',
      modal: true,
      minWidth: 500,
      resizable: false
    });
    Gestor.fn.positionDialog();
  }

  
  loadComponentCuestionario(idCue: number) {
    const adItem = new AdItem(UtesconfiguracionnewrequisitoComponent, {idCue: idCue});
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }

  dialogCreateCuestionario(): void {
    this.loadComponentCuestionario(null);
    try {
      $('#dialogUtesConfiguracion').dialog('destroy');
    } catch (error) {
      console.log(error);
    }
    $('#dialogUtesConfiguracion').dialog({
      title: 'Registro de Requisito',
      modal: true,
      minWidth: 500,
      resizable: false
    });
    Gestor.fn.positionDialog();
  }

  dialogEditCuestionario(cuestionarioSelected: Cuestionario): void {
    this.loadComponentCuestionario(cuestionarioSelected.idCue);
    try {
      $('#dialogUtesConfiguracion').dialog('destroy');
    } catch (error) {
      console.log(error);
    }
    $('#dialogUtesConfiguracion').dialog({
      title: 'Editar Requisito',
      modal: true,
      minWidth: 500,
      resizable: false
    });
    Gestor.fn.positionDialog();
  }
}

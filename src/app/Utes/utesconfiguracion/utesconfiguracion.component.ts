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
import { Estaticos, parseDate } from 'src/app/app.constants';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
import Lang from '../../../assets/app.lang.json';
import { SysusuarioService } from 'src/app/sysusuario/sysusuario.service';
import { SeleccionService } from 'src/app/seleccion/seleccion.service';
import { Seleccion } from 'src/app/seleccion/seleccion';

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
  private listPeriodo: Periodo[];
  private listConvocatoria: Convocatoria[];
  private listInscripcion: Inscripcion[];
  private listCuestionario: Cuestionario[];
  //periodo
  private periodo: Periodo = new Periodo();
  private listUsuarioDocente: Sysusuario[];
  private listSeleccion: Seleccion[];

  public destroyed = new Subject<any>();
  public parseDate2 = parseDate;

  @ViewChild(AdDirective, {static: true}) adHost: AdDirective;
  
  constructor(private userService: UserService,
    private convocatoriaService: ConvocatoriaService, 
    private periodoService: PeriodoService, 
    private inscripcionService: InscripcionService,
    private cuestionarioService: CuestionarioService,
    private sysusuarioService: SysusuarioService,
    private seleccionService: SeleccionService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router,
    private datepipe: DatePipe
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

  loadComponentPeriodo(idPrd: number) {
    // const adItem = new AdItem(UtesconfiguracionnewperiodoComponent, {idPrd: idPrd});
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    // const viewContainerRef = this.adHost.viewContainerRef;
    // viewContainerRef.clear();
    // const componentRef = viewContainerRef.createComponent(componentFactory);
    // (<AdComponent>componentRef.instance).data = adItem.data;
    this.periodo = new Periodo();
    if (idPrd) {
      this.periodoService.getById(idPrd).subscribe(
        (periodo) => {
          if (periodo != null) {
            this.periodo = periodo; 
          } 
        }
      )
    }
  }

  dialogCreatePeriodo(): void {
    Gestor.fn.destroyDialog('dialogPeriodo');
    $('#dialogPeriodo').dialog({
      title: 'Registro de Periodo',
      modal: true,
      minWidth: 500,
      resizable: false
    });
    this.loadComponentPeriodo(null);
    Gestor.fn.positionDialog();
    $('#dialogPeriodo div.dialog-content').show();
  }

  dialogEditPeriodo(periodoSelected: Periodo): void {
    Gestor.fn.destroyDialog('dialogPeriodo');
    $('#dialogPeriodo').dialog({
      title: 'Editar Periodo',
      modal: true,
      minWidth: 500,
      resizable: false
    });
    this.loadComponentPeriodo(periodoSelected.idPrd);
    Gestor.fn.positionDialog();
    $('#dialogPeriodo div.dialog-content').show();
  }

  loadComponentPeriodoDocente(idPrd: number){
    this.getListUsuarioDocente(idPrd);

  }

  public getListUsuarioDocente(idPrd: number): void {
    this.sysusuarioService.getAllByNombrePerfil2(Estaticos.TIPO_LABEL_PERFIL_DOCENTE).subscribe(
      (sysusuarios) => {
        this.listUsuarioDocente = sysusuarios;
        this.listUsuarioDocente.forEach(usr => {
          this.seleccionService.getByPerioNumIdPersona(idPrd, usr.idUsr).subscribe(
            (seleccion) => {
              if(seleccion != null)
                usr.usrClave = "ASIGNADO";
              else
                usr.usrClave = "NO ASIGNADO";
            }
          );
        });
      }
    );
  }

  dialogPeriodoDocente(periodoSelected: Periodo): void {
    Gestor.fn.destroyDialog('dialogPeriodoDocente');
    $('#dialogPeriodoDocente').dialog({
      title: 'Añadir docentes al periodo',
      modal: true,
      minWidth: 800,
      resizable: false
    });
    this.loadComponentPeriodoDocente(periodoSelected.idPrd);
    Gestor.fn.positionDialog();
    $('#dialogPeriodoDocente div.dialog-content').show();
  }

  loadComponentPeriodoDocenteHora(idPrd: number){
    this.getListSeleccion(idPrd);

  }

  public getListSeleccion(idPrd: number){
    this.seleccionService.getAllByIdPeriodo(idPrd).subscribe(
      (listSeleccion) => {
        this.listSeleccion = listSeleccion;
      }
    );
  }

  dialogPeriodoDocenteHora(periodoSelected: Periodo): void {
    Gestor.fn.destroyDialog('dialogPeriodoDocenteHora');
    $('#dialogPeriodoDocenteHora').dialog({
      title: 'Editar horas de docentes añadidos',
      modal: true,
      minWidth: 800,
      resizable: false
    });
    this.loadComponentPeriodoDocenteHora(periodoSelected.idPrd);
    Gestor.fn.positionDialog();
    $('#dialogPeriodoDocenteHora div.dialog-content').show();
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
      minWidth: 700,
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
      minWidth: 700,
      resizable: false
    });
    Gestor.fn.positionDialog();
  }

  public showTab(tabid: String){
    $('#tabs_docentetema .tab-pane').hide();
    $('#'+tabid).show();
  }

  public parseDateToString(date: Date): String {
    return this.datepipe.transform(date, Estaticos.FORMAT_DATE);
  }

  public createPeriodo(): boolean {
    let validacion:boolean = false;
    try {
      console.log(this.periodo);
      if (this.periodo.prdNumero != null && this.periodo.prdNumero != 0) {
        this.periodoService.getAllByNumero(this.periodo.prdNumero).subscribe(
          (periodos) => {
            if (periodos == null || periodos.length == 0) {
              this.periodoService.create(this.periodo).subscribe( 
                response => {
                  if(response){
                    $('#dialogPeriodo').dialog('close');
                    swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_OK_REGISTRA, 'success');
                    validacion = true;
                    //this.router.navigate(['/dashboard/utesconfiguracion']);
                    this.ngOnInit();
                  } else {
                    swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_ERROR_REGISTRA, 'warning');
                  }
                }
              );
            }
            else {
              swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_ERROR_EXISTE, 'warning');
            }
          }
        );        
      } else {
        swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_ERROR_REGISTRA_CERO, 'warning');
      }
    } catch (error) {
      console.error('Here is the error message', error);
      return false;
    }
    return validacion;
  }

  public updatePeriodo(): boolean {
    let validacion:boolean = false;
    try {
      console.log(this.periodo);
      this.periodoService.update(this.periodo).subscribe( 
        response => {
          if(response){
            $('#dialogPeriodo').dialog('close');
            swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_OK_ACTUALIZA, 'success');
            validacion = true;
            //this.router.navigate(['/dashboard/utesconfiguracion']);
            this.ngOnInit();
          } else {
            swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_ERROR_ACTUALIZA, 'warning');
          }
        }
      );
    } catch (error) {
      console.error('Here is the error message', error);
      return false;
    }
    return validacion;
  }
}

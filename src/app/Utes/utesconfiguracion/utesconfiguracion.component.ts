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
import { Sysconfiguracion } from 'src/app/sysconfiguracion/sysconfiguracion';
import { SysconfiguracionService } from 'src/app/sysconfiguracion/sysconfiguracion.service';
import { Tipo } from 'src/app/tipo/Tipo';

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
  private listUsuarioDocenteSeleccion: Sysusuario[] = [];
  private listSeleccion: Seleccion[];
  //convocatoria
  private convocatoria: Convocatoria = new Convocatoria();
  private enconfigura: Sysconfiguracion = new Sysconfiguracion();
  private PARTE_CONFIG: String = "PKCONV";
  private CONFIG_TIPO: String = "BOTON";
  private PARTE_CONV: String = "CONV";
  private listPeriodoActivo: Periodo[];
  //inscripcion
  private inscripcion: Inscripcion = new Inscripcion();
  private PRE_SEC: String = "INSCRI";
  //cuestionario
  private cuestionario: Cuestionario = new Cuestionario();
  private listTipoRequisito: Tipo[] = [];
  //private listInscripcion: Inscripcion[] = [];

  
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
    private sysconfiguracionService: SysconfiguracionService,
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
    this.loadPeriodoActivo();
    this.listTipoRequisito = Tipo.loadCuestionario();
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

  loadComponentPeriodoDocente(periodoSelected: Periodo){
    this.periodo = periodoSelected;
    this.listUsuarioDocenteSeleccion = [];
    this.listUsuarioDocente = [];
    this.getListUsuarioDocente(this.periodo.idPrd);
    Gestor.fn.initForms();
  }

  public getListUsuarioDocente(idPrd: number): void {
    this.sysusuarioService.getAllByNombrePerfil2(Estaticos.TIPO_LABEL_PERFIL_DOCENTE).subscribe(
      (sysusuarios) => {
        this.listUsuarioDocente = sysusuarios;
        this.listUsuarioDocente.forEach(usr => {
          this.seleccionService.getByIdPeriodoIdPersona(idPrd, usr.idUsr).subscribe(
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

  onChange(usr: Sysusuario, isChecked: boolean) {
    let selectedTema = this.listUsuarioDocenteSeleccion;
    if (isChecked) {
      selectedTema.push(usr);
    } else {
      selectedTema = this.listUsuarioDocenteSeleccion.filter(item => item.idUsr !== usr.idUsr);
    }
    this.listUsuarioDocenteSeleccion = selectedTema;
  }

  dialogPeriodoDocente(periodoSelected: Periodo): void {
    Gestor.fn.destroyDialog('dialogPeriodoDocente');
    $('#dialogPeriodoDocente').dialog({
      title: 'Añadir docentes al periodo',
      modal: true,
      minWidth: 1000,
      resizable: false
    });
    this.loadComponentPeriodoDocente(periodoSelected);
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
      minWidth: 1000,
      resizable: false
    });
    this.loadComponentPeriodoDocenteHora(periodoSelected.idPrd);
    Gestor.fn.positionDialog();
    $('#dialogPeriodoDocenteHora div.dialog-content').show();
  }

  loadComponentConvocatoria(idCon: number) {
    // const adItem = new AdItem(UtesconfiguracionnewconvocatoriaComponent, {idCon: idCon});
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    // const viewContainerRef = this.adHost.viewContainerRef;
    // viewContainerRef.clear();
    // const componentRef = viewContainerRef.createComponent(componentFactory);
    // (<AdComponent>componentRef.instance).data = adItem.data;
    this.convocatoria = new Convocatoria();
    if (idCon) {
      this.convocatoriaService.getById(idCon).subscribe(
        (convocatoria) => {
          if (convocatoria != null) {
            this.convocatoria = convocatoria; 
          } 
        }
      )
    } else {
      this.getCodeVal();
    }
    Gestor.fn.initForms();
  }

  public loadPeriodoActivo(): void {
    this.listPeriodoActivo = [];
    this.periodoService.getAll().subscribe(
      (periodos) => {
        if (periodos != null) {
          this.listPeriodoActivo = periodos; 
        } 
      }
    ) 
  }

  public getCodeVal(): void {
    let valnom: String = "";
    this.convocatoriaService.getSecuencialConvocatoria().subscribe(
      (valorseq) => {
        if (valorseq != null) {
          valnom = this.PARTE_CONV + "" + valorseq;
          this.convocatoria.conSecuencia = valorseq; 
          this.convocatoria.conNombre = valnom;
        } 
      }
    )
  }

  dialogCreateConvocatoria(): void {
    Gestor.fn.destroyDialog('dialogConvocatoria');
    $('#dialogConvocatoria').dialog({
      title: 'Registro de Convocatoria',
      modal: true,
      minWidth: 500,
      resizable: false
    });
    this.loadComponentConvocatoria(null);
    Gestor.fn.positionDialog();
    $('#dialogConvocatoria div.dialog-content').show();
  }

  dialogEditConvocatoria(convocatoriaSelected: Convocatoria): void {
    Gestor.fn.destroyDialog('dialogConvocatoria');
    $('#dialogConvocatoria').dialog({
      title: 'Editar Convocatoria',
      modal: true,
      minWidth: 500,
      resizable: false
    });
    this.loadComponentConvocatoria(convocatoriaSelected.idCon);
    Gestor.fn.positionDialog();
    $('#dialogConvocatoria div.dialog-content').show();
  }

  loadComponentInscripcion(idIns: number) {
    // const adItem = new AdItem(UtesconfiguracionnewinscripcionComponent, {idIns: idIns});
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    // const viewContainerRef = this.adHost.viewContainerRef;
    // viewContainerRef.clear();
    // const componentRef = viewContainerRef.createComponent(componentFactory);
    // (<AdComponent>componentRef.instance).data = adItem.data;
    this.inscripcion = new Inscripcion();
    if (idIns) {
      this.inscripcionService.getById(idIns).subscribe(
        (inscripcion) => {
          if (inscripcion != null) {
            this.inscripcion = inscripcion; 
          } 
        }
      )
    } else {
      this.getCodeValInscripcion();
    }
    Gestor.fn.initForms();
  }

  public getCodeValInscripcion(): void {
    let valnom: String = "";
    this.inscripcionService.getSecuencialInscripcion().subscribe(
      (valorseq) => {
        if (valorseq != null) {
          valnom = this.PRE_SEC + "" + valorseq;
          this.inscripcion.insSecuencia = valorseq; 
          this.inscripcion.insNombre = valnom;
        } 
      }
    )
  }

  dialogCreateInscripcion(): void {
    Gestor.fn.destroyDialog('dialogInscripcion');
    $('#dialogInscripcion').dialog({
      title: 'Registro de Inscripcion',
      modal: true,
      minWidth: 500,
      resizable: false
    });
    this.loadComponentInscripcion(null);
    Gestor.fn.positionDialog();
    $('#dialogInscripcion div.dialog-content').show();
  }

  dialogEditInscripcion(inscripcionSelected: Inscripcion): void {
    Gestor.fn.destroyDialog('dialogInscripcion');
    $('#dialogInscripcion').dialog({
      title: 'Editar Inscripcion',
      modal: true,
      minWidth: 500,
      resizable: false
    });
    this.loadComponentInscripcion(inscripcionSelected.idIns);
    Gestor.fn.positionDialog();
    $('#dialogInscripcion div.dialog-content').show();
  }
  
  loadComponentCuestionario(idCue: number) {
    // const adItem = new AdItem(UtesconfiguracionnewrequisitoComponent, {idCue: idCue});
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    // const viewContainerRef = this.adHost.viewContainerRef;
    // viewContainerRef.clear();
    // const componentRef = viewContainerRef.createComponent(componentFactory);
    // (<AdComponent>componentRef.instance).data = adItem.data;
    this.cuestionario = new Cuestionario();
    if (idCue) {
      this.cuestionarioService.getById(idCue).subscribe(
        (cuestionario) => {
          if (cuestionario != null) {
            this.cuestionario = cuestionario; 
          } 
        }
      )
    }
  }

  dialogCreateCuestionario(): void {
    Gestor.fn.destroyDialog('dialogCuestionario');
    $('#dialogCuestionario').dialog({
      title: 'Registro de Requisito',
      modal: true,
      minWidth: 700,
      resizable: false
    });
    this.loadComponentCuestionario(null);
    Gestor.fn.positionDialog();
    $('#dialogCuestionario div.dialog-content').show();
  }

  dialogEditCuestionario(cuestionarioSelected: Cuestionario): void {
    Gestor.fn.destroyDialog('dialogCuestionario');
    $('#dialogCuestionario').dialog({
      title: 'Editar Requisito',
      modal: true,
      minWidth: 700,
      resizable: false
    });
    this.loadComponentCuestionario(cuestionarioSelected.idCue);
    Gestor.fn.positionDialog();
    $('#dialogCuestionario div.dialog-content').show();
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

  public saveSeleccion(): void{
    try {
      let error = [];
      let utilfecha = new Date();
      if (this.listUsuarioDocenteSeleccion.length > 0) {
        this.listUsuarioDocenteSeleccion.forEach(object => {
          this.seleccionService.getByPerioNumIdPersona(this.periodo.prdNumero, object.persona.idPer).subscribe(
            (auxsel) => {
              if(auxsel == null){
                let enseleccion = new Seleccion();
                enseleccion.idPeriodo = this.periodo.idPrd;
                enseleccion.idPersona = object.persona.idPer;
                enseleccion.selHoraAsignada = 0;
                enseleccion.selHoraLectura = 0;
                enseleccion.selHoraVigente = 0;
                this.seleccionService.create(enseleccion).subscribe(
                  response => {
                    if(!response)
                      error.push("Error en " + enseleccion);
                  }
                );
              }
            }
          );
        });
      }
      if (error.length == 0) {
        this.listUsuarioDocenteSeleccion = [];
        swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_OK_REGISTRA, 'success');
      } else {
        swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_ERROR_REGISTRA, 'warning');
      }
      setTimeout(() => {
        this.loadComponentPeriodoDocente(this.periodo);
      }, 1000);
    } catch (error) {
      console.error('Here is the error message', error);
    }
  }

  public deleteSeleccion(): void{
    try {
      let error = [];
      if (this.listUsuarioDocenteSeleccion.length > 0) {
        this.listUsuarioDocenteSeleccion.forEach(object => {
          this.seleccionService.getByPerioNumIdPersona(this.periodo.prdNumero, object.persona.idPer).subscribe(
            (auxsel) => {
              if(auxsel != null){
                this.seleccionService.delete(auxsel.idSel).subscribe(
                  response => {
                    if(!response)
                      error.push("No se elimino el registro " + auxsel);
                  }
                );
              }
            }
          );
        });
      }
      if (error.length == 0) {
        this.listUsuarioDocenteSeleccion = [];
        swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_OK_ELIMINA, 'success');
      } else {
        swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_ERROR_ELIMINA, 'warning');
      }
      setTimeout(() => {
        this.loadComponentPeriodoDocente(this.periodo);
      }, 1000);
    } catch (error) {
      console.error('Here is the error message', error);
    }
  }

  public saveConvocatoria(): boolean {
    let validacion:boolean = false;
    try {
      console.log(this.convocatoria);
      if (this.convocatoria.conNombre != null && this.convocatoria.conNombre != "") {
        if(this.convocatoria.conNumeroTema != null || this.convocatoria.conNumeroTema > 0){
          this.convocatoriaService.create(this.convocatoria).subscribe( 
            response => {
              if(response){
                if (this.convocatoria.conActivo == true) {
                  //notificacionGlobal("Notificaciones", "Se habilito una convocatoria para registrar temas.", "/convocatoriatema");
                }
                // this.enconfigura = new Sysconfiguracion();
                // this.enconfigura.confEstado = this.convocatoria.conActivo
                // let pkconv:String = "" + this.convocatoria.idCon;
                // this.enconfigura.confCampo = this.PARTE_CONV + "" + pkconv;
                // this.enconfigura.confValor = pkconv;
                // this.enconfigura.confTipo = this.CONFIG_TIPO;
                // this.enconfigura.confActivo = true;
                // this.sysconfiguracionService.create(this.enconfigura).subscribe( 
                //   response2 => {
                //     if(response2){
                //     }
                //   }
                // );
                $('#dialogConvocatoria').dialog('close');
                swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_OK_REGISTRA, 'success');
                //this.router.navigate(['/dashboard/utesconfiguracion']);
                this.ngOnInit();
                this.showTab('tab-convocatoria');
                validacion = true;
              } else {
                swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_ERROR_REGISTRA, 'warning');
              }
            }
          );
        } else {
          swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_ERROR_REGISTRA_CERO, 'warning');
        }        
      } 
    } catch (error) {
      console.error('Here is the error message', error);
      return false;
    }
    return validacion;
  }

  public createInscripcion(): boolean {
    let validacion:boolean = false;
    try {
      if (this.inscripcion.insFechaFin != null && this.inscripcion.insFechaInicio != null) {
          this.inscripcionService.create(this.inscripcion).subscribe( 
            response => {
              if(response){
                $('#dialogInscripcion').dialog('close');
                swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_OK_REGISTRA, 'success');
                //this.router.navigate(['/dashboard/utesconfiguracion']);
                this.ngOnInit();
                this.showTab('tab-inscripcion');
                validacion = true;
              } else {
                swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_ERROR_SELECCION, 'warning');
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

  public savePregunta(): void{
    let validacion: boolean = false;
    try {
      let utilfecha = new Date();
      this.cuestionario.cuePregunta = ((this.cuestionario.cuePregunta != null) ? this.cuestionario.cuePregunta.toUpperCase().trim() : this.cuestionario.cuePregunta);
      this.cuestionarioService.create(this.cuestionario).subscribe(
        response => {
          if(response){
            $('#dialogCuestionario').dialog('close');
            swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_OK_REGISTRA, 'success');
            validacion = true;
            this.ngOnInit();
            this.showTab('tab-requisitos');
          }else{
            swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_ERROR_REGISTRA, 'warning');
          }
        }
      ); 
    } catch (error) {
      console.log(error)
    }
  }


}

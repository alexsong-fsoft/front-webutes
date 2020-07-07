import { Component, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, RouterEvent, NavigationEnd } from '@angular/router';
import { AdDirective } from 'src/app/Estudiante/estudiantetema/ad.directive';
import { TemaService } from 'src/app/tema/tema.service';
import { Tema } from 'src/app/tema/tema';
import { AsignadoService } from 'src/app/asignado/asignado.service';
import { Sysusuario } from 'src/app/sysusuario/sysusuario';
import { UserService } from 'src/app/login/user.service';
import { Asignado } from 'src/app/asignado/asignado';
import { Estaticos } from 'src/app/app.constants';
import { Estado } from 'src/app/estado/Estado';
import { AdItem } from 'src/app/Estudiante/estudiantetema/ad-item';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { DocentetemadetalleComponent } from './docentetemadetalle.component';
import { DocentetemaeditarComponent } from './docentetemaeditar.component';
import { Subject } from 'rxjs';
import { filter, pairwise, startWith, takeUntil } from 'rxjs/operators';
import { ConvocatoriaService } from 'src/app/convocatoria/convocatoria.service';
import swal from 'sweetalert2';
import Lang from '../../../assets/app.lang.json';
import { DatePipe } from '@angular/common';
import { Tipo } from 'src/app/tipo/Tipo';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-docentetema',
  templateUrl: './docentetema.component.html'
})
export class DocentetemaComponent implements OnInit, OnDestroy {
  private tab: string;  
  private temaDetalle: Tema = new Tema();
  private tema: Tema = new Tema();
  private listDocente: Tema[];
  private listTemaPost: Tema[];
  private listTemaAsignaRevisar: Tema[];
  private listEstadoPrePostTema: Estado[];  
  private listEstadoPostTema: Estado[];
  private listDataEstadoLectorRevisor: Estado[];
  private listTipoDocumento: Tipo[];
  private listTipoTema: Tipo[];
  private auxent: Asignado[];  
  private listTemaSeleccion: number[] = [];
  public usserLogged: Sysusuario = null;
  public destroyed = new Subject<any>();

  @ViewChild(AdDirective, {static: true}) adHost: AdDirective;
  
  constructor(private userService: UserService,
    private temaService: TemaService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private asignadoService: AsignadoService,
    private convocatoriaService: ConvocatoriaService,
    private datepipe: DatePipe) { }

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
      setTimeout(function () {
        Gestor.fn.initForms();
      }, 1000);
    })
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  reset(): void{
    this.temaDetalle = new Tema();
    this.tema = new Tema();
    this.listDocente = [];
    this.listTemaPost = [];
    this.listTemaAsignaRevisar = [];
    this.listEstadoPrePostTema = [];
    this.listEstadoPostTema = [];
    this.listDataEstadoLectorRevisor = [];
    this.listTipoDocumento = [];
    this.auxent = [];
    this.listTemaSeleccion = [];
    $("#tabs_docentetema").tabs();
    $("#tabs_docentetema_detalle").tabs();
    this.showTab('tab-mistemas');
  }

  load(): void {
    this.getListDocente();
    this.getListTemaPost();
    this.getListTemaAsignaRevisar();
    this.listEstadoPrePostTema = Estado.loadPrePostTema();
    this.listEstadoPostTema = Estado.loadPostTema();
    this.listDataEstadoLectorRevisor = Estado.loadAsignaLectorRevisor();
    this.listTipoDocumento = Tipo.loadDocumento();
    this.listTipoTema = Tipo.getListTipoTema();    
  }

  onChange(idTema: number, isChecked: boolean) {
    let selectedTema = this.listTemaSeleccion;
    if (isChecked) {
      selectedTema.push(idTema);
    } else {
      selectedTema = this.listTemaSeleccion.filter(item => item !== idTema);
    }
    this.listTemaSeleccion = selectedTema;
  }

  getListDocente(): Tema[] {
    let estados: Estado[] = Estado.loadPreTema();
    let estadoslst: String = Estado.listaCedena(estados);
    this.temaService.getAllByUsuarioEstados(this.usserLogged.usrUsuario, estadoslst).subscribe(
      (temas: Tema[]) => {
        this.listDocente = temas;
      }
    );
    return this.listDocente;
  }

  getListTemaPost(): Tema[] {
    let estados: Estado[] = Estado.loadPostTema();
    let estadoslst: String = Estado.listaCedena(estados);
    this.temaService.getAllByUsuarioEstados(this.usserLogged.usrUsuario, estadoslst).subscribe(
      (temas: Tema[]) => {
        this.listTemaPost = temas;
      }
    );
    return this.listTemaPost;
  }

  getListTemaAsignaRevisar(): Tema[] {
    let codigos: String = "";
    let c: number = 0;
    this.asignadoService.getByIdPersonaAsgIdTipoList(this.usserLogged.idPersona, Estaticos.TIPO_ID_ASIGNACION_REVISOR).subscribe(
      (asignado) => {
        this.auxent = asignado;
        if (this.auxent != null && this.auxent.length > 0) {
          for (let obja of this.auxent) {
            if (obja != null) {
              codigos = codigos + obja.tema.idTem.toString();
              c++;
              if (c < this.auxent.length) {
                codigos = codigos + ",";
              }
            }
          }
          if (codigos.length != 0) {
            this.temaService.getByTemasPk2(codigos).subscribe(
              (temas: Tema[]) => {
                this.listTemaAsignaRevisar = temas;
              }
            );
          }
        } 
      }
    );
    return this.listTemaAsignaRevisar;
  }
  
  loadComponent(idTema: number, tab: string) {
    // const adItem = new AdItem(DocentetemadetalleComponent, { idTema: idTema, tab: tab });
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    // const viewContainerRef = this.adHost.viewContainerRef;
    // viewContainerRef.clear();
    // const componentRef = viewContainerRef.createComponent(componentFactory);
    // (<AdComponent>componentRef.instance).data = adItem.data;
    this.tab = tab;
    $("#tabs_docentetema_detalle").tabs();
    this.showTab('tab-tema');
    this.temaDetalle = new Tema();
    if (idTema) {
      this.temaService.getById(idTema).subscribe(
        (tema) => {
          if (tema != null) {
            this.temaDetalle = tema; 
          } 
        }
      )
    }
  }

  loadComponent2(idTema: number) {
    // const adItem = new AdItem(DocentetemaeditarComponent, { idTema: idTema });
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    // const viewContainerRef = this.adHost.viewContainerRef;
    // viewContainerRef.clear();
    // const componentRef = viewContainerRef.createComponent(componentFactory);
    // (<AdComponent>componentRef.instance).data = adItem.data;
    this.tema = new Tema();
    if (idTema) {
      this.temaService.getById(idTema).subscribe(
        (tema) => {
          if (tema != null) {
            this.tema = tema; 
          } 
        }
      )
    }
  }

  openDialogDetalle(tema: Tema, tab: string): void {
    Gestor.fn.destroyDialog('dialogDetalle');
    $('#dialogDetalle').dialog({
      title: 'Detalle',
      modal: true,
      minWidth: 1000,
      resizable: false
    });
    this.loadComponent(tema.idTem, tab);
    Gestor.fn.positionDialog();
    $('#dialogDetalle div.dialog-content').show();
  }

  openDialogEditar(tema: Tema): void {
    Gestor.fn.destroyDialog('dialogEditar');
    $('#dialogEditar').dialog({
      title: 'Datos Tema', 
      modal: true,
      minWidth: 800,
      resizable: false
    });
    this.loadComponent2(tema.idTem);
    Gestor.fn.positionDialog();
    $('#dialogEditar div.dialog-content').show();
  }

  openDialogCrear(): void {
    Gestor.fn.destroyDialog('dialogEditar');
    $('#dialogEditar').dialog({
      title: 'Registrar Tema', 
      modal: true,
      minWidth: 800,
      resizable: false
    });
    this.loadComponent2(null);
    Gestor.fn.positionDialog();
    $('#dialogEditar div.dialog-content').show();
  }

  habilitaBotonActualiza (estado: number): boolean {
    if (estado == Estaticos.ESTADO_TEMA_PRE_CREADO || estado == Estaticos.ESTADO_TEMA_PRE_REVISION) {
      return false;
    }
    return true;
  }

  public getNombreEstadoPorLista(idEstado: number, tab: string): String {
    if(tab == '1')
      return Estado.getNombreEstadoPorLista(idEstado, this.listEstadoPrePostTema);
    else if(tab == '2')
      return Estado.getNombreEstadoPorLista(idEstado, this.listEstadoPostTema);
    else if(tab == '3')
      return Estado.getNombreEstadoPorLista(idEstado, this.listDataEstadoLectorRevisor);
  }

  public getNombreTipoPorLista(idTipo: number): String {
    return Tipo.getNombreTipoPorLista(idTipo, this.listTipoDocumento);
  }
  
  public parseDateToString(date: Date): String{
    return this.datepipe.transform(date, Estaticos.FORMAT_DATE);
  }

  public showTab(tabid: String){
    Gestor.fn.showTab(tabid);
  }

  public updateTemaAddConvocatoria() {
    let errores: String[] = [];
    let tematexto: String[] = [];     ;
    try {
      this.convocatoriaService.getUltimoRegistroConvocatoria().subscribe(
        (idlastconv) => {
          if (idlastconv != null) {
            this.convocatoriaService.getByIdActivo(idlastconv).subscribe(
              (enconvocatoriaseleccion) => {
                if (enconvocatoriaseleccion != null) {
                  if(this.listTemaSeleccion != null && this.listTemaSeleccion.length > 0){
                    this.listTemaSeleccion.forEach(idTem => {
                      this.temaService.getById(idTem).subscribe(
                        (objtem) => {
                          if (objtem != null) {
                            if (objtem.temIdEstado == Estaticos.ESTADO_TEMA_PRE_CREADO || objtem.temIdEstado == Estaticos.ESTADO_TEMA_PRE_REVISION) {
                              if (objtem.convocatoria == null) {
                                let utilfecha = new Date();
                                objtem.convocatoria = enconvocatoriaseleccion;
                                objtem.temIdEstado = Estaticos.ESTADO_TEMA_PRE_ENVIADO;
                                objtem.temFechaEnviado = utilfecha;
                                this.temaService.update(objtem).subscribe(
                                  (response2) => {
                                    if (response2) {
                                      //notificacionGlobal("Notificaciones", "Temas registrados en convocatoria actual", "/temaconvocatoria");
                                      //notificacionGlobal("Notificaciones", "Existen nuevos temas enviados", "/temaenviado");
                                      tematexto.push("   " + objtem.temNombre + "\n");                                      
                                    } else {
                                      errores.push("" + objtem.idTem);
                                    }
                                  }
                                );
                              }
                            }
                          } 
                        }                
                      )
                    });
                    
                    if (errores.length == 0) {
                      swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_OK_ACTUALIZA, 'success');
                      //this.router.navigate(['/dashboard/docentetema'])
                      this.ngOnInit();
                      // if (daoconfigura.activaProcesoByCampo(CONFIG_TEMA_ENVIADO)) {
                      //   utilcorreo.setDataUsuario(enusuariosesion, "Envio de temas", "Se ha enviado los siguiente(s) tema(s) para su revisión:", tematexto.toString().replace('[', ' ').replace(']', ' '));
                      //   utilcorreo.sendNotificaNuevo();
                      // }
                    } else {
                      swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_ERROR_REGISTRA, 'error');
                    }

                  } else {
                    swal.fire("", Estaticos.MENSAJE_ERROR_SELECCION, 'error');
                  }
                } else {
                  swal.fire("", Estaticos.MENSAJE_ERROR_EXISTE_CONVOCATORIA, 'error');
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

  public create(): boolean {
    let validacion:boolean = false;
    try {
      if (this.tema.temNumEst != null && this.tema.temNumEst != 0) {
        this.temaService.getByNombreTema(this.tema.temNombre).subscribe(
          (auxtema) => {
            if (auxtema != null) {
              swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_ERROR_EXISTE, 'error');
            }else{
              let utilfecha = new Date();
              let nuevotema = new Tema();
              nuevotema.idPersona = this.usserLogged.persona.idPer; //(daopersona.obtenerPersonaPorCedula(enpersonasesion.getPerCedula()));
              nuevotema.temNombre = this.tema.temNombre.toUpperCase().trim();
              nuevotema.temDescripcion = this.tema.temDescripcion.toUpperCase().trim();
              nuevotema.temNumEst = this.tema.temNumEst;
              nuevotema.temFechaCreado = utilfecha;
              nuevotema.temIdTipo = this.tema.temIdTipo;
              nuevotema.temIdEstado = Estaticos.ESTADO_TEMA_PRE_CREADO;
              nuevotema.temActivo = true;
              nuevotema.temAuspiciante = this.tema.temAuspiciante.toUpperCase().trim();
              nuevotema.temObservacion =this.tema.temObservacion.toUpperCase().trim();
              nuevotema.temFechaEditado = utilfecha;
              this.temaService.create(nuevotema).subscribe( 
                response => {
                  if(response){
                    $('#dialogEditar').dialog('close');
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
        );       
      } 
    } catch (error) {
      console.error('Here is the error message', error);
      return false;
    }
    return validacion;
  }


  public update(): boolean {
    let validacion:boolean = false;
    try {
      this.temaService.getById(this.tema.idTem).subscribe(
        (auxtema) => {
          if (auxtema != null) {
            auxtema.temIdTipo = this.tema.temIdTipo;
            auxtema.temNombre = this.tema.temNombre;
            auxtema.temDescripcion = this.tema.temDescripcion;
            auxtema.temAuspiciante = this.tema.temAuspiciante;
            auxtema.temObservacion = this.tema.temObservacion;
            auxtema.temNumEst = this.tema.temNumEst;
            this.temaService.update(auxtema).subscribe( 
              response => {
                if(response){
                  $('#dialogEditar').dialog('close');
                  swal.fire(Lang.messages.register_update, Lang.messages.register_updated, 'success');
                  //this.router.navigate(['/dashboard/docentetema'])
                  this.ngOnInit();
                  validacion = true;
                }else{
                  swal.fire(Lang.messages.register_update, Lang.messages.register_not_saved, 'error');
                }
              }
            )
          } else {
            swal.fire(Lang.messages.register_update, Lang.messages.register_not_saved, 'error');
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

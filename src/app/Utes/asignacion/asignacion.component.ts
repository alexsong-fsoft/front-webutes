import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { AdDirective } from 'src/app/Estudiante/estudiantetema/ad.directive';
import { Sysusuario } from 'src/app/sysusuario/sysusuario';
import { Tema } from 'src/app/tema/tema';
import { AsignadoService } from 'src/app/asignado/asignado.service';
import { TemaService } from 'src/app/tema/tema.service';
import { UserService } from 'src/app/login/user.service';
import { AdItem } from 'src/app/Estudiante/estudiantetema/ad-item';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { Estaticos } from 'src/app/app.constants';
import { AsignaciondetalleComponent } from './asignaciondetalle.component';
import { PageRender } from 'src/app/Page/pagerender';
import { UtesasignacionrevisordialogComponent } from './utesasignacionrevisordialog.component';
import swal from 'sweetalert2';
import Lang from '../../../assets/app.lang.json';
import { Estado } from 'src/app/estado/Estado';
import { Tipo } from 'src/app/tipo/Tipo';
import { DatePipe } from '@angular/common';
import { Asignado } from 'src/app/asignado/asignado';
import { PeriodoService } from 'src/app/periodo/periodo.service';
import { SysusuarioService } from 'src/app/sysusuario/sysusuario.service';
import { PersonaService } from 'src/app/persona/persona.service';
import { InformeService } from 'src/app/informe/informe.service';
import { InscripcionService } from 'src/app/inscripcion/inscripcion.service';
import { PresolicitudService } from 'src/app/presolicitud/presolicitud.service';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html'
})
export class AsignacionComponent implements OnInit {
  public usserLogged: Sysusuario = null;
  private listUtesEnviados: Tema[];
  private listComisionPublicado: Tema[];
  private listUtesAprobados: Tema[];
  private listUtesEnviadosSeleccion: number[] = [];
  private pageRender: PageRender<Tema>;
  private pageRender2: PageRender<Tema>;
  private pageRender3: PageRender<Tema>;
  private listEstadoPreTema: Estado[] = [];
  private listTipoDocumento: Tipo[];
  private tipoRevisorLector = '';
  private listUsuario:Sysusuario[];
  private listPersonaAsignarSelected: Asignado[];

  private tema: Tema = new Tema();
  public usserSelected: Sysusuario = new Sysusuario();
  private listDataEstadoInscripcion: Estado[];

  @ViewChild(AdDirective, { static: true }) adHost: AdDirective;

  constructor(private userService: UserService,
    private temaService: TemaService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private asignadoService: AsignadoService,
    private periodoService: PeriodoService,
    private sysusuarioService: SysusuarioService,
    private personaService: PersonaService,
    private informeService: InformeService,
    private inscripcionService: InscripcionService,
    private presolicitudService: PresolicitudService,
    private datepipe: DatePipe) { }

  ngOnInit() {
    this.usserLogged = this.userService.getUserLoggedIn();
    this.reset();
    this.load();
  }

  reset(): void {
    this.listUtesEnviados = [];
    this.listComisionPublicado = [];
    this.listUtesAprobados = [];
    this.listUtesEnviadosSeleccion = [];
  }

  load(): void {
    this.getListUtesEnviados(0);
    this.getListComisionPublicado(0);
    this.getListUtesAprobados(0);
    this.listEstadoPreTema = Estado.loadPreTema();
    this.listTipoDocumento = Tipo.loadDocumento();
    this.listDataEstadoInscripcion = Estado.loadInscripcion();
    $("#tabs_docentetema").tabs();
    this.showTab('tab-mistemas');
    setTimeout(function () {
      Gestor.fn.initForms();
    }, 1000);
  }

  getListUtesEnviados(page: number): Tema[] {
    let estadoslst: string = Estaticos.ESTADO_TEMA_PRE_ENVIADO + "," + Estaticos.ESTADO_TEMA_PRE_ASIGNAREVISOR + "," + Estaticos.ESTADO_TEMA_PRE_REVISION + "," + Estaticos.ESTADO_TEMA_PRE_REVISADO;
    //let page:number = 0;
    this.temaService.getAllByEstadoPageable(estadoslst, page).subscribe(
      response => {
        this.listUtesEnviados = response.content;
        this.pageRender = new PageRender("/dashboard/utespresolicitud", response);
      }
    );
    return this.listUtesEnviados;
  }

  getListComisionPublicado(page: number): Tema[] {
    let estadoslst: string = Estaticos.ESTADO_TEMA_PRE_PUBLICADO.toString();
    this.temaService.getAllByEstadoPageable(estadoslst, page).subscribe(
      response => {
        this.listComisionPublicado = response.content;
        this.pageRender2 = new PageRender("/dashboard/utespresolicitud", response);
      }
    );
    return this.listComisionPublicado;
  }

  getListUtesAprobados(page: number): Tema[] {
    let estadoslst: string = Estaticos.ESTADO_TEMA_PRE_ASIGNAESTUDIANTE + "," + Estaticos.ESTADO_TEMA_PRE_ASIGNALECTOR;
    this.temaService.getAllByEstadoPageable(estadoslst, page).subscribe(
      response => {
        this.listUtesAprobados = response.content;
        this.pageRender3 = new PageRender("/dashboard/utespresolicitud", response);
      }
    );
    return this.listUtesAprobados;
  }

  public showTab(tabid: String) {
    $('#tabs_docentetema .tab-pane').hide();
    $('#' + tabid).show();
  }

  public getNombreEstadoPorLista(idEstado: number): String {
    return Estado.getNombreEstadoPorLista(idEstado, this.listEstadoPreTema);
  }

  public getNombreTipoPorLista(idTipo: number): String {
    return Tipo.getNombreTipoPorLista(idTipo, this.listTipoDocumento);
  }

  public parseDateToString(date: Date): String {
    return this.datepipe.transform(date, Estaticos.FORMAT_DATE);
  }


  habilitaBotonAsignarRevisor(idestado: number): boolean {
    try {
      if (idestado != Estaticos.ESTADO_TEMA_PRE_ENVIADO) {
        return true;
      }
    } catch (error) {
      console.error('Here is the error message', error);
    }
    return false;
  }

  habilitaBotonAddLectorPlan(idtema: number): Boolean {
    let val: Boolean = true;
    try {
      // this.asignadoService.getByIdTemaIdTipo(idtema, Estaticos.TIPO_ID_ASIGNACION_LECTORPLAN).subscribe(
      //   response => {
      //     if(response != null && response.length > 0){
      //       val = true;
      //     }else {
      //       val = false;
      //     }
      //   }
      // );
    } catch (error) {
      console.error('Here is the error message', error);
    }
    return val;
  }

  loadComponent(idTema: number) {
    const adItem = new AdItem(AsignaciondetalleComponent, { idTema: idTema });
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }

  loadComponent2(idTema: number) {
    // const adItem = new AdItem(UtesasignacionrevisordialogComponent, { idTema: idTema });
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    // const viewContainerRef = this.adHost.viewContainerRef;
    // viewContainerRef.clear();
    // const componentRef = viewContainerRef.createComponent(componentFactory);
    // (<AdComponent>componentRef.instance).data = adItem.data;
    this.tema = new Tema();
    this.listUsuario = [];
    this.listPersonaAsignarSelected = [];
    if (this.tipoRevisorLector == 'REVISOR') {
      if (idTema) {
        this.getListUsuarioRevisor(idTema);
        this.getListPerAsignaRevisorSelected(idTema);
        this.temaService.getById(idTema).subscribe(
          (tema) => {
            if (tema != null) {
              this.tema = tema;
            }
          }
        )
      }
    } else if(this.tipoRevisorLector == 'LECTOR') {
      if (idTema) {
        this.getListUsuarioDocente(idTema);
        this.getListPersonaAsignarSelected(idTema);
        this.temaService.getById(idTema).subscribe(
          (tema) => {
            if (tema != null) {
              this.tema = tema;
            }
          }
        )
      }
    }
  }

  loadDetalle(tema: Tema): void {
    Gestor.fn.destroyDialog('dialogDetalle');
    $('#dialogDetalle').dialog({
      title: 'Detalle',
      modal: true,
      minWidth: 1000,
      resizable: false
    });
    this.loadComponent(tema.idTem);
    Gestor.fn.positionDialog();
  }

  asignarRevisor(tema: Tema): void {
    this.tipoRevisorLector = 'REVISOR'
    Gestor.fn.destroyDialog('dialogAsignacionRevisor');
    $('#dialogAsignacionRevisor').dialog({
      title: 'Asignación de revisor de tema',
      modal: true,
      minWidth: 800,
      resizable: false
    });
    this.loadComponent2(tema.idTem);
    Gestor.fn.positionDialog();
    $('#dialogAsignacionRevisor div.dialog-content').show();
  }

  asignarLector(tema: Tema): void {
    this.tipoRevisorLector = 'LECTOR'
    Gestor.fn.destroyDialog('dialogAsignacionRevisor');
    $('#dialogAsignacionRevisor').dialog({
      title: 'Asignación de lector de plan',
      modal: true,
      minWidth: 800,
      resizable: false
    });
    this.loadComponent2(tema.idTem);
    Gestor.fn.positionDialog();
    $('#dialogAsignacionRevisor div.dialog-content').show();
  }

  onChange(idTema: number, isChecked: boolean) {
    let selectedTema = this.listUtesEnviadosSeleccion;
    if (isChecked) {
      selectedTema.push(idTema);
    } else {
      selectedTema = this.listUtesEnviadosSeleccion.filter(item => item !== idTema);
    }
    this.listUtesEnviadosSeleccion = selectedTema;
  }


  updateTemaEstado() {
    let errores: String[] = [];
    let tematexto: String[] = [];;
    try {
      if (this.listUtesEnviadosSeleccion != null && this.listUtesEnviadosSeleccion.length > 0) {
        this.listUtesEnviadosSeleccion.forEach(idTem => {
          this.temaService.getById(idTem).subscribe(
            (objtem) => {
              if (objtem != null) {
                if (objtem.temIdEstado == Estaticos.ESTADO_TEMA_PRE_REVISADO) {
                  let utilfecha = new Date();
                  objtem.temIdEstado = Estaticos.ESTADO_TEMA_PRE_PUBLICADO;
                  objtem.temFechaEnviado = utilfecha;
                  this.temaService.update(objtem).subscribe(
                    (response2) => {
                      if (response2) {
                        //notificacionGlobal("Notificaciones", "Tema publicado", "/temapublicado");
                        // if (daoconfigura.activaProcesoByCampo(CONFIG_TEMA_PUBLICACIONAUTOR)) {
                        //   SysUsuario auxus = daousuario.obtenerUsuarioPorPersonaId(objtema.getPersona().getIdPer());
                        //   utilcorreo.setDataUsuario(auxus, "Publicación tema", "Se ha publicado el tema:", objtema.getTemNombre());
                        //   utilcorreo.sendNotificaNuevo();
                        // }
                        tematexto.push("   " + objtem.temNombre + "\n");
                      } else {
                        errores.push("" + objtem.idTem);
                      }
                    }
                  );

                }
              }
            }
          )
        });

        if (errores.length == 0) {
          swal.fire("Publicar Temas", Estaticos.MENSAJE_OK_ACTUALIZA, 'success');
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
    } catch (error) {
      console.error('Here is the error message', error);
    }
  }


  public getListUsuarioRevisor(idtem: number): void {
    if (idtem != null) {
      this.periodoService.getUltimoRegistroPeriodo().subscribe(
        (idlastperiodo) => {
          if (idlastperiodo != null) {
            this.periodoService.getByIdActivo(idlastperiodo).subscribe(
              (enperiodoActual) => {
                this.sysusuarioService.getAllByNombrePerfilIdTemaIdPeriodo(Estaticos.TIPO_LABEL_PERFIL_DOCENTE, idtem, enperiodoActual.idPrd).subscribe(
                  (sysusuarios) => {
                    this.listUsuario = sysusuarios;
                  }
                );
              }
            );
          }
        }
      );
    }
  }

  public getListUsuarioDocente(idtem: number): void {
    if (idtem != null) {
      this.periodoService.getUltimoRegistroPeriodo().subscribe(
        (idlastperiodo) => {
          if (idlastperiodo != null) {
            this.periodoService.getByIdActivo(idlastperiodo).subscribe(
              (enperiodoActual) => {
                this.sysusuarioService.getAllByNombrePerfilIdTemaIdPeriodo(Estaticos.TIPO_LABEL_PERFIL_DOCENTE, idtem, enperiodoActual.idPrd).subscribe(
                  (sysusuarios) => {
                    this.listUsuario = sysusuarios;
                  }
                );
              }
            );
          }
        }
      );
    }
  }

  public createUtesAsignaRevisor(): void {
    if (this.validar()) {
      this.asignadoService.getByIdPersonaIdTemaAsgIdTipoIdEstadorev(this.usserSelected.idUsr, this.tema.idTem, Estaticos.TIPO_ID_ASIGNACION_REVISOR, Estaticos.ESTADO_ID_TEMA_REVISA_PROCESO).subscribe(
        (auxasigando) => {
          console.log(auxasigando);
          if (auxasigando == null) {
            console.log('no existe asignado');
            this.personaService.getById(this.usserSelected.idUsr).subscribe(
              (persona) => {
                if (persona != null) {
                  console.log('existe persona');
                  let utilfecha = new Date();
                  let enasignado: Asignado = new Asignado();
                  //enasignado.tema = this.tema;
                  enasignado.idTema = this.tema.idTem;
                  //enasignado.persona = persona;
                  enasignado.idPersona = persona.idPer;
                  enasignado.asgIdTipo = Estaticos.TIPO_ID_ASIGNACION_REVISOR;
                  enasignado.asgFechaRegistro = utilfecha;
                  enasignado.asgActivo = true;
                  enasignado.asgIdEstadoTema = Estaticos.ESTADO_ID_TEMA_REVISA_PROCESO;
                  this.asignadoService.create(enasignado).subscribe(
                    (response) => {
                      if (response) {
                        console.log('se creó asignado');
                        this.tema.temIdEstado = Estaticos.ESTADO_TEMA_PRE_ASIGNAREVISOR;
                        this.temaService.update(this.tema).subscribe(
                          (response2) => {
                            if (response2) {
                              this.loadComponent2(this.tema.idTem);
                              swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_OK_REGISTRA, 'success');
                              // if (daoconfigura.activaProcesoByCampo(CONFIG_ASIGNA_TEMAREVISOR)) {
                              //   auxuser: Sysusuario = daousuario.obtenerUsuarioPorPersonaId(enasignado.getPersona().getIdPer());
                              //   utilcorreo.setDataUsuario(auxuser, "Asignacción revisión de tema", "Se ha asigando el tema: " + enTemaDetalleSeleccion.getTemNombre() + ", Para la respectiva revisión.", "");
                              //   utilcorreo.sendNotificaNuevo();
                              // }
                              // this.enUsuarioValorUtes = null;
                            }
                            else {
                              swal.fire(Lang.messages.register_update, "Error al actualizar estado del tema", 'warning');
                            }
                          }
                        );
                      }
                      else {
                        swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_ERROR_REGISTRA, 'warning');
                      }
                    }
                  );
                }
              }
            );
          }
          else {
            // this.enUsuarioValorUtes = null;
            swal.fire(Lang.messages.register_new, "TEMA YA ASIGNADO AL DOCENTE", 'warning');
          }
        }
      );

    }
  }

  public deleteUtesAsignaRevisor(asignado: Asignado): void {
    try {
      if (asignado != null) {
        this.informeService.getAllByIdTemaIdPersona(asignado.tema.idTem, asignado.persona.idPer).subscribe(
          (informes) => {
            if (informes == null || informes.length == 0) {
              this.asignadoService.getByIdPersonaAsgIdTipoIdTema(asignado.persona.idPer, Estaticos.TIPO_ID_ASIGNACION_REVISOR, asignado.tema.idTem).subscribe(
                (auxasignado) => {
                  if (auxasignado != null) {
                    this.asignadoService.delete(auxasignado.idAsg).subscribe(
                      (response) => {
                        if (response) {
                          this.tema.temIdEstado = Estaticos.ESTADO_TEMA_PRE_ENVIADO;
                          this.temaService.update(this.tema).subscribe(
                            (response2) => {
                              if (response2) {
                                this.loadComponent2(this.tema.idTem);
                                swal.fire(Lang.messages.register_delete, Estaticos.MENSAJE_OK_REGISTRA, 'success');
                              }
                              else {
                                swal.fire(Lang.messages.register_delete, "Error al actualizar estado del tema", 'warning');
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            } else {
              swal.fire(Lang.messages.register_delete, Estaticos.MENSAJE_ERROR_DATORELACION, 'warning');
            }
          }
        );
      }
    } catch (error) {
      console.error('Here is the error message', error);
    }
  }

  public validar(): boolean {
    let validacion: boolean = false;
    if (this.usserSelected != null && this.usserSelected.idUsr != null) {
      validacion = true;
    }
    return validacion;
  }

  public getListPerAsignaRevisorSelected(idtema: number): Asignado[] {
    this.asignadoService.getByIdTemaIdTipo(idtema, Estaticos.TIPO_ID_ASIGNACION_REVISOR).subscribe(
      (asignados) => {
        this.listPersonaAsignarSelected = asignados;
      }
    );
    return this.listPersonaAsignarSelected;
  }

  public getListPersonaAsignarSelected(idtema: number): Asignado[] {
    this.asignadoService.getByIdTemaIdTipo(idtema, Estaticos.TIPO_ID_ASIGNACION_ESTUDIANTE).subscribe(
      (asignados) => {
        this.listPersonaAsignarSelected = asignados;
      }
    );
    return this.listPersonaAsignarSelected;
  }

  public getEstadobyInscripcion(percedula: string) {
    this.periodoService.getUltimoRegistroPeriodo().subscribe(
      (idlastperiodo) => {
        if (idlastperiodo != null) {
          this.periodoService.getByIdActivo(idlastperiodo).subscribe(
            (enperiodoActual) => {
              this.inscripcionService.getByIdPeriodo(enperiodoActual.idPrd).subscribe(
                (eninscripionActual) => {
                  this.personaService.getByCedula(percedula).subscribe(
                    (auxpersonaActual) => {
                      this.presolicitudService.getByIdPeronaIdInscripcion2(auxpersonaActual.idPer, eninscripionActual.idIns).subscribe(
                        (enpresl) => {
                          if (enpresl != null) {
                            return Estado.getNombreEstadoPorLista(enpresl.pslIdEstado, this.listDataEstadoInscripcion);
                          } else {
                            return "NO DEFINIDO";
                          }
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        }
      }
    );

  }
}

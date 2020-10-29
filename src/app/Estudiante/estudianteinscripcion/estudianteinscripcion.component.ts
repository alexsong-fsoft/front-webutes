import { Component, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { PresolicitudService } from 'src/app/presolicitud/presolicitud.service';
import { PersonaService } from 'src/app/persona/persona.service';
import { Presolicitud } from 'src/app/presolicitud/presolicitud';
import { Estaticos } from 'src/app/app.constants';
import { Persona } from 'src/app/persona/persona';
import { EstudianteinscripcionDialogComponent } from './estudianteinscripciondialog.component';
import { AdDirective } from '../estudiantetema/ad.directive';
import { AdItem } from '../estudiantetema/ad-item';
import { AdComponent } from '../estudiantetema/ad.component';
import { UserService } from 'src/app/login/user.service';
import { Sysusuario } from 'src/app/sysusuario/sysusuario';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter, takeUntil, pairwise, startWith } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { InscripcionService } from 'src/app/inscripcion/inscripcion.service';
import { Estado } from 'src/app/estado/Estado';
import { Tipo } from 'src/app/tipo/Tipo';
import { Cuestionario } from 'src/app/cuestionario/cuestionario';
import { CuestionarioService } from 'src/app/cuestionario/cuestionario.service';
import swal from 'sweetalert2';
import Lang from '../../../assets/app.lang.json';
import { Respuesta } from 'src/app/respuesta/respuesta';
import { RespuestaService } from 'src/app/respuesta/respuesta.service';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-estudianteinscripcion',
  templateUrl: './estudianteinscripcion.component.html'
})
export class EstudianteinscripcionComponent implements OnInit, OnDestroy {
  private persona: Persona = null;
  private listPresolicitud: Presolicitud[];
  private listDataEstadoInscripcion: Estado[];
  private maxsecuencial: number = null;
  private habilitaBotonInscripcion: boolean = false;

  private presolicitud: Presolicitud = new Presolicitud();
  private listTipoOpcionTitulacion: Tipo[];
  private listCuestionario: Cuestionario[];
  private listCuestionarioSeleccion: number[] = [];
  private enpresolicitud: Presolicitud;

  public usserLogged: Sysusuario = null;
  public destroyed = new Subject<any>();

  @ViewChild(AdDirective, { static: true }) adHost: AdDirective;

  constructor(private presolicitudService: PresolicitudService,
    private personaService: PersonaService,
    private userService: UserService,
    private inscripcionService: InscripcionService,
    private cuestionarioService: CuestionarioService,
    private respuestaService: RespuestaService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router) { }

  ngOnInit() {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      pairwise(),
      filter((events: RouterEvent[]) => events[0].url === events[1].url),
      startWith('initial call'),
      takeUntil(this.destroyed)
    ).subscribe(() => {
      this.usserLogged = this.userService.getUserLoggedIn();
      this.habilitaBotonEvolucionEstado();
      this.loadListaPresolicitud();
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

  onChange(idcue: number, isChecked: boolean) {
    let selectedCuestionario = this.listCuestionarioSeleccion;
    if (isChecked) {
      selectedCuestionario.push(idcue);
    } else {
      selectedCuestionario = this.listCuestionarioSeleccion.filter(item => item !== idcue);
    }
    this.listCuestionarioSeleccion = selectedCuestionario;
    console.log(selectedCuestionario);
  }

  public load(): void {
    this.listTipoOpcionTitulacion = Tipo.loadDocumentoAll();
    this.inscripcionService.getUltimoRegistroInscripcion().subscribe(
      (idinscripcion) => {
        if (idinscripcion != null) {
          this.cuestionarioService.getByIdsTipoIdInscripcion(Estaticos.TIPO_ID_CUESTIONARIO_INSCRIPCION.toString(), idinscripcion).subscribe(
            (cuestionarios: Cuestionario[]) => {
              this.listCuestionario = cuestionarios;
            }
          );
        }
      }
    );
  }

  loadListaPresolicitud() {
    this.personaService.getByCedula(this.usserLogged.persona.perCedula).subscribe(
      (persona) => {
        this.persona = persona;
        if (persona != null) {
          this.presolicitudService.getAllByCedula(persona).subscribe(
            (presolicituds: Presolicitud[]) => {
              this.listPresolicitud = presolicituds;
            }
          );
        }
      }
    );
  }
  
  public habilitaBotonEvolucionEstado(): void {
    this.inscripcionService.getInscripcionActivaMaxSecuencial().subscribe(
      (maxsecuencial) => {
        this.maxsecuencial = maxsecuencial;
        if (maxsecuencial != null) {
          this.inscripcionService.getById(maxsecuencial).subscribe(
            (auxinscripcion) => {
              if (auxinscripcion != null) {
                this.listDataEstadoInscripcion = Estado.loadInscripcionAccion();
                let errores: String[] = [];
                let valor: number = 0;
                this.presolicitudService.getAllByCedulaId(this.usserLogged.persona, auxinscripcion).subscribe(
                (listpresol: Presolicitud[]) => {
                    if (listpresol != undefined && listpresol.length > 0) {
                      listpresol.forEach(objpre => {
                        if (objpre != null) {
                          valor = objpre.pslIdEstado;
                          this.listDataEstadoInscripcion.forEach(objest => {
                            if (objest.id == valor) {
                              errores.push(valor.toString());
                            }
                          });
                        }
                      });
                      if (errores.length > 0) {
                        this.habilitaBotonInscripcion = true;
                      } else {
                        this.habilitaBotonInscripcion = false;
                      }
                      console.log(this.habilitaBotonInscripcion);
                    }
                  }
                );                  
              }
            }
          );
        }
      }
    );
  }

  loadComponent() {
    const adItem = new AdItem(EstudianteinscripcionDialogComponent, { idIns: null });
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }

  openDialogCrear(): void {
    Gestor.fn.destroyDialog('dialogCrear');
    $('#dialogCrear').dialog({
      title: 'Formulario Presolicitud',
      modal: true,
      minWidth: 800,
      resizable: false
    });
    //this.loadComponent();
    Gestor.fn.positionDialog();
    this.presolicitud = new Presolicitud();
    $('#dialogCrear div.dialog-content').show();
  }

  public verificaSeleccionRequisitos(): boolean {
    let valida: boolean = true;
    try {
      if (this.presolicitud.pslIdOpcion == null || this.presolicitud.pslIdOpcion == 0) {
        swal.fire("Campos imcompletos", "Seleccione una Opción de Titulación", 'warning');
        return false;
      }
      if (this.listCuestionario != null && this.listCuestionarioSeleccion != null) {
        if (this.listCuestionario.length != this.listCuestionarioSeleccion.length) {
          swal.fire("Campos imcompletos", "No puede seguir con el proceso de inscripción debido a que es necesario cumplir con todos los requisitos", 'warning');
          return false;
        }
      }
    } catch (error) {
      console.error('Here is the error message', error);
      return false;
    }
    return valida;
  }

  public create(): void {
    if (this.verificaSeleccionRequisitos()) {
      let mensaje = 'Los siguientes datos serán verificados por el personal administrativo de la Universidad Politécnica Salesiana. <br>'
        + ' En caso de que la información registrada sea errónea : <br>'
        + ' - Se penalizará con la DENEGACIÓN de su inscripción en la presente convocatoria de inscripción. <br>'
        + ' - No podrá aplicar hasta la próxima convocatoria de inscripciones. <br>';
      swal.fire(mensaje).then((result) => {
        if (result.value) {
          let errores: String[] = [];
          try {
            if (this.verificaSeleccionRequisitos() == true) {
              let utilfecha = new Date();
              if (this.listCuestionarioSeleccion != null) {
                this.inscripcionService.getUltimoRegistroInscripcion().subscribe(
                  (idultimo) => {
                    if (idultimo != null) {
                      this.inscripcionService.getInscripcionActivaMaxSecuencial().subscribe(
                        (maxsecuencial) => {
                          if (maxsecuencial != null) {
                            this.inscripcionService.getById(maxsecuencial).subscribe(
                              (auxinscripcion) => {
                                if (auxinscripcion != null) {
                                  this.enpresolicitud = new Presolicitud();
                                  //this.enpresolicitud.inscripcion = auxinscripcion;
                                  //this.enpresolicitud.persona = this.usserLogged2.persona;
                                  this.enpresolicitud.idInscripcion = auxinscripcion.idIns;
                                  this.enpresolicitud.idPersona = this.usserLogged.persona.idPer;
                                  this.enpresolicitud.pslIdEstado = Estaticos.ESTADO_PRESOLICITUD_ENVIADO;
                                  this.enpresolicitud.pslMensaje = (this.presolicitud.pslMensaje != null ? this.presolicitud.pslMensaje.toUpperCase().trim() : this.presolicitud.pslMensaje);
                                  this.enpresolicitud.pslIdOpcion = this.presolicitud.pslIdOpcion;
                                  this.enpresolicitud.pslFecha = utilfecha;
                                  this.enpresolicitud.pslActivo = true;
                                  this.presolicitudService.create(this.enpresolicitud).subscribe(
                                    (response) => {
                                      if (response) {
                                        this.listCuestionario.forEach(objcue => {
                                          this.listCuestionarioSeleccion.forEach(objcuesel => {
                                            if (objcue.idCue == objcuesel) {
                                              let enrespuesta: Respuesta = new Respuesta();
                                              //enrespuesta.cuestionario = objcue;
                                              //enrespuesta.presolicitud = this.enpresolicitud;
                                              enrespuesta.idCuestionario = objcue.idCue;
                                              enrespuesta.idPresolicitud = this.enpresolicitud.idPsl;
                                              enrespuesta.resValor = true;
                                              this.respuestaService.create(enrespuesta).subscribe(
                                                (response2) => {
                                                  if (response2) {
                                                    // $('#dialog').dialog('close');
                                                    // swal.fire(Lang.messages.register_new, "Se registro un nueva inscripción", 'success');
                                                    // this.router2.navigate(['/dashboard/estudianteinscripcion'])
                                                    //notificacionGlobal("Notificaciones", "Se registro un nueva inscripción", "/convocatoriatema");
                                                  } else {
                                                    errores.push("" + enrespuesta);
                                                  }
                                                }
                                              );
                                            }
                                          });
                                        });
                                        if (errores.length == 0) {
                                          //reloadLists(1);
                                          swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_OK_REGISTRA, 'success');
                                          //Mensajes.mensajeInfo(null, MENSAJE_OK_REGISTRA, null);
                                          $('#dialogCrear').dialog('close');
                                          swal.fire(Lang.messages.register_new, "Se registro un nueva inscripción", 'success');
                                          //this.router2.navigate(['/dashboard/estudianteinscripcion'])
                                          this.ngOnInit();  
                                          this.habilitaBotonEvolucionEstado();
                                          (document.getElementById('btnnuevo') as HTMLInputElement).disabled = false;                             
                                        } else {
                                          swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_ERROR_REGISTRA, 'error');
                                          //Mensajes.mensajeError(null, MENSAJE_ERROR_REGISTRA, null);
                                        }
                                      }
                                    }
                                  );
                                } else {
                                  swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_ERROR_REGISTRA, 'error');
                                  //Mensajes.mensajeError(null, MENSAJE_ERROR_REGISTRA, null);
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
                swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_ERROR_SELECCION, 'error');
                //Mensajes.mensajeError(null, MENSAJE_ERROR_SELECCION, null);
              }
            } else {
              swal.fire(Lang.messages.register_new, "No puede seguir con el proceso de inscripción debido a que es necesario cumplir con todos los requisitos", 'error');
              //Mensajes.mensajeError(null, "No puede seguir con el proceso de inscripción debido a que es necesario cumplir con todos los requisitos", null);
            }
          } catch (error) {
            console.error('Here is the error message', error);
            return false;
          }
        }
      });
    }
  }
}

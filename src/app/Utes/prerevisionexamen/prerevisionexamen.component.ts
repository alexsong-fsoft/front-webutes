import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Sysusuario } from 'src/app/sysusuario/sysusuario';
import { AdDirective } from 'src/app/Estudiante/estudiantetema/ad.directive';
import { UserService } from 'src/app/login/user.service';
import { Estaticos } from 'src/app/app.constants';
import { Presolicitud } from 'src/app/presolicitud/presolicitud';
import { PresolicitudService } from 'src/app/presolicitud/presolicitud.service';
import { PersonaService } from 'src/app/persona/persona.service';
import { AdItem } from 'src/app/Estudiante/estudiantetema/ad-item';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { PrerevisionexamendetalleComponent } from './prerevisionexamendetalle.component';
import { Tipo } from 'src/app/tipo/Tipo';
import { CuestionarioService } from 'src/app/cuestionario/cuestionario.service';
import { RespuestaService } from 'src/app/respuesta/respuesta.service';
import { InscripcionService } from 'src/app/inscripcion/inscripcion.service';
import { Cuestionario } from 'src/app/cuestionario/cuestionario';
import { Respuesta } from 'src/app/respuesta/respuesta';
import { Estado } from 'src/app/estado/Estado';
import swal from 'sweetalert2';
import Lang from '../../../assets/app.lang.json';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-prerevisionexamen',
  templateUrl: './prerevisionexamen.component.html'
})
export class PrerevisionexamenComponent implements OnInit {
  private listEstudiantesExamen: Presolicitud[];
  private listTipoDocumento: Tipo[];
  private presolicitud: Presolicitud = new Presolicitud();
  private listCuestionarioTodos: Cuestionario[];
  private listCuestionarioTodosSeleccion: number[] = [];
  private presolicitudRespuestas: Respuesta[] = [];
  private listEstadoInscripcion: Estado[] = [];
  public usserLogged: Sysusuario = null;

  @ViewChild(AdDirective, { static: true }) adHost: AdDirective;

  constructor(private presolicitudService: PresolicitudService,
    private userService: UserService,
    private inscripcionService: InscripcionService,
    private cuestionarioService: CuestionarioService,
    private respuestaService: RespuestaService,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.usserLogged = this.userService.getUserLoggedIn();
    this.getListEstudiantesExamen();
    this.listTipoDocumento = Tipo.loadDocumentoAll();
    this.listEstadoInscripcion = Estado.loadInscripcion();
  }

  getListEstudiantesExamen(): Presolicitud[] {
    this.presolicitudService.getAllByOpcionEstado(Estaticos.TIPO_ID_OPCIONTITULACION_EXAMEN, Estaticos.ESTADO_PRESOLICITUD_APROBADO + "," + Estaticos.ESTADO_PRESOLICITUD_ENLISTAESPERA).subscribe(
      (presolicituds: Presolicitud[]) => {
        this.listEstudiantesExamen = presolicituds;
      }
    );
    return this.listEstudiantesExamen;
  }

  loadComponent(idPsl: number) {
    const adItem = new AdItem(PrerevisionexamendetalleComponent, { idPsl: idPsl });
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }


  loadComponent2(idPsl: number) {
    let id = idPsl;
    if (id) {
      this.presolicitudService.getById(id).subscribe((presolicitud) => this.presolicitud = presolicitud)
      this.respuestaService.getAllByIdPresolicitud(id).subscribe((respuestas) => this.presolicitudRespuestas = respuestas)
    }
    this.inscripcionService.getUltimoRegistroInscripcion().subscribe(
      (idinscripcion) => {
        if (idinscripcion != null) {
          let idstipo: string = Estaticos.TIPO_ID_CUESTIONARIO_INSCRIPCION + "," + Estaticos.TIPO_ID_CUESTIONARIO_PREREVISION;
          this.cuestionarioService.getByIdsTipoIdInscripcion(idstipo, idinscripcion).subscribe(
            (cuestionarios: Cuestionario[]) => {
              this.listCuestionarioTodos = cuestionarios;
              setTimeout(function () {
                Gestor.fn.initForms();
              }, 300);
            }
          );
        }
      }
    );
  }

  openDialog(idPsl: number): void {
    this.loadComponent(idPsl);
    $('#dialog').dialog({
      title: 'Detalle',
      modal: true,
      minWidth: 800,
      resizable: false
    });
    Gestor.fn.positionDialog();
  }

  openDialogUtesPrerevision(idPsl: number): void {
    Gestor.fn.destroyDialog('dialogUtesPrerevision');
    $('#dialogUtesPrerevision').dialog({
      title: 'Revision Previa',
      modal: true,
      minWidth: 800,
      resizable: false
    });
    this.loadComponent2(idPsl);
    Gestor.fn.positionDialog();
    $('#dialogUtesPrerevision div.dialog-content').show();
  }


  habilitaBotonEditaPresolicitudExamen(idestado: number): boolean {
    try {
      if (idestado == Estaticos.ESTADO_PRESOLICITUD_APROBADO || idestado == Estaticos.ESTADO_PRESOLICITUD_ENLISTAESPERA) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error('Here is the error message', error);
    }
    return false;
  }

  public getNombreTipoPorLista(idTipo: number): String {
    return Tipo.getNombreTipoPorLista(idTipo, this.listTipoDocumento);
  }

  public getRespuestaValor(idcuestionario: number, idpresol: number): Boolean {
    let valor: Boolean = false;
    this.respuestaService.getByIdPresolicitudIdCuestionario(idcuestionario, idpresol).subscribe(
      (auxresp) => {
        if (auxresp != null) {
          if (auxresp.resValor == null) {
            valor = false;
          } else {
            valor = auxresp.resValor;
            return valor;
          }
        }
      }
    );
    return valor;
  }

  onChange(idcue: number, isChecked: boolean) {
    let selectedCuestionario = this.listCuestionarioTodosSeleccion;
    if (isChecked) {
      selectedCuestionario.push(idcue);
    } else {
      selectedCuestionario = this.listCuestionarioTodosSeleccion.filter(item => item !== idcue);
    }
    this.listCuestionarioTodosSeleccion = selectedCuestionario;
    console.log(selectedCuestionario);
  }

  public updateRespuestaRevisionExamen(): void {
    let estadoanterior: number;
    try {
      let error = [];
      if (this.listCuestionarioTodosSeleccion.length != 0) {
        if (this.presolicitud != null) {
          estadoanterior = this.presolicitud.pslIdEstado;
          this.presolicitud.pslIdEstadoAnterior = estadoanterior;
          this.presolicitud.pslIdEstado = Estaticos.ESTADO_PRESOLICITUD_PREREVISADO;
          this.presolicitudService.update(this.presolicitud).subscribe(
            (response) => {
              if(response){
                this.listCuestionarioTodosSeleccion.forEach(idCue => {
                  this.respuestaService.getByIdPresolicitudIdCuestionario(this.presolicitud.idPsl, idCue).subscribe(
                    (auxrespuesta) => {
                      if (auxrespuesta != null) {
                        auxrespuesta.resPrerevision = true;
                        this.respuestaService.update(auxrespuesta).subscribe(
                          (response) => {
                            if(response)  {

                            } else {
                              error.push("PROBLEMAS AL ACTUALIZAR  RESPUESTA");    
                            }
                          }
                        )
                      } else {
                        let auxresp: Respuesta = new Respuesta();
                        //auxresp.cuestionario = objcue;
                        //auxresp.setPresolicitud(this.presolicitud);
                        auxresp.idCuestionario = idCue;
                        auxresp.idPresolicitud = this.presolicitud.idPsl;
                        auxresp.resPrerevision = true;
                        this.respuestaService.create(auxresp).subscribe(
                          (response) => {
                            if(response)  {

                            } else {
                              error.push("PROBLEMAS AL ALMACENAR NUEVA RESPUESTA");
                            }
                          }
                        )
                      }
                    }
                  );
                });   
                
                if (error.length = 0) {
                  this.listCuestionarioTodosSeleccion = [];
                  swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_OK_REGISTRA, 'warning');
                  $('#dialogUtesPrerevision').dialog('close');
                  this.ngOnInit();
                } else {
                  this.listCuestionarioTodosSeleccion = [];
                  swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_ERROR_REGISTRA, 'warning');
                }
              }
            }
          )
         }
         else {
          error.push("Es necesario seleccinar un registro");
         }

      }
    }catch (error) {
      console.error('Here is the error message', error);
    }
  }
}

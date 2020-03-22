import { Component, Input } from '@angular/core';

import { Inscripcion } from 'src/app/inscripcion/inscripcion';
import { InscripcionService } from 'src/app/inscripcion/inscripcion.service';
import { AdComponent } from '../estudiantetema/ad.component';
import swal from 'sweetalert2';
import Lang from '../../../assets/app.lang.json';
import { Presolicitud } from 'src/app/presolicitud/presolicitud';
import { Tipo } from 'src/app/tipo/Tipo';
import { Cuestionario } from 'src/app/cuestionario/cuestionario';
import { CuestionarioService } from 'src/app/cuestionario/cuestionario.service';
import { Estaticos } from 'src/app/app.constants';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import * as _ from "lodash";
import { Sysusuario } from 'src/app/sysusuario/sysusuario';
import { UserService } from 'src/app/login/user.service';
import { PresolicitudService } from 'src/app/presolicitud/presolicitud.service';
import { Respuesta } from 'src/app/respuesta/respuesta';
import { RespuestaService } from 'src/app/respuesta/respuesta.service';
import { Router } from '@angular/router';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  templateUrl: './estudianteinscripciondialog.component.html'
})
export class EstudianteinscripcionDialogComponent implements AdComponent {
  @Input() data: any;
  private inscripcion: Inscripcion = new Inscripcion();
  private presolicitud: Presolicitud = new Presolicitud();
  private enpresolicitud: Presolicitud;
  private titulo: string = "Inscripcion";
  private listTipoOpcionTitulacion: Tipo[];
  private listCuestionario: Cuestionario[];
  private listCuestionarioSeleccion: number[] = [];
  public usserLogged2: Sysusuario = null;

  constructor(private userService2: UserService,
    private inscripcionService2: InscripcionService,
    private cuestionarioService: CuestionarioService,
    private presolicitudService2: PresolicitudService,
    private respuestaService: RespuestaService,
    private router2: Router) { }

  ngOnInit() {
    this.usserLogged2 = this.userService2.getUserLoggedIn();
    this.load();
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
    this.inscripcionService2.getUltimoRegistroInscripcion().subscribe(
      (idinscripcion) => {
        if (idinscripcion != null) {
          this.cuestionarioService.getByIdsTipoIdInscripcion(Estaticos.TIPO_ID_CUESTIONARIO_INSCRIPCION.toString(), idinscripcion).subscribe(
            (cuestionarios: Cuestionario[]) => {
              this.listCuestionario = cuestionarios;
              setTimeout(function () {
                Gestor.fn.initForms();
              }, 300);
            }
          );
        }
      }
    );
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
                this.inscripcionService2.getUltimoRegistroInscripcion().subscribe(
                  (idultimo) => {
                    if (idultimo != null) {
                      this.inscripcionService2.getInscripcionActivaMaxSecuencial().subscribe(
                        (maxsecuencial) => {
                          if (maxsecuencial != null) {
                            this.inscripcionService2.getById(maxsecuencial).subscribe(
                              (auxinscripcion) => {
                                if (auxinscripcion != null) {
                                  this.enpresolicitud = new Presolicitud();
                                  //this.enpresolicitud.inscripcion = auxinscripcion;
                                  //this.enpresolicitud.persona = this.usserLogged2.persona;
                                  this.enpresolicitud.idInscripcion = auxinscripcion.idIns;
                                  this.enpresolicitud.idPersona = this.usserLogged2.persona.idPer;
                                  this.enpresolicitud.pslIdEstado = Estaticos.ESTADO_PRESOLICITUD_ENVIADO;
                                  this.enpresolicitud.pslMensaje = (this.presolicitud.pslMensaje != null ? this.presolicitud.pslMensaje.toUpperCase().trim() : this.presolicitud.pslMensaje);
                                  this.enpresolicitud.pslIdOpcion = this.presolicitud.pslIdOpcion;
                                  this.enpresolicitud.pslFecha = utilfecha;
                                  this.enpresolicitud.pslActivo = true;
                                  this.presolicitudService2.create(this.enpresolicitud).subscribe(
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
                                          $('#dialog').dialog('close');
                                          swal.fire(Lang.messages.register_new, "Se registro un nueva inscripción", 'success');
                                          this.router2.navigate(['/dashboard/estudianteinscripcion'])
                                          
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

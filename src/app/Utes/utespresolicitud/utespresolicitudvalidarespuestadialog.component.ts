import { Component, OnInit, Input } from '@angular/core';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { Router } from '@angular/router';
import { Sysusuario } from 'src/app/sysusuario/sysusuario';
import { UserService } from 'src/app/login/user.service';
import { Inscripcion } from 'src/app/inscripcion/inscripcion';
import { InscripcionService } from 'src/app/inscripcion/inscripcion.service';
import { Presolicitud } from 'src/app/presolicitud/presolicitud';
import { Cuestionario } from 'src/app/cuestionario/cuestionario';
import { CuestionarioService } from 'src/app/cuestionario/cuestionario.service';
import { PresolicitudService } from 'src/app/presolicitud/presolicitud.service';
import { RespuestaService } from 'src/app/respuesta/respuesta.service';
import { Tipo } from 'src/app/tipo/Tipo';
import { Estaticos } from 'src/app/app.constants';
import swal from 'sweetalert2';
import Lang from '../../../assets/app.lang.json';
import { Respuesta } from 'src/app/respuesta/respuesta.js';
import { Estado } from 'src/app/estado/Estado.js';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  templateUrl: './utespresolicitudvalidarespuestadialog.component.html'
})
export class UtespresolicitudvalidarespuestadialogComponent implements AdComponent {
  @Input() data: any;
  public usserLogged: Sysusuario = null;
  private presolicitud: Presolicitud = null;
  private presolicitudRespuestas: Respuesta[] = null;
  private listEstadoPresolicitudAccion: Estado[];
  private listCuestionarioSeleccion: number[] = [];

  private inscripcion: Inscripcion = new Inscripcion();
  private enpresolicitud: Presolicitud;
  private titulo: string = "Inscripcion";
  private listCuestionario: Cuestionario[];

  constructor(private userService: UserService,
    private inscripcionService: InscripcionService,
    private cuestionarioService: CuestionarioService,
    private presolicitudService: PresolicitudService,
    private respuestaService: RespuestaService,
    private router: Router) { }

  ngOnInit() {
    this.usserLogged = this.userService.getUserLoggedIn();
    this.load();
  }

  public load(): void {
    let id = this.data.idPsl;
    if (id) {
      this.presolicitudService.getById(id).subscribe((presolicitud) => this.presolicitud = presolicitud)
      this.respuestaService.getAllByIdPresolicitud(id).subscribe((respuestas) => this.presolicitudRespuestas = respuestas)
    }
    this.listEstadoPresolicitudAccion = Estado.loadInscripcionAccion();
    setTimeout(function () {
      Gestor.fn.initForms();
    }, 300);
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

  public updateRespuesta(): void {
    let validacion: boolean = false;
    try {
      if (this.presolicitud != null) {
        let errores: String[] = [];
        this.presolicitudService.getById(this.presolicitud.idPsl).subscribe(
          (presolicitudResp) => {
            let auxpresolicitud = presolicitudResp;
            auxpresolicitud.pslIdEstado = this.presolicitud.pslIdEstado;
            auxpresolicitud.pslObservacion = this.presolicitud.pslObservacion;
            this.presolicitudService.update(auxpresolicitud).subscribe(
              (response) => {
                if (response) {
                  if (this.presolicitudRespuestas != null) {
                    this.presolicitudRespuestas.forEach(objres => {
                      objres.resValidacion = true;
                      this.respuestaService.update(objres).subscribe(
                        (response2) => {
                          if (response2) {
                          } else {
                            errores.push("Error" + objres);
                          }
                        }
                      );
                    });
                  }
                  if (errores.length == 0) {
                    $('#dialog2').dialog('close');
                    swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_OK_ACTUALIZA, 'success');
                    this.router.navigate(['/dashboard/utespresolicitud'])
                  } else {
                    swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_ERROR_ACTUALIZA, 'error');
                  }                 
                } else {
                  swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_ERROR_ACTUALIZA, 'error');
                }
              }
            );
          }
        );
      } else {
        swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_ERROR_SELECCION, 'error');
      }
    } catch (error) {
      console.error('Here is the error message', error);
    }
  }
}

import { Component, OnInit, Input } from '@angular/core';
import swal from 'sweetalert2';
import Lang from '../../../assets/app.lang.json';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component.js';
import { Sysusuario } from 'src/app/sysusuario/sysusuario.js';
import { Presolicitud } from 'src/app/presolicitud/presolicitud.js';
import { Respuesta } from 'src/app/respuesta/respuesta.js';
import { Estado } from 'src/app/estado/Estado.js';
import { Inscripcion } from 'src/app/inscripcion/inscripcion.js';
import { Cuestionario } from 'src/app/cuestionario/cuestionario.js';
import { UserService } from 'src/app/login/user.service.js';
import { InscripcionService } from 'src/app/inscripcion/inscripcion.service.js';
import { CuestionarioService } from 'src/app/cuestionario/cuestionario.service.js';
import { PresolicitudService } from 'src/app/presolicitud/presolicitud.service.js';
import { RespuestaService } from 'src/app/respuesta/respuesta.service.js';
import { Router } from '@angular/router';
import { Estaticos } from 'src/app/app.constants.js';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  //selector: 'app-prerevisionexamendetalle',
  templateUrl: './prerevisionexamendetalle.component.html'
})
export class PrerevisionexamendetalleComponent implements AdComponent {
@Input() data: any;
  private presolicitud: Presolicitud = null;
  private titulo: string = "Inscripcion";
  private listCuestionarioTodos: Cuestionario[];
  private presolicitudRespuestas: Respuesta[] = [];

  constructor(
    private presolicitudService: PresolicitudService,
    private inscripcionService: InscripcionService,
    private cuestionarioService: CuestionarioService,
    private respuestaService: RespuestaService) { }

  ngOnInit() {
    //this.usserLogged = this.userService.getUserLoggedIn();
    this.load();
  }

  public load(): void {
    let id = this.data.idPsl;
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


}

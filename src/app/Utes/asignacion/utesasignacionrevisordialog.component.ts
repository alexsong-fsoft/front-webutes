import { Component, OnInit, Input } from '@angular/core';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { Sysusuario } from 'src/app/sysusuario/sysusuario';
import { UserService } from 'src/app/login/user.service';
import { PeriodoService } from 'src/app/periodo/periodo.service';
import { Estaticos } from 'src/app/app.constants';
import { SysusuarioService } from 'src/app/sysusuario/sysusuario.service';
import { Tipo } from 'src/app/tipo/Tipo';
import { Tema } from 'src/app/tema/tema';
import { TemaService } from 'src/app/tema/tema.service';
import { AsignadoService } from 'src/app/asignado/asignado.service';
import { Asignado } from 'src/app/asignado/asignado';
import { PersonaService } from 'src/app/persona/persona.service';
import { Persona } from 'src/app/persona/persona';

@Component({
  // selector: 'app-utesasignacionrevisordialog',
  templateUrl: './utesasignacionrevisordialog.component.html'
})
export class UtesasignacionrevisordialogComponent implements AdComponent {
  @Input() data: any;
  public usserLogged: Sysusuario = null;
  private tema: Tema = new Tema();
  public usserSelected: Sysusuario = new Sysusuario();
  private listUsuarioRevisor: Sysusuario[];
  private listTipoDocumento: Tipo[];
  private listPerAsignaRevisorSelected: Asignado[];
  
  constructor(private userService: UserService,
    private periodoService: PeriodoService,
    private temaService: TemaService,
    private sysusuarioService: SysusuarioService,
    private asignadoService: AsignadoService,
    private personaService: PersonaService) { }

  ngOnInit() {
    this.usserLogged = this.userService.getUserLoggedIn();
    this.load();
  }

  public load(): void {
    this.listTipoDocumento = Tipo.loadDocumento();
    let id = this.data.idTema;
    if (id) {      
      this.getListUsuarioRevisor(id);
      this.getListPerAsignaRevisorSelected(id);
      this.temaService.getById(id).subscribe(
        (tema) => {
          if (tema != null) {
            this.tema = tema; 
          } 
        }
      )
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
                    this.listUsuarioRevisor = sysusuarios;
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
    if(this.validar()){
      this.asignadoService.getByIdPersonaIdTemaAsgIdTipoIdEstadorev(this.usserSelected.idUsr, this.tema.idTem, Estaticos.TIPO_ID_ASIGNACION_REVISOR, Estaticos.ESTADO_ID_TEMA_REVISA_PROCESO).subscribe(
        (auxasigando) => {
          if (auxasigando == null) {
            this.personaService.getById(this.usserSelected.idUsr).subscribe(
              (persona) => {
                let utilfecha = new Date();
                let enasignado:Asignado = new Asignado();
                enasignado.tema = this.tema;
                enasignado.persona = persona;
                enasignado.asgIdTipo = Estaticos.TIPO_ID_ASIGNACION_REVISOR;
                enasignado.asgFechaRegistro = utilfecha;
                enasignado.asgActivo = true;
                enasignado.asgIdEstadoTema = Estaticos.ESTADO_ID_TEMA_REVISA_PROCESO;
                this.asignadoService.create(enasignado).subscribe(
                  (response) => {
                    if (response) {
                      this.tema.temIdEstado = Estaticos.ESTADO_TEMA_PRE_ASIGNAREVISOR;
                      this.temaService.update(this.tema).subscribe(
                        (response2) => {
                          if (response2) {
                            this.usserSelected.idUsr = null;
                            this.load();
                            // if (daoconfigura.activaProcesoByCampo(CONFIG_ASIGNA_TEMAREVISOR)) {
                            //   auxuser: Sysusuario = daousuario.obtenerUsuarioPorPersonaId(enasignado.getPersona().getIdPer());
                            //   utilcorreo.setDataUsuario(auxuser, "Asignacción revisión de tema", "Se ha asigando el tema: " + enTemaDetalleSeleccion.getTemNombre() + ", Para la respectiva revisión.", "");
                            //   utilcorreo.sendNotificaNuevo();
                            // }
                            // this.enUsuarioValorUtes = null;
                            //Mensajes.mensajeInfo(null, MENSAJE_OK_REGISTRA, null);
                          }
                          else {
                            //Mensajes.mensajeError(null, "TEMA " + MENSAJE_ERROR_ACTUALIZA, null);
                          }
                        }
                      );                      
                    }
                    else {
                      //Mensajes.mensajeError(null, "ASIGNACIÓN " + MENSAJE_ERROR_REGISTRA, null);
                    }
                  }
                );
              }
            );
          }
          else {
            // this.enUsuarioValorUtes = null;
            // Mensajes.mensajeError(null, "TEMA YA ASIGNADO AL DOCENTE", null);
          }
        }
      );

    }
  }

  public validar(): boolean {
    let validacion:boolean = false;
    if(this.usserSelected != null && this.usserSelected.idUsr != null){
      validacion = true;
    }
    return validacion;
  }

  public getListPerAsignaRevisorSelected(idtema: number): Asignado[] {
    this.asignadoService.getByIdTemaIdTipo(idtema, Estaticos.TIPO_ID_ASIGNACION_REVISOR).subscribe(
      (asignados) => {
        this.listPerAsignaRevisorSelected = asignados;
      }
    );
    return this.listPerAsignaRevisorSelected;
  }

}

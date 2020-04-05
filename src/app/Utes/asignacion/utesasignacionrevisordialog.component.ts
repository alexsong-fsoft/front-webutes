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
import swal from 'sweetalert2';
import Lang from '../../../assets/app.lang.json';
import { Informe } from 'src/app/informe/informe';
import { InformeService } from 'src/app/informe/informe.service';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

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
    private personaService: PersonaService,
    private informeService: InformeService) { }

  ngOnInit() {
    this.usserLogged = this.userService.getUserLoggedIn();
    this.listTipoDocumento = Tipo.loadDocumento();
    this.reset();
    this.load();
  }

  public load(): void {
    console.log('reset ' + this.data.idTema);
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

  public reset(): void {
    this.tema = new Tema();
    this.usserSelected = new Sysusuario();
    this.usserSelected.idUsr = null;
    this.listPerAsignaRevisorSelected = [];    
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
                              console.log('se actualizó estado tema');
                              this.reset();
                              this.load();
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

  public deleteUtesAsignaRevisor(asignado: Asignado): void{
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
                                this.reset();
                                this.load();
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
        this.listPerAsignaRevisorSelected = asignados;
      }
    );
    return this.listPerAsignaRevisorSelected;
  }

}


import { Component, OnInit} from '@angular/core';
import { TemaService } from 'src/app/tema/tema.service';
import { AsignadoService } from 'src/app/asignado/asignado.service';
import { Tema } from 'src/app/tema/tema';
import { Estaticos } from 'src/app/app.constants';
import { Asignado } from 'src/app/asignado/asignado';
import { Sysusuario } from 'src/app/sysusuario/sysusuario';
import { UserService } from 'src/app/login/user.service';
import { Estado } from 'src/app/estado/Estado';
import { Tipo } from 'src/app/tipo/Tipo';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-estudianteevolucion',
  templateUrl: './estudianteevolucion.component.html'
})

export class EstudianteevolucionComponent {
  private asig: Asignado = null;
  private listEstudianteEvolucion: Tema[];
  private listEstadoPostTema: Estado[];
  private listTipoDocumento: Tipo[];
  public usserLogged: Sysusuario = null;
  
  constructor(private userService: UserService,
    private temaService: TemaService, 
    private asignadoService: AsignadoService) {}

  ngOnInit() {
    this.usserLogged = this.userService.getUserLoggedIn();
    this.getListEstudianteEvolucion();
    this.listEstadoPostTema = Estado.loadPostTema();
    this.listTipoDocumento = Tipo.loadDocumento();
  }

  getListEstudianteEvolucion(): Tema[] {
    this.asignadoService.getByIdPersona2(this.usserLogged.idPersona).subscribe(
      (asignado) => {
        this.asig = asignado;
        if (asignado != null) {
          let estados: string = Estaticos.ESTADO_TEMA_POST_APROBADO + "," + Estaticos.ESTADO_TEMA_POST_CERRADO + "," + Estaticos.ESTADO_TEMA_POST_ANULADO + "," + Estaticos.ESTADO_TEMA_POST_LECTORPROYECTO + "," + Estaticos.ESTADO_TEMA_POST_PRORROGA;
          this.temaService.getByIdstemasEstados(this.asig.tema.idTem.toString(), estados).subscribe(
            (temas: Tema[]) => {
              this.listEstudianteEvolucion = temas;
            }
          );
        }
      }
    );
    return this.listEstudianteEvolucion;
  }

  public getNombreEstadoPorLista(idEstado: number): String {
    return Estado.getNombreEstadoPorLista(idEstado, this.listEstadoPostTema);
  }

  public getNombreTipoPorLista(idTipo: number): String {
    return Tipo.getNombreTipoPorLista(idTipo, this.listTipoDocumento);
  }
  
  
}

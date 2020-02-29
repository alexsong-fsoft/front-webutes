import { Component, OnInit } from '@angular/core';
import { Asignado } from 'src/app/asignado/asignado';
import { Tema } from 'src/app/tema/tema';
import { Sysusuario } from 'src/app/sysusuario/sysusuario';
import { UserService } from 'src/app/login/user.service';
import { TemaService } from 'src/app/tema/tema.service';
import { AsignadoService } from 'src/app/asignado/asignado.service';
import { Estaticos } from 'src/app/app.constants';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-docenteevolucion',
  templateUrl: './docenteevolucion.component.html'
})
export class DocenteevolucionComponent implements OnInit {
  titulo: string = "Evolución de Trabajo";
  asig: Asignado = null;
  listDocenteEvolucion: Tema[];
  public usserLogged: Sysusuario = null;
  
  constructor(private userService: UserService,
    private temaService: TemaService, 
    private asignadoService: AsignadoService) { }

  ngOnInit() {
    this.usserLogged = this.userService.getUserLoggedIn();
    this.getListEstudianteEvolucion();
  }

  getListEstudianteEvolucion(): Tema[] {
    let estados: string = Estaticos.ESTADO_TEMA_POST_APROBADO + "," + Estaticos.ESTADO_TEMA_POST_PRORROGA + "," + Estaticos.ESTADO_TEMA_POST_CAMBIOTEMA + "," + Estaticos.ESTADO_TEMA_POST_CAMBIOTUTOR + "," + Estaticos.ESTADO_TEMA_POST_LECTORPROYECTO + "," + Estaticos.ESTADO_TEMA_POST_CERRADO;
    this.temaService.getAllByUsuarioEstados(this.usserLogged.usrUsuario, estados).subscribe(
      (temas: Tema[]) => {
        this.listDocenteEvolucion = temas;
      }
    );
    return this.listDocenteEvolucion;
  }
}

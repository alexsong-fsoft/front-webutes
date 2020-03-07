import { Component, OnInit } from '@angular/core';
import { Asignado } from 'src/app/asignado/asignado';
import { Tema } from 'src/app/tema/tema';
import { TemaService } from 'src/app/tema/tema.service';
import { AsignadoService } from 'src/app/asignado/asignado.service';
import { Estaticos } from 'src/app/app.constants';
import { Sysusuario } from 'src/app/sysusuario/sysusuario';
import { UserService } from 'src/app/login/user.service';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-docentehito',
  templateUrl: './docentehito.component.html'
})
export class DocentehitoComponent implements OnInit {
  titulo: string = "Docente - Hito";
  listDocenteHito: Tema[];
  public usserLogged: Sysusuario = null;
  
  constructor(private userService: UserService,
    private temaService: TemaService) { }

  ngOnInit() {
    this.usserLogged = this.userService.getUserLoggedIn();
    this.getListEstudianteEvolucion();
  }

  getListEstudianteEvolucion(): Tema[] {
    this.temaService.getAllByUsuarioEstados(this.usserLogged.usrUsuario, Estaticos.ESTADO_TEMA_POST_APROBADO.toString()).subscribe(
      (temas: Tema[]) => {
        this.listDocenteHito = temas;
      }
    );
    return this.listDocenteHito;
  }
}

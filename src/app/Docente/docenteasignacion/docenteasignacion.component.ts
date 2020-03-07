import { Component, OnInit } from '@angular/core';
import { Asignado } from 'src/app/asignado/asignado';
import { Tema } from 'src/app/tema/tema';
import { Sysusuario } from 'src/app/sysusuario/sysusuario';
import { UserService } from 'src/app/login/user.service';
import { TemaService } from 'src/app/tema/tema.service';
import { Estaticos } from 'src/app/app.constants';

@Component({
  selector: 'app-docenteasignacion',
  templateUrl: './docenteasignacion.component.html'
})
export class DocenteasignacionComponent implements OnInit {
  titulo: string = "Mis Temas";
  listDocenteAsigna: Tema[];
  public usserLogged: Sysusuario = null;

  constructor(private userService: UserService,
    private temaService: TemaService) { }

  ngOnInit() {
    this.usserLogged = this.userService.getUserLoggedIn();
    this.getListEstudianteEvolucion();
  }

  getListEstudianteEvolucion(): Tema[] {
    let estados = Estaticos.ESTADO_TEMA_PRE_PUBLICADO + "," + Estaticos.ESTADO_TEMA_PRE_ASIGNAESTUDIANTE;
    this.temaService.getAllByUsuarioEstados(this.usserLogged.usrUsuario, estados).subscribe(
      (temas: Tema[]) => {
        this.listDocenteAsigna = temas;
      }
    );
    return this.listDocenteAsigna;
  }

}

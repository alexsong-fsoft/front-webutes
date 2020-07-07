import { Component, OnInit } from '@angular/core';
import { Tema } from 'src/app/tema/tema';
import { TemaService } from 'src/app/tema/tema.service';
import { Estaticos } from 'src/app/app.constants';
import { Sysusuario } from 'src/app/sysusuario/sysusuario';
import { UserService } from 'src/app/login/user.service';
import { Estado } from 'src/app/estado/Estado';
import { Tipo } from 'src/app/tipo/Tipo';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-docentehito',
  templateUrl: './docentehito.component.html'
})
export class DocentehitoComponent implements OnInit {
  private listDocenteHito: Tema[];
  private listEstadoPostTema: Estado[];
  private listTipoDocumento: Tipo[];
  public usserLogged: Sysusuario = null;
  
  constructor(private userService: UserService,
    private temaService: TemaService) { }

  ngOnInit() {
    this.usserLogged = this.userService.getUserLoggedIn();
    this.listEstadoPostTema = Estado.loadPostTema();
    this.listTipoDocumento = Tipo.loadDocumento();
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

  public getNombreEstadoPorLista(idEstado: number): String {
    return Estado.getNombreEstadoPorLista(idEstado, this.listEstadoPostTema);
  }

  public getNombreTipoPorLista(idTipo: number): String {
    return Tipo.getNombreTipoPorLista(idTipo, this.listTipoDocumento);
  }
}

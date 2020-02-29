import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { Sysusuario } from 'src/app/sysusuario/sysusuario';
import { UserService } from 'src/app/login/user.service';
import { Tema } from 'src/app/tema/tema';
import { TemaService } from 'src/app/tema/tema.service';
import { PeriodoService } from 'src/app/periodo/periodo.service';
import { Periodo } from 'src/app/periodo/periodo';
import { SysusuarioService } from 'src/app/sysusuario/sysusuario.service';
import { Estaticos } from 'src/app/app.constants';

@Component({
  // selector: 'app-utesasignacionrevisordialog',
  templateUrl: './utesasignacionrevisordialog.component.html'
})
export class UtesasignacionrevisordialogComponent implements AdComponent {
  @Input() data: any;
  public usserLogged: Sysusuario = null;
  private tema: Tema = new Tema();
  private listUsuarioRevisor: Sysusuario[];

  constructor(private userService: UserService,
    private temaService: TemaService, 
    private periodoService: PeriodoService,
    private router: Router) { }

  ngOnInit() {
    this.usserLogged = this.userService.getUserLoggedIn();
    this.load();
  }

  public load(): void {
    let id = this.data.idTema;
    if (id) {
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
                //this.listUsuarioRevisor = SysusuarioService.getAllByNombrePerfilIdTemaIdPeriodo(Estaticos.TIPO_LABEL_PERFIL_DOCENTE, idtem, enperiodoActual.idPrd);
              }
            );
          } 
        }
      );
    }
  }
}

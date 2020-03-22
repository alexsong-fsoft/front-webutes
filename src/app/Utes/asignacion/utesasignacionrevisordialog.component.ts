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

@Component({
  // selector: 'app-utesasignacionrevisordialog',
  templateUrl: './utesasignacionrevisordialog.component.html'
})
export class UtesasignacionrevisordialogComponent implements AdComponent {
  @Input() data: any;
  public usserLogged: Sysusuario = null;
  private tema: Tema = new Tema();
  private listUsuarioRevisor: Sysusuario[];
  private listTipoDocumento: Tipo[];
  
  constructor(private userService: UserService,
    private periodoService: PeriodoService,
    private temaService: TemaService,
    private sysusuarioService: SysusuarioService) { }

  ngOnInit() {
    this.usserLogged = this.userService.getUserLoggedIn();
    this.load();
  }

  public load(): void {
    this.listTipoDocumento = Tipo.loadDocumento();
    let id = this.data.idTema;
    if (id) {      
      this.getListUsuarioRevisor(id);
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
  

}

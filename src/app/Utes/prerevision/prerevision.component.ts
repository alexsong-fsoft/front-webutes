import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Sysusuario } from 'src/app/sysusuario/sysusuario';
import { Tema } from 'src/app/tema/tema';
import { AdDirective } from 'src/app/Estudiante/estudiantetema/ad.directive';
import { UserService } from 'src/app/login/user.service';
import { TemaService } from 'src/app/tema/tema.service';
import { Estaticos } from 'src/app/app.constants';
import { PresolicitudService } from 'src/app/presolicitud/presolicitud.service';
import { Presolicitud } from 'src/app/presolicitud/presolicitud';
import { AsignadoService } from 'src/app/asignado/asignado.service';
import { Asignado } from 'src/app/asignado/asignado';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-prerevision',
  templateUrl: './prerevision.component.html'
})
export class PrerevisionComponent implements OnInit {
  public usserLogged: Sysusuario = null;
  listLectorAsigna: Tema[];
  
  @ViewChild(AdDirective, {static: true}) adHost: AdDirective;

  constructor(private userService: UserService,
    private temaService: TemaService,
    private presolicituService: PresolicitudService, 
    private asignadoService: AsignadoService,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.usserLogged = this.userService.getUserLoggedIn();
    this.getListLectorAsigna();
    $("#tabs_docentetema").tabs();
    this.showTab('tab-mistemas');
  }

  getListLectorAsigna(): Tema[] {
    let stbids: string = "";
    this.presolicituService.getAllByEstados(Estaticos.TIPO_ID_OPCIONTITULACION_PROYECTO + "," + Estaticos.TIPO_ID_OPCIONTITULACION_ARTICULO, Estaticos.ESTADO_PRESOLICITUD_APROBADO + "," + Estaticos.ESTADO_PRESOLICITUD_ENLISTAESPERA).subscribe(
      (presolicitudes: Presolicitud[]) => {
        if(presolicitudes != null && presolicitudes.length > 0){
          presolicitudes.forEach(presol => {
            this.asignadoService.getByIdPersona2(presol.persona.idPer).subscribe(
              (asignado: Asignado) => {
                if (asignado != null) {
                  stbids = stbids + asignado.tema.idTem.toString() + ",";
                }
              }
            );
          });
          let estados: string = Estaticos.ESTADO_TEMA_PRE_ASIGNALECTOR + "";
          this.temaService.getByIdstemasEstados(stbids, estados).subscribe(
            (temas: Tema[]) => {
              this.listLectorAsigna = temas;
            }
          );
        }
      }
    );
    return this.listLectorAsigna;
  }

  public showTab(tabid: String){
    $('#tabs_docentetema .tab-pane').hide();
    $('#'+tabid).show();
  }
  
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Sysusuario } from 'src/app/sysusuario/sysusuario';
import { AdDirective } from 'src/app/Estudiante/estudiantetema/ad.directive';
import { UserService } from 'src/app/login/user.service';
import { Inscripcion } from 'src/app/inscripcion/inscripcion';
import { Tipo } from 'src/app/tipo/Tipo';
import { InscripcionService } from 'src/app/inscripcion/inscripcion.service';
import { Estado } from 'src/app/estado/Estado';
import { PresolicitudService } from 'src/app/presolicitud/presolicitud.service';
import { Presolicitud } from 'src/app/presolicitud/presolicitud';
import { SysusuarioService } from 'src/app/sysusuario/sysusuario.service';
import { Estaticos } from 'src/app/app.constants';
import { Periodo } from 'src/app/periodo/periodo';
import { PeriodoService } from 'src/app/periodo/periodo.service';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-utesconsulta',
  templateUrl: './utesconsulta.component.html'
})
export class UtesconsultaComponent implements OnInit {
  private titulo: string = "Gestión de Temas";
  public usserLogged: Sysusuario = null;
  private presolicitudSearch: Presolicitud = new Presolicitud();  
  private listTipoOpcionTitulacion: Tipo[];
  private listInscripciones: Inscripcion[];
  private listEstadoPresolicitud: Estado[];
  private listPreaprobados: Presolicitud[];
  private listUsuarioDocente: Sysusuario[];
  private listPeriodo: Periodo[];

  @ViewChild(AdDirective, {static: true}) adHost: AdDirective;
  
  constructor(private userService: UserService,
    private inscripcionService: InscripcionService,
    private presolicitudService: PresolicitudService,
    private sysusuarioService: SysusuarioService,
    private periodoService: PeriodoService
    ) { }

  ngOnInit() {
    this.usserLogged = this.userService.getUserLoggedIn();
    $("#tabs_docentetema").tabs();
    this.showTab('tab-inscripcion');
    this.load();
    setTimeout(function () {
      Gestor.fn.initForms();
    }, 300);
  }

  public load() {
    this.listTipoOpcionTitulacion = Tipo.loadDocumentoAll();    
    this.listEstadoPresolicitud = Estado.loadInscripcion();
    this.getListUsuarioDocente();
    this.loadPeriodo();
    this.inscripcionService.getAllByEstado().subscribe(
      (inscripciones) => {
        this.listInscripciones = inscripciones;
      }
    );  
  }

  public showTab(tabid: String){
    $('#tabs_docentetema .tab-pane').hide();
    $('#'+tabid).show();
  }

  public consultaPreaprobados() {
    this.presolicitudService.getListadoPresolicitudConsulta(this.presolicitudSearch).subscribe(
      (presolicitudes) => {
        this.listPreaprobados = presolicitudes;
      }
    );
  }

  public getNombreEstadoPorLista(idEstado: number): String {
    return Estado.getNombreEstadoPorLista(idEstado, this.listEstadoPresolicitud);
  }

  public getNombreTipoPorLista(idTipo: number): String {
    return Tipo.getNombreTipoPorLista(idTipo, this.listTipoOpcionTitulacion);
  }

  public getListUsuarioDocente(): void {
    this.sysusuarioService.getAllByNombrePerfilIdPersonaTutor(Estaticos.TIPO_LABEL_PERFIL_DOCENTE, 0).subscribe(
      (sysusuarios) => {
        this.listUsuarioDocente = sysusuarios;
      }
    );
  }

  public loadPeriodo(): void {
    this.listPeriodo = [];
    this.periodoService.getAll2().subscribe(
      (periodos) => {
        if (periodos != null) {
          this.listPeriodo = periodos; 
        } 
      }
    ) 
  }



}

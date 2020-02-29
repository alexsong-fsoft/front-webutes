import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { AdDirective } from 'src/app/Estudiante/estudiantetema/ad.directive';
import { UserService } from 'src/app/login/user.service';
import { TemaService } from 'src/app/tema/tema.service';
import { AsignadoService } from 'src/app/asignado/asignado.service';
import { Sysusuario } from 'src/app/sysusuario/sysusuario';
import { Tema } from 'src/app/tema/tema';
import { Estaticos } from 'src/app/app.constants';
import { Periodo } from 'src/app/periodo/periodo';
import { PeriodoService } from 'src/app/periodo/periodo.service';
import { Convocatoria } from 'src/app/convocatoria/convocatoria';
import { ConvocatoriaService } from 'src/app/convocatoria/convocatoria.service';
import { Inscripcion } from 'src/app/inscripcion/inscripcion';
import { InscripcionService } from 'src/app/inscripcion/inscripcion.service';
import { Cuestionario } from 'src/app/cuestionario/cuestionario';
import { CuestionarioService } from 'src/app/cuestionario/cuestionario.service';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-utesconfiguracion',
  templateUrl: './utesconfiguracion.component.html'
})
export class UtesconfiguracionComponent implements OnInit {
  private titulo: string = "Gestión de Temas";
  public usserLogged: Sysusuario = null;
  listPeriodo: Periodo[];
  listConvocatoria: Convocatoria[];
  listInscripcion: Inscripcion[];
  listCuestionario: Cuestionario[];

  @ViewChild(AdDirective, {static: true}) adHost: AdDirective;
  
  constructor(private userService: UserService,
    private convocatoriaService: ConvocatoriaService, 
    private periodoService: PeriodoService, 
    private inscripcionService: InscripcionService,
    private cuestionarioService: CuestionarioService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private asignadoService: AsignadoService) { }

  ngOnInit() {
    this.usserLogged = this.userService.getUserLoggedIn();
    this.getListPeriodo();
    this.getListConvocatoria();
    this.getListInscripcion();
    this.getListCuestionario();
    $("#tabs_docentetema").tabs();
    this.showTab('tab-mistemas');
  }

  getListPeriodo(): Periodo[] {
    this.periodoService.getAll2().subscribe(
      (periodos: Periodo[]) => {
        this.listPeriodo = periodos;
      }
    );
    return this.listPeriodo;
  }

  getListConvocatoria(): Convocatoria[] {
    this.convocatoriaService.getAll().subscribe(
      (convocatorias: Convocatoria[]) => {
        this.listConvocatoria = convocatorias;
      }
    );
    return this.listConvocatoria;
  }

  getListInscripcion(): Inscripcion[] {
    this.inscripcionService.getAll().subscribe(
      (inscripciones: Inscripcion[]) => {
        this.listInscripcion = inscripciones;
      }
    );
    return this.listInscripcion;
  }

  getListCuestionario(): Cuestionario[] {
    this.cuestionarioService.getAll().subscribe(
      (cuestionarios: Cuestionario[]) => {
        this.listCuestionario = cuestionarios;
      }
    );
    return this.listCuestionario;
  }

  public showTab(tabid: String){
    $('#tabs_docentetema .tab-pane').hide();
    $('#'+tabid).show();
  }
}

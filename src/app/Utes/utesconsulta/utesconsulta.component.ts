import { Component, OnInit, ViewChild } from '@angular/core';
import { Sysusuario } from 'src/app/sysusuario/sysusuario';
import { AdDirective } from 'src/app/Estudiante/estudiantetema/ad.directive';
import { UserService } from 'src/app/login/user.service';
import { Inscripcion } from 'src/app/inscripcion/inscripcion';

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
  private inscripcionSearch: Inscripcion = new Inscripcion();
  
  @ViewChild(AdDirective, {static: true}) adHost: AdDirective;
  
  constructor(private userService: UserService
    ) { }

  ngOnInit() {
    this.usserLogged = this.userService.getUserLoggedIn();
    $("#tabs_docentetema").tabs();
    this.showTab('tab-mistemas');
  }

  public showTab(tabid: String){
    $('#tabs_docentetema .tab-pane').hide();
    $('#'+tabid).show();
  }

}

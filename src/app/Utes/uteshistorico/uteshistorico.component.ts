import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Sysusuario } from 'src/app/sysusuario/sysusuario';
import { Tema } from 'src/app/tema/tema';
import { AdDirective } from 'src/app/Estudiante/estudiantetema/ad.directive';
import { UserService } from 'src/app/login/user.service';
import { Estaticos } from 'src/app/app.constants';
import { Historico } from 'src/app/historico/historico';
import { HistoricoService } from 'src/app/historico/historico.service';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;


@Component({
  selector: 'app-uteshistorico',
  templateUrl: './uteshistorico.component.html'
})
export class UteshistoricoComponent implements OnInit {
  private titulo: string = "Histórico";
  public usserLogged: Sysusuario = null;
  listHistorico: Historico[];
  
  @ViewChild(AdDirective, {static: true}) adHost: AdDirective;

  constructor(private userService: UserService,
    private historicoService: HistoricoService, 
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.usserLogged = this.userService.getUserLoggedIn();
    this.getListHistorico();
    $("#tabs_docentetema").tabs();
    this.showTab('tab-mistemas');
  }

  getListHistorico(): Historico[] {
    this.historicoService.getAll().subscribe(
      (historicos: Historico[]) => {
        this.listHistorico = historicos;
      }
    );
    return this.listHistorico;
  }

  public showTab(tabid: String){
    $('#tabs_docentetema .tab-pane').hide();
    $('#'+tabid).show();
  }
  
}

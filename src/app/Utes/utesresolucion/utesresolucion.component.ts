import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Sysusuario } from 'src/app/sysusuario/sysusuario';
import { Tema } from 'src/app/tema/tema';
import { AdDirective } from 'src/app/Estudiante/estudiantetema/ad.directive';
import { UserService } from 'src/app/login/user.service';
import { TemaService } from 'src/app/tema/tema.service';
import { Estaticos } from 'src/app/app.constants';
import { UtesresoluciondetalleComponent } from './utesresoluciondetalle.component';
import { AdItem } from 'src/app/Estudiante/estudiantetema/ad-item';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { PageRender } from 'src/app/Page/pagerender';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-utesresolucion',
  templateUrl: './utesresolucion.component.html'
})
export class UtesresolucionComponent implements OnInit {
  public usserLogged: Sysusuario = null;
  listAprobados: Tema[];
  pageRender: PageRender<Tema>;
  
  @ViewChild(AdDirective, {static: true}) adHost: AdDirective;

  constructor(private userService: UserService,
    private temaService: TemaService, 
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.usserLogged = this.userService.getUserLoggedIn();
    this.getListAprobados(0);
    $("#tabs_docentetema").tabs();
    this.showTab('tab-mistemas');
  }

  getListAprobados(page:number): Tema[] {
    let estadoslst: string = Estaticos.ESTADO_TEMA_POST_APROBADO + "," + Estaticos.ESTADO_TEMA_POST_PRORROGA + "," + Estaticos.ESTADO_TEMA_POST_ANULADO + "," + Estaticos.ESTADO_TEMA_POST_CERRADO + "," + Estaticos.ESTADO_TEMA_POST_LECTORPROYECTO;
    this.temaService.getAllByEstadoPageable(estadoslst, page).subscribe(
      response => {
        this.listAprobados = response.content;
        this.pageRender = new PageRender("/dashboard/utesasignacion", response);          
      }
    );
    return this.listAprobados;
  }

  public showTab(tabid: String){
    $('#tabs_docentetema .tab-pane').hide();
    $('#'+tabid).show();
  }

  loadComponent(idTema: number) {
    const adItem = new AdItem(UtesresoluciondetalleComponent, { idTema: idTema });
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }

  openDialog(tema: Tema): void {
    this.loadComponent(tema.idTem);
    $('#dialogUtesResolucion').dialog({
      title: 'Detalle',
      modal: true,
      minWidth: 1000,
      resizable: false
    });
    Gestor.fn.positionDialog();
  }

}

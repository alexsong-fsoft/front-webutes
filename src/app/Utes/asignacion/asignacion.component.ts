import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { AdDirective } from 'src/app/Estudiante/estudiantetema/ad.directive';
import { Sysusuario } from 'src/app/sysusuario/sysusuario';
import { Tema } from 'src/app/tema/tema';
import { AsignadoService } from 'src/app/asignado/asignado.service';
import { TemaService } from 'src/app/tema/tema.service';
import { UserService } from 'src/app/login/user.service';
import { AdItem } from 'src/app/Estudiante/estudiantetema/ad-item';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { Estaticos } from 'src/app/app.constants';
import { AsignaciondetalleComponent } from './asignaciondetalle.component';
import { PageRender } from 'src/app/Page/pagerender';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html'
})
export class AsignacionComponent implements OnInit {
  private titulo: string = "Gestión de Temas";
  public usserLogged: Sysusuario = null;
  listUtesEnviados: Tema[];
  listComisionPublicado: Tema[];
  listUtesAprobados: Tema[];
  pageRender: PageRender<Tema>;
  pageRender2: PageRender<Tema>;
  pageRender3: PageRender<Tema>;

  @ViewChild(AdDirective, {static: true}) adHost: AdDirective;

  constructor(private userService: UserService,
    private temaService: TemaService, 
    private componentFactoryResolver: ComponentFactoryResolver,
    private asignadoService: AsignadoService) { }

  ngOnInit() {
    this.usserLogged = this.userService.getUserLoggedIn();
    this.getListUtesEnviados(0);
    this.getListComisionPublicado(0);
    this.getListUtesAprobados(0);
    $("#tabs_docentetema").tabs();
    this.showTab('tab-mistemas');
    setTimeout(function () {
      Gestor.fn.initForms();
    }, 1000);
  }

  getListUtesEnviados(page:number): Tema[] {
    let estadoslst: string = Estaticos.ESTADO_TEMA_PRE_ENVIADO + "," + Estaticos.ESTADO_TEMA_PRE_ASIGNAREVISOR + "," + Estaticos.ESTADO_TEMA_PRE_REVISION + "," + Estaticos.ESTADO_TEMA_PRE_REVISADO;
    //let page:number = 0;
    this.temaService.getAllByEstadoPageable(estadoslst, page).subscribe(
      response => {
        this.listUtesEnviados = response.content;
        this.pageRender = new PageRender("/dashboard/utespresolicitud", response);          
      }
    );
    return this.listUtesEnviados;
  }

  getListComisionPublicado(page:number): Tema[] {
    let estadoslst: string = Estaticos.ESTADO_TEMA_PRE_PUBLICADO.toString();
    this.temaService.getAllByEstadoPageable(estadoslst, page).subscribe(
      response => {
        this.listComisionPublicado = response.content;
        this.pageRender2 = new PageRender("/dashboard/utespresolicitud", response);          
      }
    );
    return this.listComisionPublicado;
  }

  getListUtesAprobados(page:number): Tema[] {
    let estadoslst: string = Estaticos.ESTADO_TEMA_PRE_ASIGNAESTUDIANTE + "," + Estaticos.ESTADO_TEMA_PRE_ASIGNALECTOR;
    this.temaService.getAllByEstadoPageable(estadoslst, page).subscribe(
      response => {
        this.listUtesAprobados = response.content;
        this.pageRender3 = new PageRender("/dashboard/utespresolicitud", response);          
      }
    );
    return this.listUtesAprobados;
  }
  
  public showTab(tabid: String){
    $('#tabs_docentetema .tab-pane').hide();
    $('#'+tabid).show();
  }

  habilitaBotonAsignarRevisor(idestado: number): boolean{
    try {
     if (idestado != Estaticos.ESTADO_TEMA_PRE_ENVIADO) {
      return true;
     }   
    } catch (error) {
      console.error('Here is the error message', error);
    }  
    return false;
   }

  loadComponent(idTema: number) {
    const adItem = new AdItem(AsignaciondetalleComponent, { idTema: idTema });
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }

  openDialog(tema: Tema): void {
    this.loadComponent(tema.idTem);
    $('#dialog').dialog({
      modal: true,
      minWidth: 1000,
      resizable: false
    });
    Gestor.fn.positionDialog();
  }
}

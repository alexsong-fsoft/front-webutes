import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { AdItem } from './ad-item';
import { AdService } from './ad.service';
import { TemaService } from 'src/app/tema/tema.service';
import { AsignadoService } from 'src/app/asignado/asignado.service';
import { Tema } from 'src/app/tema/tema';
import { Estaticos } from 'src/app/app.constants';
import { Asignado } from 'src/app/asignado/asignado';
import { AdDirective } from './ad.directive';
import { HeroJobAdComponent } from './hero-job-ad.component';
import { AdComponent } from './ad.component';
import { Sysusuario } from 'src/app/sysusuario/sysusuario';
import { UserService } from 'src/app/login/user.service';
import { AdDirectivePaginator } from './ad.directivepaginator';
import { PageRender } from 'src/app/Page/pagerender';
import { ActivatedRoute } from '@angular/router';
import { PaginatorComponent } from 'src/app/paginator/paginator.component';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-estudiantetema',
  templateUrl: './estudiantetema.component.html'
})
export class EstudiantetemaComponent {
  titulo: string = "Estudiante - Tema";
  asig: Asignado = null;
  listComisionPublicadoEstudiante: Tema[];
  pageRender: PageRender<Tema>;
  ads: AdItem[];
  public usserLogged: Sysusuario = null;

  @ViewChild(AdDirective, {static: true}) adHost: AdDirective;
  @ViewChild(AdDirectivePaginator, {static: true}) adHostPag: AdDirectivePaginator;
  
  constructor(private adService: AdService, 
    private temaService: TemaService, 
    private asignadoService: AsignadoService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    //this.ads = this.adService.getAds();
    //this.loadComponent(161);
    this.usserLogged = this.userService.getUserLoggedIn();
    this.getListComisionPublicadoEstudiante();
  }

  getListComisionPublicadoEstudiante(): void {
    this.activatedRoute.params.subscribe(params => {
    let page = params['page']
      page = page ? page : 0;
    this.asignadoService.getByIdPersonaAsgIdTipo(this.usserLogged.idPersona, Estaticos.TIPO_ID_ASIGNACION_ESTUDIANTE).subscribe(
      (asignado) => {
        this.asig = asignado;
        if (asignado != null) {
          let estados: string = Estaticos.ESTADO_TEMA_PRE_ASIGNAESTUDIANTE + "," + Estaticos.ESTADO_TEMA_PRE_ASIGNALECTOR + "," + Estaticos.ESTADO_TEMA_POST_ANULADO + "," + Estaticos.ESTADO_TEMA_POST_APROBADO + "," + Estaticos.ESTADO_TEMA_POST_CERRADO + "," + Estaticos.ESTADO_TEMA_POST_PRORROGA + "," + Estaticos.ESTADO_TEMA_POST_LECTORPROYECTO;
          this.temaService.getByIdstemasEstadosPageable(this.asig.tema.idTem.toString(), estados, page).subscribe(
            response => {
              this.listComisionPublicadoEstudiante = response.content;
              this.pageRender = new PageRender("/dashboard/estudiantetema", response);
              const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PaginatorComponent);
              const viewContainerRef = this.adHostPag.viewContainerRef;
              viewContainerRef.clear();
              const componentRef = viewContainerRef.createComponent(componentFactory);
              (componentRef.instance).pageRender = this.pageRender;
            }
          );
        } else {
          this.temaService.getAllByEstadoPageable("" + Estaticos.ESTADO_TEMA_PRE_PUBLICADO, page).subscribe(
            response => {
              this.listComisionPublicadoEstudiante = response.content;
              this.pageRender = new PageRender("/dashboard/estudiantetema", response);
              const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PaginatorComponent);
              const viewContainerRef = this.adHostPag.viewContainerRef;
              viewContainerRef.clear();
              const componentRef = viewContainerRef.createComponent(componentFactory);
              (componentRef.instance).pageRender = this.pageRender;
            }
          );
        }
      }
    );
  });
  }

  loadComponent(idTema: number) {
    const adItem = new AdItem(HeroJobAdComponent, { idTema: idTema });
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

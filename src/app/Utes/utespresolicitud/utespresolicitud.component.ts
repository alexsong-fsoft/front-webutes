import { Component, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { Sysusuario } from 'src/app/sysusuario/sysusuario';
import { AdDirective } from 'src/app/Estudiante/estudiantetema/ad.directive';
import { Presolicitud } from 'src/app/presolicitud/presolicitud';
import { UserService } from 'src/app/login/user.service';
import { PersonaService } from 'src/app/persona/persona.service';
import { PresolicitudService } from 'src/app/presolicitud/presolicitud.service';
import { AdItem } from 'src/app/Estudiante/estudiantetema/ad-item';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { UtespresolicitudvalidarespuestadialogComponent } from './utespresolicitudvalidarespuestadialog.component';
import { Estaticos } from 'src/app/app.constants';
import { UtespresolicituddetalledialogComponent } from './utespresolicituddetalledialog.component';
import { AdDirectivePaginator } from 'src/app/Estudiante/estudiantetema/ad.directivepaginator';
import { PageRender } from 'src/app/Page/pagerender';
import { PaginatorComponent } from 'src/app/paginator/paginator.component';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, pairwise, startWith, takeUntil } from 'rxjs/operators';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-utespresolicitud',
  templateUrl: './utespresolicitud.component.html'
})
export class UtespresolicitudComponent implements OnInit, OnDestroy {
  titulo: string = "Validación de Inscripciones";
  listPresolicitud: Presolicitud[];
  pageRender: PageRender<Presolicitud>;
  public usserLogged: Sysusuario = null;
  public destroyed = new Subject<any>();
  
  @ViewChild(AdDirective, {static: true}) adHost: AdDirective;
  @ViewChild(AdDirectivePaginator, {static: true}) adHostPag: AdDirectivePaginator;

  constructor(private presolicitudService: PresolicitudService, 
    private personaService: PersonaService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router) { }

  ngOnInit() {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      pairwise(),
      filter((events: RouterEvent[]) => events[0].url === events[1].url),
      startWith('initial call'),
      takeUntil(this.destroyed)
    ).subscribe(() => {
      this.usserLogged = this.userService.getUserLoggedIn();
      this.loadPresolicitudes();
    })    
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  loadPresolicitudes(): void {
    this.activatedRoute.params.subscribe(params => {
      let page = params['page']
      page = page ? page : 0;
      this.presolicitudService.getAllPageable(page).subscribe(
        response => {
          this.listPresolicitud = response.content;
          this.pageRender = new PageRender("/dashboard/utespresolicitud", response);
          const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PaginatorComponent);
          const viewContainerRef = this.adHostPag.viewContainerRef;
          viewContainerRef.clear();
          const componentRef = viewContainerRef.createComponent(componentFactory);
          (componentRef.instance).pageRender = this.pageRender;
        }
      );
    });
  }

  loadComponent(idPsl: number) {
    const adItem = new AdItem(UtespresolicituddetalledialogComponent, { idPsl: idPsl });
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }
  
  openDialog(idPsl: number): void {
    this.loadComponent(idPsl);
    $('#dialog').dialog({
      title: 'Detalle', 
      modal: true,
      minWidth: 800,
      resizable: false
    });
    Gestor.fn.positionDialog();
  }

  loadComponent2(idPsl: number) {
    const adItem = new AdItem(UtespresolicitudvalidarespuestadialogComponent, { idPsl: idPsl });
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }
  
  openDialog2(idPsl: number): void {
    this.loadComponent2(idPsl);
    $('#dialog').dialog({
      title: 'Validación de inscripción', 
      modal: true,
      minWidth: 800,
      resizable: false
    });
    Gestor.fn.positionDialog();
  }

  habilitaBotonEditaPresolicitud(idestado: number): boolean{
    try {
     if (idestado != Estaticos.ESTADO_PRESOLICITUD_ENVIADO) {
      //deshabilito boton
      return true;
     }   
    } catch (error) {
      console.error('Here is the error message', error);
    }  
    return false;
   }
}

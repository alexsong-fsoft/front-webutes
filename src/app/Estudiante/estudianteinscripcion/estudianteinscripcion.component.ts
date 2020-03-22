import { Component, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { PresolicitudService } from 'src/app/presolicitud/presolicitud.service';
import { PersonaService } from 'src/app/persona/persona.service';
import { Presolicitud } from 'src/app/presolicitud/presolicitud';
import { Estaticos } from 'src/app/app.constants';
import { Persona } from 'src/app/persona/persona';
import { EstudianteinscripcionDialogComponent } from './estudianteinscripciondialog.component';
import { AdDirective } from '../estudiantetema/ad.directive';
import { AdItem } from '../estudiantetema/ad-item';
import { AdComponent } from '../estudiantetema/ad.component';
import { UserService } from 'src/app/login/user.service';
import { Sysusuario } from 'src/app/sysusuario/sysusuario';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter, takeUntil, pairwise, startWith } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { InscripcionService } from 'src/app/inscripcion/inscripcion.service';
import { Estado } from 'src/app/estado/Estado';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-estudianteinscripcion',
  templateUrl: './estudianteinscripcion.component.html'
})
export class EstudianteinscripcionComponent implements OnInit, OnDestroy {
  titulo: string = "Estudiante - Inscripción";
  persona: Persona = null;
  listPresolicitud: Presolicitud[];
  listDataEstadoInscripcion: Estado[];
  maxsecuencial: number = null;
  habilitaBotonInscripcion: boolean = false;
  public usserLogged: Sysusuario = null;
  public destroyed = new Subject<any>();

  @ViewChild(AdDirective, { static: true }) adHost: AdDirective;

  constructor(private presolicitudService: PresolicitudService,
    private personaService: PersonaService,
    private userService: UserService,
    private inscripcionService: InscripcionService,
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
      this.habilitaBotonEvolucionEstado();
      this.loadListaPresolicitud();
    })
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  loadListaPresolicitud() {
    this.personaService.getByCedula(this.usserLogged.persona.perCedula).subscribe(
      (persona) => {
        this.persona = persona;
        if (persona != null) {
          this.presolicitudService.getAllByCedula(persona).subscribe(
            (presolicituds: Presolicitud[]) => {
              this.listPresolicitud = presolicituds;
            }
          );
        }
      }
    );
  }
  
  public habilitaBotonEvolucionEstado(): void {
    this.inscripcionService.getInscripcionActivaMaxSecuencial().subscribe(
      (maxsecuencial) => {
        this.maxsecuencial = maxsecuencial;
        if (maxsecuencial != null) {
          this.inscripcionService.getById(maxsecuencial).subscribe(
            (auxinscripcion) => {
              if (auxinscripcion != null) {
                this.listDataEstadoInscripcion = Estado.loadInscripcionAccion();
                let errores: String[] = [];
                let valor: number = 0;
                this.presolicitudService.getAllByCedulaId(this.usserLogged.persona, auxinscripcion).subscribe(
                (listpresol: Presolicitud[]) => {
                    if (listpresol != undefined && listpresol.length > 0) {
                      listpresol.forEach(objpre => {
                        if (objpre != null) {
                          valor = objpre.pslIdEstado;
                          this.listDataEstadoInscripcion.forEach(objest => {
                            if (objest.id == valor) {
                              errores.push(valor.toString());
                            }
                          });
                        }
                      });
                      if (errores.length > 0) {
                        this.habilitaBotonInscripcion = false;
                      } else {
                        this.habilitaBotonInscripcion = true;
                      }
                    }
                  }
                );                  
              }
            }
          );
        }
      }
    );
  }

  loadComponent() {
    const adItem = new AdItem(EstudianteinscripcionDialogComponent, { idIns: null });
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }

  openDialog(): void {
    this.loadComponent();
    $('#dialog').dialog({
      title: 'Formulario Presolicitud',
      modal: true,
      minWidth: 800,
      resizable: false
    });
    Gestor.fn.positionDialog();
  }
}

import { Component, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, RouterEvent, NavigationEnd } from '@angular/router';
import { AdDirective } from '../estudiantetema/ad.directive';
import { AdItem } from '../estudiantetema/ad-item';
import { AdComponent } from '../estudiantetema/ad.component';
import { Tema } from 'src/app/tema/tema';
import { TemaService } from 'src/app/tema/tema.service';
import { Evolucion } from 'src/app/evolucion/evolucion';
import { Estudianteevoluciondialog2Component } from './estudianteevoluciondialog2.component';
import { EstudianteevoluciondialogeditarComponent } from './estudianteevoluciondialogeditar.component';
import { Estado } from 'src/app/estado/Estado';
import { Subject } from 'rxjs';
import { filter, pairwise, startWith, takeUntil } from 'rxjs/operators';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
    selector: 'app-estudianteevoluciondesarrollo',
    templateUrl: './estudianteevoluciondesarrollo.component.html'
})
export class EstudianteevolucionDesarrolloComponent implements OnInit, OnDestroy {
    private tema: Tema = new Tema();
    private titulo: string = "Evolución de Trabajo";
    private listEstadoEvolucion: Estado[] = [];
    ads: AdItem[];
    public destroyed = new Subject<any>();
    
    @ViewChild(AdDirective, { static: true }) adHost: AdDirective;

    constructor(private temaService: TemaService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private componentFactoryResolver: ComponentFactoryResolver) { }
    
    ngOnInit() {
      this.router.events.pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd),
        pairwise(),
        filter((events: RouterEvent[]) => events[0].url === events[1].url),
        startWith('initial call'),
        takeUntil(this.destroyed)
      ).subscribe(() => {
        this.load();
        this.listEstadoEvolucion = Estado.loadEvolucion();
      })
        // this.load();
        // this.listEstadoEvolucion = Estado.loadEvolucion();
    }

    ngOnDestroy() {
      this.destroyed.next();
      this.destroyed.complete();
    }

    public load(): void {
        this.activatedRoute.params.subscribe(params => {
          let id = params['id']
          if (id) {
            this.temaService.getById(id).subscribe(
              (tema) => {
                if (tema != null) {
                  this.tema = tema;
                } 
              }
    
            )
          }
        })
    }

    public getNombreEstadoEvolucion(idEstado: number): String {
      return Estado.getNombreEstadoPorLista(idEstado, this.listEstadoEvolucion);
    }

    loadComponent(idEvl: number) {
        const adItem = new AdItem(Estudianteevoluciondialog2Component, { idEvl: idEvl });
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
        const viewContainerRef = this.adHost.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent(componentFactory);
        (<AdComponent>componentRef.instance).data = adItem.data;
      }
      
      openDialog(evolucion: Evolucion): void {
        this.loadComponent(evolucion.idEvl);
        try {
          $('#dialog2').dialog('destroy');
        } catch (error) {
          console.log(error);
        }
        $('#dialog2').dialog({
          title: 'Detalle',
          modal: true,
          minWidth: 800,
          resizable: false
        });
        Gestor.fn.positionDialog();
      }

      loadComponent2(idEvl: number) {
        const adItem = new AdItem(EstudianteevoluciondialogeditarComponent, { idEvl: idEvl });
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
        const viewContainerRef = this.adHost.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent(componentFactory);
        (<AdComponent>componentRef.instance).data = adItem.data;
      }
      
      openDialog2(evolucion: Evolucion): void {
        this.loadComponent2(evolucion.idEvl);
        try {
          $('#dialog2').dialog('destroy');
        } catch (error) {
          console.log(error);
        }
        $('#dialog2').dialog({
          title: 'Detalle',
          modal: true,
          minWidth: 1000,
          resizable: false
        });
        Gestor.fn.positionDialog();
      }

}


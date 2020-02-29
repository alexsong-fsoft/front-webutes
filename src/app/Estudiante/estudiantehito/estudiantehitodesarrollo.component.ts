import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdDirective } from '../estudiantetema/ad.directive';
import { AdItem } from '../estudiantetema/ad-item';
import { AdComponent } from '../estudiantetema/ad.component';
import { Tema } from 'src/app/tema/tema';
import { TemaService } from 'src/app/tema/tema.service';
import { Evolucion } from 'src/app/evolucion/evolucion';
import { EstudiantehitodialogComponent } from './estudiantehitodialog.component';
import { EstudiantehitodialogeditarComponent } from './estudiantehitodialogeditar.component';
import { Hito } from 'src/app/hito/hito';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
    selector: 'app-estudiantehitodesarrollo',
    templateUrl: './estudiantehitodesarrollo.component.html'
})
export class EstudiantehitoDesarrolloComponent implements OnInit {
    private tema: Tema = new Tema();
    private titulo: string = "Hitos de Proyecto";
    ads: AdItem[];
    listHitoPorTema: Hito[];

    @ViewChild(AdDirective, { static: true }) adHost: AdDirective;

    constructor(private temaService: TemaService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private componentFactoryResolver: ComponentFactoryResolver) { }
    
    ngOnInit() {
        this.load();
    }

    public load(): void {
        this.activatedRoute.params.subscribe(params => {
          let id = params['id']
          if (id) {
            this.temaService.getById(id).subscribe(
              (tema) => {
                if (tema != null) {
                  this.tema = tema;
                  this.listHitoPorTema = tema.hitos;
                } 
              }
    
            )
          }
        })
    }

    loadComponent(idHit: number) {
        const adItem = new AdItem(EstudiantehitodialogComponent, { idHit: idHit });
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
        const viewContainerRef = this.adHost.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent(componentFactory);
        (<AdComponent>componentRef.instance).data = adItem.data;
      }
      
      openDialog(hito: Hito): void {
        this.loadComponent(hito.idHit);
        try {
          $('#dialog2').dialog('destroy');
        } catch (error) {
          console.log(error);
        }
        $('#dialog2').dialog({
          title: 'Detalle  1',
          modal: true,
          minWidth: 1000,
          resizable: false
        });
        Gestor.fn.positionDialog();
      }

      loadComponent2(idEvl: number) {
        const adItem = new AdItem(EstudiantehitodialogeditarComponent, { idEvl: idEvl });
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
        const viewContainerRef = this.adHost.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent(componentFactory);
        (<AdComponent>componentRef.instance).data = adItem.data;
      }
      
      openDialog2(hito: Hito): void {
        this.loadComponent2(hito.idHit);
        try {
          $('#dialog2').dialog('destroy');
        } catch (error) {
          console.log(error);
        }
        $('#dialog2').dialog({
          title: 'Detalle 2',
          modal: true,
          minWidth: 1000,
          resizable: false
        });
        Gestor.fn.positionDialog();
      }

}


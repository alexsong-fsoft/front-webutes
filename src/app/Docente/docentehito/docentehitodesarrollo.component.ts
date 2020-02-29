import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { AdDirective } from 'src/app/Estudiante/estudiantetema/ad.directive';
import { Router, ActivatedRoute } from '@angular/router';
import { Tema } from 'src/app/tema/tema';
import { TemaService } from 'src/app/tema/tema.service';
import { AdItem } from 'src/app/Estudiante/estudiantetema/ad-item';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { DocentehitodialogComponent } from './docentehitodialog.component';
import { Evolucion } from 'src/app/evolucion/evolucion';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-docentehitodesarrollo',
  templateUrl: './docentehitodesarrollo.component.html'
})
export class DocentehitodesarrolloComponent implements OnInit {
  private tema: Tema = new Tema();
  private titulo: string = "Hitos de proyecto";

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
            } 
          }

        )
      }
    })
  }

  loadComponent(idEvl: number) {
    const adItem = new AdItem(DocentehitodialogComponent, { idEvl: idEvl });
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
      minWidth: 1000,
      resizable: false
    });
    Gestor.fn.positionDialog();
  }
}

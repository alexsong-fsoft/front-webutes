import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { AdDirective } from 'src/app/Estudiante/estudiantetema/ad.directive';
import { Router, ActivatedRoute } from '@angular/router';
import { AdItem } from 'src/app/Estudiante/estudiantetema/ad-item';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { Tema } from 'src/app/tema/tema';
import { TemaService } from 'src/app/tema/tema.service';
import { Resolucion } from 'src/app/resolucion/resolucion';
import { DocentehitoresoluciondialogComponent } from './docentehitoresoluciondialog.component';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-docentehitodetalle',
  templateUrl: './docentehitodetalle.component.html'
})
export class DocentehitodetalleComponent implements OnInit {
  private tema: Tema = new Tema();
  private titulo: string = "Detalle";

  @ViewChild(AdDirective, {static: true}) adHost: AdDirective;
  
  constructor(private temaService: TemaService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.load();
    $("#tabs_evolucion_detalle").tabs();
    this.showTab('tab-tema');
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

  loadComponent(idRsl: number) {
    const adItem = new AdItem(DocentehitoresoluciondialogComponent, { idRsl: idRsl });
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }
  
  openDialog(resolucion: Resolucion): void {
    this.loadComponent(resolucion.idRsl);
    $('#dialog').dialog({
      title: 'Detalle',
      modal: true,
      minWidth: 1000,
      resizable: false
    });
    Gestor.fn.positionDialog();
  }

  public showTab(tabid: String){
    $('.tab-pane').hide();
    $('#'+tabid).show();
  }
}

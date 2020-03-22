import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { AdDirective } from 'src/app/Estudiante/estudiantetema/ad.directive';
import { Tema } from 'src/app/tema/tema';
import { TemaService } from 'src/app/tema/tema.service';
import { Resolucion } from 'src/app/resolucion/resolucion';
import { DocenteevolucionresoluciondialogComponent } from './docenteevolucionresoluciondialog.component';
import { AdItem } from 'src/app/Estudiante/estudiantetema/ad-item';
import { Estado } from 'src/app/estado/Estado';
import { Tipo } from 'src/app/tipo/Tipo';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-docenteevoluciondetalle',
  templateUrl: './docenteevoluciondetalle.component.html'
})
export class DocenteevoluciondetalleComponent implements OnInit {
  private tema: Tema = new Tema();
  private titulo: string = "Detalle";
  private listEstadoAsignadoLector: Estado[] = [];
  private listTipoAsignacion: Tipo[] = [];

  @ViewChild(AdDirective, {static: true}) adHost: AdDirective;
  
  constructor(private temaService: TemaService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.load();
    this.listEstadoAsignadoLector = Estado.loadAsignaLector();
    this.listTipoAsignacion = Tipo.loadAsignacion();
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
    const adItem = new AdItem(DocenteevolucionresoluciondialogComponent, { idRsl: idRsl });
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

  public getNombreEstadoAsignadoLector(idEstado: number): String {
    return Estado.getNombreEstadoPorLista(idEstado, this.listEstadoAsignadoLector);
  }

  public getNombreTipoAsignado(idTipo: number): String {
    return Tipo.getNombreTipoPorLista(idTipo, this.listTipoAsignacion);
  }

}

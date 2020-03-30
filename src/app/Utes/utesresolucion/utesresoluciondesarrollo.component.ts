import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Tema } from 'src/app/tema/tema';
import { Estado } from 'src/app/estado/Estado';
import { AdDirective } from 'src/app/Estudiante/estudiantetema/ad.directive';
import { TemaService } from 'src/app/tema/tema.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Estaticos } from 'src/app/app.constants';
import { Resolucion } from 'src/app/resolucion/resolucion';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { UtesresoluciondialogComponentComponent } from './utesresoluciondialog-component.component';
import { AdItem } from 'src/app/Estudiante/estudiantetema/ad-item';
import { Tipo } from 'src/app/tipo/Tipo';
import { UtesresolucionnuevodialogComponent } from './utesresolucionnuevodialog.component';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-utesresoluciondesarrollo',
  templateUrl: './utesresoluciondesarrollo.component.html'
})
export class UtesresoluciondesarrolloComponent implements OnInit {
  private tema: Tema = new Tema();
  private titulo: string = "Listado de Resoluciones";
  private listEstadoEvolucion: Estado[] = [];
  private listTipoAsignacion: Tipo[] = [];

  @ViewChild(AdDirective, { static: true }) adHost: AdDirective;
  
  constructor(private temaService: TemaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.load();
    this.listEstadoEvolucion = Estado.loadEvolucion();
    this.listTipoAsignacion = Tipo.loadAsignacion();
    $("#dialog3").dialog({
      autoOpen: false
    });
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

  public habilitaProceso(estado: number): boolean {
    if (estado != Estaticos.ESTADO_RESOLUCION_PROCESADO) {
      return false;
    }
    return true;
  }

  loadComponent(idRsl: number) {
    const adItem = new AdItem(UtesresoluciondialogComponentComponent, { idRsl: idRsl });
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }

  openDialog(resolucion: Resolucion): void {
    this.loadComponent(resolucion.idRsl);
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

  loadComponent2() {
    const adItem = new AdItem(UtesresolucionnuevodialogComponent, {});
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }

  openDialog2(): void {
    this.loadComponent2();
    try {
      $('#dialog2').dialog('destroy');
    } catch (error) {
      console.log(error);
    }
    $('#dialog2').dialog({
      title: 'Nueva Resolución',
      modal: true,
      minWidth: 800,
      resizable: false
    });
    Gestor.fn.positionDialog();
  }

  openDialog3(): void {
    try {
      $('#dialog3').dialog('destroy');
    } catch (error) {
      console.log(error);
    }
    $('#dialog3').dialog({
      title: 'Detalle',
      modal: true,
      minWidth: 800,
      resizable: false
    });
    Gestor.fn.positionDialog();
  }

  public getNombreTipoAsignado(idTipo: number): String {
    return Tipo.getNombreTipoPorLista(idTipo, this.listTipoAsignacion);
  }
}

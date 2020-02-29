import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdDirective } from 'src/app/Estudiante/estudiantetema/ad.directive';
import { Tema } from 'src/app/tema/tema';
import { TemaService } from 'src/app/tema/tema.service';
import { AdItem } from 'src/app/Estudiante/estudiantetema/ad-item';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { Evolucion } from 'src/app/evolucion/evolucion';
import { DocenteevoluciondialogComponent } from './docenteevoluciondialog.component';
import { DocenteevolucioneditardialogComponent } from './docenteevolucioneditardialog.component';
import { Estado } from 'src/app/estado/Estado';
import { Estaticos } from 'src/app/app.constants';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-docenteevoluciondesarrollo',
  templateUrl: './docenteevoluciondesarrollo.component.html'
})
export class DocenteevoluciondesarrolloComponent implements OnInit {
  private tema: Tema = new Tema();
  private titulo: string = "Evolución de Tema";
  private listEstadoEvolucion: Estado[] = [];

  @ViewChild(AdDirective, { static: true }) adHost: AdDirective;

  constructor(private temaService: TemaService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.load();
    this.listEstadoEvolucion = Estado.loadEvolucion();
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

  public habilitaBotonEvolucionEstado(estado: number): boolean {
    if (estado != Estaticos.ESTADO_EVOLUCION_CREADO && estado != Estaticos.ESTADO_EVOLUCION_REAGENDA) {
      return true;
    }
    return false;
  }

  loadComponent(idEvl: number) {
    const adItem = new AdItem(DocenteevoluciondialogComponent, { idEvl: idEvl });
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
    const adItem = new AdItem(DocenteevolucioneditardialogComponent, { idEvl: idEvl });
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
      title: 'Registro de Desarrollo de Cita',
      modal: true,
      minWidth: 800,
      resizable: false
    });
    Gestor.fn.positionDialog();
  }

}

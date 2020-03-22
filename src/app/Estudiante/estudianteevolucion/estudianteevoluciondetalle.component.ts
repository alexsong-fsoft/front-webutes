import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Tema } from 'src/app/tema/tema';
import { TemaService } from 'src/app/tema/tema.service';
import { AdItem } from '../estudiantetema/ad-item';
import { AdDirective } from '../estudiantetema/ad.directive';
import { EstudianteevolucionDialogComponent } from './estudianteevoluciondialog.component';
import { AdComponent } from '../estudiantetema/ad.component';
import { Resolucion } from 'src/app/resolucion/resolucion';
import { Estado } from 'src/app/estado/Estado';
import { Tipo } from 'src/app/tipo/Tipo';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-estudianteevoluciondetalle',
  templateUrl: './estudianteevoluciondetalle.component.html'
})
export class EstudianteevolucionDetalleComponent implements OnInit {
  private tema: Tema = new Tema();
  private titulo: string = "Detalle";
  private listEstadoAsignadoLector: Estado[] = [];
  private listTipoAsignacion: Tipo[] = [];
  ads: AdItem[];

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
              // this.cuestionarioService.getByIdsTipoIdInscripcion(Estaticos.TIPO_ID_CUESTIONARIO_INSCRIPCION.toString(), idinscripcion).subscribe(
              //   (cuestionarios: Cuestionario[]) => {
              //     this.listCuestionario = cuestionarios;
              //     setTimeout(function(){
              //       Gestor.fn.initForms();
              //     }, 300);
              //   }
              // );
            } 
          }

        )
      }
    })
  }
  
  public getNombreEstadoAsignadoLector(idEstado: number): String {
    return Estado.getNombreEstadoPorLista(idEstado, this.listEstadoAsignadoLector);
  }

  public getNombreTipoAsignado(idTipo: number): String {
    return Tipo.getNombreTipoPorLista(idTipo, this.listTipoAsignacion);
  }

  loadComponent(idRsl: number) {
    const adItem = new AdItem(EstudianteevolucionDialogComponent, { idRsl: idRsl });
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
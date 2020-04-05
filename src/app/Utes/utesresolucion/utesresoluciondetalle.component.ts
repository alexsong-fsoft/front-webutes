import { Component, OnInit, Input, ComponentFactoryResolver } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { Tema } from 'src/app/tema/tema';
import { TemaService } from 'src/app/tema/tema.service';
import { Estado } from 'src/app/estado/Estado';
import { Tipo } from 'src/app/tipo/Tipo';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  //selector: 'app-utesresoluciondetalle',
  templateUrl: './utesresoluciondetalle.component.html'
})
export class UtesresoluciondetalleComponent implements AdComponent {
  @Input() data: any;
  private tema: Tema = new Tema();
  private listEstadoInscripcion: Estado[] = [];
  private listTipoAsignacion: Tipo[] = [];
  
  constructor(private temaService: TemaService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.tema = new Tema();
    this.load();
    this.listEstadoInscripcion = Estado.loadInscripcion();
    this.listTipoAsignacion = Tipo.loadAsignacion();
    $("#tabs_docentetema_detalle").tabs();
    this.showTab2('tab-tema');
  }

  public load(): void {        
    let id = this.data.idTema;
    if (id) {
      this.temaService.getById(id).subscribe(
        (tema) => {
          if (tema != null) {
            this.tema = tema; 
          } 
        }

      )
    }
  }
  
  public showTab2(tabid: String){
    $('#tabs_docentetema_detalle .tab-pane').hide();
    $('#'+tabid).show();
  }

  public getNombreEstadoAsignado(idEstado: number): String {
    return Estado.getNombreEstadoPorLista(idEstado, this.listEstadoInscripcion);
  }
  
  public getNombreTipoAsignado(idTipo: number): String {
    return Tipo.getNombreTipoPorLista(idTipo, this.listTipoAsignacion);
  }
}

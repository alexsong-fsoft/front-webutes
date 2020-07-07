import { Component, OnInit, Input, ComponentFactoryResolver } from '@angular/core';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { Tema } from 'src/app/tema/tema';
import { TemaService } from 'src/app/tema/tema.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Estado } from 'src/app/estado/Estado';
import { Tipo } from 'src/app/tipo/Tipo';
import { DatePipe } from '@angular/common';
import { Estaticos } from 'src/app/app.constants';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  //selector: 'app-docentetemadetalle',
  templateUrl: './docentetemadetalle.component.html'
})
export class DocentetemadetalleComponent implements AdComponent {
  @Input() data: any;
  private tema: Tema = new Tema();
  private titulo: string = "Detalle";
  private tab: string;
  private listEstadoPrePostTema: Estado[];  
  private listEstadoPostTema: Estado[];
  private listDataEstadoLectorRevisor: Estado[];
  private listTipoDocumento: Tipo[];
  
  constructor(private temaService: TemaService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private datepipe: DatePipe) { }

  ngOnInit() {
    this.load();
    $("#tabs_docentetema_detalle").tabs();
    this.showTab2('tab-tema');
    setTimeout(function () {
      Gestor.fn.initForms();
    }, 300);
  }
  
  public load(): void {        
    let id = this.data.idTema;
    this.tab = this.data.tab;
    this.listEstadoPrePostTema = Estado.loadPrePostTema();
    this.listEstadoPostTema = Estado.loadPostTema();
    this.listDataEstadoLectorRevisor = Estado.loadAsignaLectorRevisor();
    this.listTipoDocumento = Tipo.loadDocumento();
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
    $('#tabs_docentetema_detalle #'+tabid).show();
  }
  
  public getNombreEstadoPorLista(idEstado: number, tab: string): String {
    if(tab == '1')
      return Estado.getNombreEstadoPorLista(idEstado, this.listEstadoPrePostTema);
    else if(tab == '2')
      return Estado.getNombreEstadoPorLista(idEstado, this.listEstadoPostTema);
    else if(tab == '3')
      return Estado.getNombreEstadoPorLista(idEstado, this.listDataEstadoLectorRevisor);
  }

  public getNombreTipoPorLista(idTipo: number): String {
    return Tipo.getNombreTipoPorLista(idTipo, this.listTipoDocumento);
  }
  
  public parseDateToString(date: Date): String{
    return this.datepipe.transform(date, Estaticos.FORMAT_DATE);
  }

}

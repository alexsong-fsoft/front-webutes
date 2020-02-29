import { Component, OnInit, Input, ComponentFactoryResolver } from '@angular/core';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { Tema } from 'src/app/tema/tema';
import { TemaService } from 'src/app/tema/tema.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  
  constructor(private temaService: TemaService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver) { }

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
}

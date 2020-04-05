import { Component, OnInit, Input } from '@angular/core';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { Resolucion } from 'src/app/resolucion/resolucion';
import { ResolucionService } from 'src/app/resolucion/resolucion.service';
import { Tiporesolucion } from 'src/app/tiporesolucion/tiporesolucion';
import { TiporesolucionService } from 'src/app/tiporesolucion/tiporesolucion.service';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-utesresolucionnuevodialog',
  templateUrl: './utesresolucionnuevodialog.component.html'
})
export class UtesresolucionnuevodialogComponent implements AdComponent {
  @Input() data: any;
  private resolucionnew: Resolucion = new Resolucion();
  private listResolucionTipo: Tiporesolucion[] = [];
  
  constructor(private resolucionService: ResolucionService,
    private tiporesolucionService: TiporesolucionService) { }

  ngOnInit() {
    this.resolucionnew = new Resolucion();
    this.tiporesolucionService.getAll().subscribe(
      (tiporesoluciones) => {
        this.listResolucionTipo = tiporesoluciones;
      }
    );    
    setTimeout(function () {
      Gestor.fn.initForms();
    }, 300);
  }

}

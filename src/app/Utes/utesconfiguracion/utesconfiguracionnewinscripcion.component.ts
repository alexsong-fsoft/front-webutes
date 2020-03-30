import { Component, OnInit, Input } from '@angular/core';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { Inscripcion } from 'src/app/inscripcion/inscripcion';
import { InscripcionService } from 'src/app/inscripcion/inscripcion.service';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-utesconfiguracionnewinscripcion',
  templateUrl: './utesconfiguracionnewinscripcion.component.html'
})
export class UtesconfiguracionnewinscripcionComponent implements AdComponent {
  @Input() data: any;
  private inscripcion: Inscripcion = new Inscripcion();
  private titulo: string = "Registro de Periodo";
  
  constructor(private inscripcionService: InscripcionService) { }

  ngOnInit() {
    this.load();
    setTimeout(function () {
      Gestor.fn.initForms();
    }, 300);
  }

  public load(): void {
    let id = this.data.idIns;
    if (id) {
      this.inscripcionService.getById(id).subscribe(
        (inscripcion) => {
          if (inscripcion != null) {
            this.inscripcion = inscripcion; 
          } 
        }
      )
    }
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { Convocatoria } from 'src/app/convocatoria/convocatoria';
import { ConvocatoriaService } from 'src/app/convocatoria/convocatoria.service';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-utesconfiguracionnewconvocatoria',
  templateUrl: './utesconfiguracionnewconvocatoria.component.html'
})
export class UtesconfiguracionnewconvocatoriaComponent implements AdComponent {
  @Input() data: any;
  private convocatoria: Convocatoria = new Convocatoria();

  constructor(private convocatoriaService: ConvocatoriaService) { }

  ngOnInit() {
    this.load();
    setTimeout(function () {
      Gestor.fn.initForms();
    }, 300);
  }

  public load(): void {
    let id = this.data.idCon;
    if (id) {
      this.convocatoriaService.getById(id).subscribe(
        (convocatoria) => {
          if (convocatoria != null) {
            this.convocatoria = convocatoria; 
          } 
        }
      )
    }
  }

}

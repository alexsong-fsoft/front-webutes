import { Component, OnInit, Input } from '@angular/core';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { Cuestionario } from 'src/app/cuestionario/cuestionario';
import { CuestionarioService } from 'src/app/cuestionario/cuestionario.service';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-utesconfiguracionnewrequisito',
  templateUrl: './utesconfiguracionnewrequisito.component.html'
})
export class UtesconfiguracionnewrequisitoComponent implements AdComponent {
  @Input() data: any;
  private cuestionario: Cuestionario = new Cuestionario();
  private titulo: string = "Registro de cuestionario";

  constructor(private cuestionarioService: CuestionarioService) { }

  ngOnInit() {
    this.load();
    setTimeout(function () {
      Gestor.fn.initForms();
    }, 300);
  }

  public load(): void {
    let id = this.data.idCue;
    if (id) {
      this.cuestionarioService.getById(id).subscribe(
        (cuestionario) => {
          if (cuestionario != null) {
            this.cuestionario = cuestionario; 
          } 
        }
      )
    }
  }


}

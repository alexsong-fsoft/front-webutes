import { Component, OnInit, Input } from '@angular/core';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { Periodo } from 'src/app/periodo/periodo';
import { PeriodoService } from 'src/app/periodo/periodo.service';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-utesconfiguracionnewperiodo',
  templateUrl: './utesconfiguracionnewperiodo.component.html'
})
export class UtesconfiguracionnewperiodoComponent implements AdComponent {
  @Input() data: any;
  private periodo: Periodo = new Periodo();
  private titulo: string = "Registro de Periodo";

  constructor(private periodoService: PeriodoService) { }

  ngOnInit() {
    this.load();
    setTimeout(function () {
      Gestor.fn.initForms();
    }, 300);
  }

  public load(): void {
    let id = this.data.idPrd;
    if (id) {
      this.periodoService.getById(id).subscribe(
        (periodo) => {
          if (periodo != null) {
            this.periodo = periodo; 
          } 
        }
      )
    }
  }
}

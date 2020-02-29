import { Component, OnInit, Input } from '@angular/core';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { Evolucion } from 'src/app/evolucion/evolucion';
import { EvolucionService } from 'src/app/evolucion/evolucion.service';

@Component({
  templateUrl: './docenteevoluciondialog.component.html'
})
export class DocenteevoluciondialogComponent implements AdComponent {
  @Input() data: any;
  private evolucion: Evolucion = new Evolucion();
  private titulo: string = "Evolución del Trabajo";

  constructor(private evolucionService: EvolucionService) { }

  ngOnInit() {
    this.load();
  }
  public load(): void {
    let id = this.data.idEvl;
    if (id) {
      this.evolucionService.getById(id).subscribe((evolucion) => this.evolucion = evolucion)
    }
  }
}

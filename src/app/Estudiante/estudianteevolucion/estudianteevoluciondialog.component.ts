import { Component, Input } from '@angular/core';
import { Resolucion } from 'src/app/resolucion/resolucion';
import { ResolucionService } from 'src/app/resolucion/resolucion.service';
import { AdComponent } from '../estudiantetema/ad.component';

@Component({
  templateUrl: './estudianteevoluciondialog.component.html'
})
export class EstudianteevolucionDialogComponent implements AdComponent {
  @Input() data: any;
  private resolucion: Resolucion = new Resolucion();
  private titulo: string = "Resolución";
  
  constructor(private resolucionService: ResolucionService) { }

  ngOnInit() {
    this.load();
  }

  public load(): void {
    let id = this.data.idRsl;
    if (id) {
      this.resolucionService.getById(id).subscribe((resolucion) => this.resolucion = resolucion)
    }
  }
  
}

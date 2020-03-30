import { Component, OnInit, Input } from '@angular/core';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { Resolucion } from 'src/app/resolucion/resolucion';
import { ResolucionService } from 'src/app/resolucion/resolucion.service';

@Component({
  selector: 'app-utesresoluciondialog-component',
  templateUrl: './utesresoluciondialog-component.component.html'
})
export class UtesresoluciondialogComponentComponent implements AdComponent {
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

import { Component, OnInit, Input } from '@angular/core';
import { Presolicitud } from 'src/app/presolicitud/presolicitud';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { PresolicitudService } from 'src/app/presolicitud/presolicitud.service';
import { Respuesta } from 'src/app/respuesta/respuesta';
import { RespuestaService } from 'src/app/respuesta/respuesta.service';

@Component({
  templateUrl: './utespresolicituddetalledialog.component.html'
})
export class UtespresolicituddetalledialogComponent implements AdComponent {
  @Input() data: any;
  private presolicitud: Presolicitud = new Presolicitud();
  private presolicitudRespuestas: Respuesta[] = [];

  private titulo: string = "Presolicitud";
  
  constructor(private presolicitudService: PresolicitudService,
    private respuestaService: RespuestaService) { }

  ngOnInit() {
    this.load();
  }

  public load(): void {
    let id = this.data.idPsl;
    if (id) {
      this.presolicitudService.getById(id).subscribe((presolicitud) => this.presolicitud = presolicitud)
      this.respuestaService.getAllByIdPresolicitud(id).subscribe((respuestas) => this.presolicitudRespuestas = respuestas)
    }
  }
  
}

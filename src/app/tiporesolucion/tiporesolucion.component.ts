import { Component, OnInit } from '@angular/core';
import { Tiporesolucion } from './tiporesolucion';
import { TiporesolucionService } from './tiporesolucion.service';
import swal from 'sweetalert2'
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-tiporesolucion',
  templateUrl: './tiporesolucion.component.html'
})
export class TiporesolucionComponent implements OnInit {

  titulo: string = "Listado de Tipo resoluciones";
  tiporesoluciones : Tiporesolucion[];

  constructor(private tiporesolucionService: TiporesolucionService) { 

  }

  ngOnInit() {
    this.tiporesolucionService.getAll().subscribe(
      tiporesoluciones => this.tiporesoluciones = tiporesoluciones
    );
  }

  delete(tiporesolucion: Tiporesolucion): void {
    swal.fire(Lang.Swal.confirmDelete).then((result) => {
      if (result.value) {
        this.tiporesolucionService.delete(tiporesolucion.idTrsl).subscribe(
          response => {
            swal.fire(Lang.messages.register_delete, Lang.messages.register_delete, 'success');
            this.ngOnInit();
          }
        )
      }
    })
  }


}

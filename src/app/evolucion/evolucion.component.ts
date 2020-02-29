import { Component, OnInit } from '@angular/core';
import { Evolucion } from './evolucion';
import { EvolucionService } from './evolucion.service';
import swal from 'sweetalert2'
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-evolucion',
  templateUrl: './evolucion.component.html'
})
export class EvolucionComponent implements OnInit {

  titulo: string = "Listado de Evoluciones";
  evoluciones : Evolucion[];

  constructor(private evolucionService: EvolucionService) { 

  }

  ngOnInit() {
    this.evolucionService.getAll().subscribe(
      evoluciones => this.evoluciones = evoluciones
    );
  }

  delete(evolucion: Evolucion): void {
    swal.fire(Lang.Swal.confirmDelete).then((result) => {
      if (result.value) {
        this.evolucionService.delete(evolucion.idEvl).subscribe(
          response => {
            swal.fire(Lang.messages.register_delete, Lang.messages.register_delete, 'success');
            this.ngOnInit();
          }
        )
      }
    })
  }



}

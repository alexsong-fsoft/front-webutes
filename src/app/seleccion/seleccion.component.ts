import { Component, OnInit } from '@angular/core';
import { Seleccion } from './seleccion';
import { SeleccionService } from './seleccion.service';
import swal from 'sweetalert2'
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.component.html'
})
export class SeleccionComponent implements OnInit {

  titulo: string = "Listado de Selecciones";
  selecciones : Seleccion[];

  constructor(private seleccionService: SeleccionService) { 

  }

  ngOnInit() {
    this.seleccionService.getAll().subscribe(
      selecciones => this.selecciones = selecciones
    );
  }

  delete(seleccion: Seleccion): void {
    swal.fire(Lang.Swal.confirmDelete).then((result) => {
      if (result.value) {
        this.seleccionService.delete(seleccion.idSel).subscribe(
          response => {
            swal.fire(Lang.messages.register_delete, Lang.messages.register_delete, 'success');
            this.ngOnInit();
          }
        )
      }
    })
  }


}

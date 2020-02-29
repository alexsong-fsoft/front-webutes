import { Component, OnInit } from '@angular/core';
import { Resolucion } from './resolucion';
import { ResolucionService } from './resolucion.service';
import swal from 'sweetalert2'
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-resolucion',
  templateUrl: './resolucion.component.html'
})
export class ResolucionComponent implements OnInit {

  titulo: string = "Listado de Resoluciones";
  resoluciones : Resolucion[];

  constructor(private resolucionService: ResolucionService) { 

  }

  ngOnInit() {
    this.resolucionService.getAll().subscribe(
      resoluciones => this.resoluciones = resoluciones
    );
  }

  delete(resolucion: Resolucion): void {
    swal.fire(Lang.Swal.confirmDelete).then((result) => {
      if (result.value) {
        this.resolucionService.delete(resolucion.idRsl).subscribe(
          response => {
            swal.fire(Lang.messages.register_delete, Lang.messages.register_delete, 'success');
            this.ngOnInit();
          }
        )
      }
    })
  }


}


import { Component, OnInit } from '@angular/core';
import { Inscripcion } from './inscripcion';
import { InscripcionService } from './inscripcion.service';
import swal from 'sweetalert2'
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html'
})
export class InscripcionComponent implements OnInit {

  titulo: string = "Listado de Inscripciones";
  inscripciones : Inscripcion[];

  constructor(private inscripcionService: InscripcionService) { 

  }

  ngOnInit() {
    this.inscripcionService.getAll().subscribe(
      inscripciones => this.inscripciones = inscripciones
    );
  }

  delete(inscripcion: Inscripcion): void {
    swal.fire(Lang.Swal.confirmDelete).then((result) => {
      if (result.value) {
        this.inscripcionService.delete(inscripcion.idIns).subscribe(
          response => {
            swal.fire(Lang.messages.register_delete, Lang.messages.register_delete, 'success');
            this.ngOnInit();
          }
        )
      }
    })
  }


}

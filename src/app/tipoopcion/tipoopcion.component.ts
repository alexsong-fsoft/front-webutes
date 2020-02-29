import { Component, OnInit } from '@angular/core';
import { Tipoopcion } from './tipoopcion';
import { TipoopcionService } from './tipoopcion.service';
import swal from 'sweetalert2'
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-tipoopcion',
  templateUrl: './tipoopcion.component.html'
})
export class TipoopcionComponent implements OnInit {

  titulo: string = "Listado de Tipo opciones";
  tipoopciones : Tipoopcion[];

  constructor(private tipoopcionService: TipoopcionService) { 

  }

  ngOnInit() {
    this.tipoopcionService.getAll().subscribe(
      tipoopciones => this.tipoopciones = tipoopciones
    );
  }

  delete(tipoopcion: Tipoopcion): void {
    swal.fire(Lang.Swal.confirmDelete).then((result) => {
      if (result.value) {
        this.tipoopcionService.delete(tipoopcion.pkTop).subscribe(
          response => {
            swal.fire(Lang.messages.register_delete, Lang.messages.register_delete, 'success')
          }
        )
      }
    })
  }


}


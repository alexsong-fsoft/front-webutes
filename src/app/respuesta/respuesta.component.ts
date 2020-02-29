import { Component, OnInit } from '@angular/core';
import { Respuesta } from './respuesta';
import { RespuestaService } from './respuesta.service';
import swal from 'sweetalert2'
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-respuesta',
  templateUrl: './respuesta.component.html'
})
export class RespuestaComponent implements OnInit {

  titulo: string = "Listado de Respuestas";
  respuestas : Respuesta[];

  constructor(private respuestaService: RespuestaService) { 

  }

  ngOnInit() {
    this.respuestaService.getAll().subscribe(
      respuestas => this.respuestas = respuestas
    );
  }

  delete(respuesta: Respuesta): void {
    swal.fire(Lang.Swal.confirmDelete).then((result) => {
      if (result.value) {
        this.respuestaService.delete(respuesta.idRes).subscribe(
          response => {
            swal.fire(Lang.messages.register_delete, Lang.messages.register_delete, 'success');
            this.ngOnInit();
          }
        )
      }
    })
  }


}

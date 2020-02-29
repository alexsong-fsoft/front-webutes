import { Component, OnInit } from '@angular/core';
import { Asignado } from './asignado';
import { AsignadoService } from './asignado.service';
import swal from 'sweetalert2'
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-asignado',
  templateUrl: './asignado.component.html'
})
export class AsignadoComponent implements OnInit {

  titulo: string = "Listado de Asignados";
  asignados : Asignado[];

  constructor(private asignadoService: AsignadoService) { 

  }

  ngOnInit() {
    this.asignadoService.getAll().subscribe(
      asignados => this.asignados = asignados
    );
  }

  delete(asignado: Asignado): void {
    swal.fire(Lang.Swal.confirmDelete).then((result) => {
      if (result.value) {
        this.asignadoService.delete(asignado.idAsg).subscribe(
          response => {
            swal.fire(Lang.messages.register_delete, Lang.messages.register_delete, 'success');
            this.ngOnInit();
          }
        )
      }
    })
  }


}

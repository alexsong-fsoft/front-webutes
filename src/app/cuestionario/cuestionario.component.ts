import { Component, OnInit } from '@angular/core';
import { Cuestionario } from './cuestionario';
import { CuestionarioService } from './cuestionario.service';
import swal from 'sweetalert2'
import Lang from '../../assets/app.lang.json';


@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html'
})
export class CuestionarioComponent implements OnInit {
  titulo: string = "Listado de Cuestionarios";
  cuestionarios : Cuestionario[];

  constructor(private cuestionarioService: CuestionarioService) { 

  }

  ngOnInit() {
    this.cuestionarioService.getAll().subscribe(
      cuestionarios => this.cuestionarios = cuestionarios
    );
  }

  delete(cuestionario: Cuestionario): void {
    swal.fire(Lang.Swal.confirmDelete).then((result) => {
      if (result.value) {
        this.cuestionarioService.delete(cuestionario.idCue).subscribe(
          response => {
            swal.fire(Lang.messages.register_delete, Lang.messages.register_delete, 'success');
            this.ngOnInit();
          }
        )
      }
    })
  }

}

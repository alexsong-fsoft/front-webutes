import { Component, OnInit } from '@angular/core';
import { Convocatoria } from './convocatoria';
import { ConvocatoriaService } from './convocatoria.service';
import swal from 'sweetalert2'
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-convocatoria',
  templateUrl: './convocatoria.component.html'
})
export class ConvocatoriaComponent implements OnInit {

  titulo: string = "Listado de Convocatorias";
  convocatorias : Convocatoria[];

  constructor(private convocatoriaService: ConvocatoriaService) { 

  }

  ngOnInit() {
    this.convocatoriaService.getAll().subscribe(
      convocatorias => this.convocatorias = convocatorias
    );
  }

  delete(convocatoria: Convocatoria): void {
    swal.fire(Lang.Swal.confirmDelete).then((result) => {
      if (result.value) {
        this.convocatoriaService.delete(convocatoria.idCon).subscribe(
          response => {
            swal.fire(Lang.messages.register_delete, Lang.messages.register_delete, 'success');
            this.ngOnInit();
          }
        )
      }
    })
  }


}

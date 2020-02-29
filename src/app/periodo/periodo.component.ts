import { Component, OnInit } from '@angular/core';
import { Periodo } from './periodo';
import { PeriodoService } from './periodo.service';
import swal from 'sweetalert2'
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html'
})
export class PeriodoComponent implements OnInit {

  titulo: string = "Listado de Periodos";
  periodos : Periodo[];

  constructor(private periodoService: PeriodoService) { 

  }

  ngOnInit() {
    this.periodoService.getAll().subscribe(
      periodos => this.periodos = periodos
    );
  }

  delete(periodo: Periodo): void {
    swal.fire(Lang.Swal.confirmDelete).then((result) => {
      if (result.value) {
        this.periodoService.delete(periodo.idPrd).subscribe(
          response => {
            swal.fire(Lang.messages.register_delete, Lang.messages.register_delete, 'success');
            this.ngOnInit();
          }
        )
      }
    })
  }


}

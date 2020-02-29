import { Component, OnInit } from '@angular/core';
import { Historico } from './historico';
import { HistoricoService } from './historico.service';
import swal from 'sweetalert2'
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html'
})
export class HistoricoComponent implements OnInit {

  titulo: string = "Listado de Historicos";
  historicos : Historico[];

  constructor(private historicoService: HistoricoService) { 

  }

  ngOnInit() {
    this.historicoService.getAll().subscribe(
      historicos => this.historicos = historicos
    );
  }

  delete(historico: Historico): void {
    swal.fire(Lang.Swal.confirmDelete).then((result) => {
      if (result.value) {
        this.historicoService.delete(historico.pkHis).subscribe(
          response => {
            swal.fire(Lang.messages.register_delete, Lang.messages.register_delete, 'success');
            this.ngOnInit();
          }
        )
      }
    })
  }

}

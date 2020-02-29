import { Component, OnInit } from '@angular/core';
import { Hito } from './hito';
import { HitoService } from './hito.service';
import swal from 'sweetalert2'
import Lang from '../../assets/app.lang.json';


@Component({
  selector: 'app-hito',
  templateUrl: './hito.component.html'
})
export class HitoComponent implements OnInit {
  titulo: string = "Listado de Hitos";
  hitos : Hito[];

  constructor(private hitoService: HitoService) { 

  }

  ngOnInit() {
    this.hitoService.getAll().subscribe(
      hitos => this.hitos = hitos
    );
  }

  delete(hito: Hito): void {
    swal.fire(Lang.Swal.confirmDelete).then((result) => {
      if (result.value) {
        this.hitoService.delete(hito.idHit).subscribe(
          response => {
            swal.fire(Lang.messages.register_delete, Lang.messages.register_delete, 'success');
            this.ngOnInit();
          }
        )
      }
    })
  }


}

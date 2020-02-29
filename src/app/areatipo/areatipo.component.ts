import { Component, OnInit } from '@angular/core';
import { Areatipo } from './areatipo';
import { AreatipoService } from './areatipo.service';
import swal from 'sweetalert2'
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-areatipo',
  templateUrl: './areatipo.component.html'
})
export class AreatipoComponent implements OnInit {
  titulo: string = "Listado de Tipos de Area";
  areaTipos : Areatipo[];

  constructor(private areatipoService: AreatipoService) { 

  }

  ngOnInit() {
    this.areatipoService.getAll().subscribe(
      areaTipos => this.areaTipos = areaTipos
    );
  }

  delete(areatipo: Areatipo): void {
    swal.fire(Lang.Swal.confirmDelete).then((result) => {
      if (result.value) {
        this.areatipoService.delete(areatipo.idAreT).subscribe(
          response => {
            //this.clientes = this.clientes.filter(cli => cli !== cliente)
            swal.fire(Lang.messages.register_delete, Lang.messages.register_delete, 'success');
            this.ngOnInit();
          }
        )
      }
    })
  }

}

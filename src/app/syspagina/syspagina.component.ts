import { Component, OnInit } from '@angular/core';
import { Syspagina } from './syspagina';
import { SyspaginaService } from './syspagina.service';
import swal from 'sweetalert2'
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-syspagina',
  templateUrl: './syspagina.component.html'
})
export class SyspaginaComponent implements OnInit {

  titulo: string = "Listado de paginas";
  syspaginas : Syspagina[];

  constructor(private syspaginaService: SyspaginaService) { 

  }

  ngOnInit() {
    this.syspaginaService.getAll().subscribe(
      syspaginas => this.syspaginas = syspaginas
    );
  }

  delete(syspagina: Syspagina): void {
    swal.fire(Lang.Swal.confirmDelete).then((result) => {
      if (result.value) {
        this.syspaginaService.delete(syspagina.idPag).subscribe(
          response => {
            swal.fire(Lang.messages.register_delete, Lang.messages.register_delete, 'success');
            this.ngOnInit();
          }
        )
      }
    })
  }


}

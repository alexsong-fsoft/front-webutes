import { Component, OnInit } from '@angular/core';
import { Sysconfiguracion } from './sysconfiguracion';
import { SysconfiguracionService } from './sysconfiguracion.service';
import swal from 'sweetalert2'
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-sysconfiguracion',
  templateUrl: './sysconfiguracion.component.html'
})
export class SysconfiguracionComponent implements OnInit {

  titulo: string = "Listado de Configuraciones";
  sysconfiguraciones : Sysconfiguracion[];

  constructor(private sysconfiguracionService: SysconfiguracionService) { 

  }

  ngOnInit() {
    this.sysconfiguracionService.getAll().subscribe(
      sysconfiguraciones => this.sysconfiguraciones = sysconfiguraciones
    );
  }

  delete(sysconfiguracion: Sysconfiguracion): void {
    swal.fire(Lang.Swal.confirmDelete).then((result) => {
      if (result.value) {
        this.sysconfiguracionService.delete(sysconfiguracion.pkConf).subscribe(
          response => {
            swal.fire(Lang.messages.register_delete, Lang.messages.register_delete, 'success');
            this.ngOnInit();
          }
        )
      }
    })
  }



}

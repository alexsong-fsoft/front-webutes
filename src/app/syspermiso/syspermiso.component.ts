import { Component, OnInit } from '@angular/core';
import { Syspermiso } from './syspermiso';
import { SyspermisoService } from './syspermiso.service';
import swal from 'sweetalert2'
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-syspermiso',
  templateUrl: './syspermiso.component.html'
})
export class SyspermisoComponent implements OnInit {

  titulo: string = "Listado de permisos";
  syspermisos : Syspermiso[];

  constructor(private syspermisoService: SyspermisoService) { 

  }

  ngOnInit() {
    this.syspermisoService.getAll().subscribe(
      syspermisos => this.syspermisos = syspermisos
    );
  }

  delete(syspermiso: Syspermiso): void {
    swal.fire(Lang.Swal.confirmDelete).then((result) => {
      if (result.value) {
        this.syspermisoService.delete(syspermiso.idPerm).subscribe(
          response => {
            swal.fire(Lang.messages.register_delete, Lang.messages.register_delete, 'success')
          }
        )
      }
    })
  }


}

import { Component, OnInit } from '@angular/core';
import { Sysperfil } from './sysperfil';
import { SysperfilService } from './sysperfil.service';
import swal from 'sweetalert2'
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-sysperfil',
  templateUrl: './sysperfil.component.html'
})
export class SysperfilComponent implements OnInit {

  titulo: string = "Listado de perfiles";
  sysperfiles : Sysperfil[];

  constructor(private sysperfilService: SysperfilService) { 

  }

  ngOnInit() {
    this.sysperfilService.getAll().subscribe(
      sysperfiles => this.sysperfiles = sysperfiles
    );
  }

  delete(sysperfil: Sysperfil): void {
    swal.fire(Lang.Swal.confirmDelete).then((result) => {
      if (result.value) {
        this.sysperfilService.delete(sysperfil.idPrf).subscribe(
          response => {
            swal.fire(Lang.messages.register_delete, Lang.messages.register_delete, 'success');
            this.ngOnInit();
          }
        )
      }
    })
  }


}

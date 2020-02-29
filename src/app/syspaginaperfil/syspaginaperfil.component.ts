import { Component, OnInit } from '@angular/core';
import { Syspaginaperfil } from './syspaginaperfil';
import { SyspaginaperfilService } from './syspaginaperfil.service';
import swal from 'sweetalert2'
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-syspaginaperfil',
  templateUrl: './syspaginaperfil.component.html'
})
export class SyspaginaperfilComponent implements OnInit {

  titulo: string = "Listado de pagina perfiles";
  syspaginaperfiles : Syspaginaperfil[];

  constructor(private syspaginaperfilService: SyspaginaperfilService) { 

  }

  ngOnInit() {
    this.syspaginaperfilService.getAll().subscribe(
      syspaginaperfiles => this.syspaginaperfiles = syspaginaperfiles
    );
  }

  delete(syspaginaperfil: Syspaginaperfil): void {
    swal.fire(Lang.Swal.confirmDelete).then((result) => {
      if (result.value) {
        this.syspaginaperfilService.delete(syspaginaperfil.idPgPrf).subscribe(
          response => {
            swal.fire(Lang.messages.register_delete, Lang.messages.register_delete, 'success');
            this.ngOnInit();
          }
        )
      }
    })
  }


}
import { Component, OnInit } from '@angular/core';
import { Sysusuario } from './sysusuario';
import { SysusuarioService } from './sysusuario.service';
import swal from 'sweetalert2'
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-sysusuario',
  templateUrl: './sysusuario.component.html'
})
export class SysusuarioComponent implements OnInit {

  titulo: string = "Listado de usuarios";
  sysusuarios : Sysusuario[];

  constructor(private sysusuarioService: SysusuarioService) { 

  }

  ngOnInit() {
    this.sysusuarioService.getAll().subscribe(
      sysusuarios => this.sysusuarios = sysusuarios
    );
  }

  delete(sysusuario: Sysusuario): void {
    swal.fire(Lang.Swal.confirmDelete).then((result) => {
      if (result.value) {
        this.sysusuarioService.delete(sysusuario.idUsr).subscribe(
          response => {
            swal.fire(Lang.messages.register_delete, Lang.messages.register_delete, 'success');
            this.ngOnInit();
          }
        )
      }
    })
  }


}


import { Component, OnInit } from '@angular/core';
import { Correo } from './correo';
import { CorreoService } from './correo.service';
import swal from 'sweetalert2'
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.component.html'
})
export class CorreoComponent implements OnInit {

  titulo: string = "Listado de Correos";
  correos : Correo[];

  constructor(private correoService: CorreoService) { 

  }

  ngOnInit() {
    this.correoService.getAll().subscribe(
      correos => this.correos = correos
    );
  }

  delete(correo: Correo): void {
    swal.fire(Lang.Swal.confirmDelete).then((result) => {
      if (result.value) {
        this.correoService.delete(correo.idCorreo).subscribe(
          response => {
            swal.fire(Lang.messages.register_delete, Lang.messages.register_delete, 'success');
            this.ngOnInit();
          }
        )
      }
    })
  }


}

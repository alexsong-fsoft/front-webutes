import { Component, OnInit } from '@angular/core';
import { Presolicitud } from './presolicitud';
import { PresolicitudService } from './presolicitud.service';
import swal from 'sweetalert2'
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-presolicitud',
  templateUrl: './presolicitud.component.html'
})
export class PresolicitudComponent implements OnInit {

  titulo: string = "Listado de Presolicitudes";
  presolicitudes : Presolicitud[];

  constructor(private presolicitudService: PresolicitudService) { 

  }

  ngOnInit() {
    this.presolicitudService.getAll().subscribe(
      presolicitudes => this.presolicitudes = presolicitudes
    );
  }

  delete(presolicitud: Presolicitud): void {
    swal.fire(Lang.Swal.confirmDelete).then((result) => {
      if (result.value) {
        this.presolicitudService.delete(presolicitud.idPsl).subscribe(
          response => {
            swal.fire(Lang.messages.register_delete, Lang.messages.register_delete, 'success');
            this.ngOnInit();
          }
        )
      }
    })
  }


}


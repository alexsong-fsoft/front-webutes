import { Component, OnInit } from '@angular/core';
import { Syspropiedad } from './syspropiedad';
import { SyspropiedadService } from './syspropiedad.service';
import swal from 'sweetalert2'
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-syspropiedad',
  templateUrl: './syspropiedad.component.html'
})
export class SyspropiedadComponent implements OnInit {

  titulo: string = "Listado de propiedades";
  syspropiedades : Syspropiedad[];

  constructor(private syspropiedadService: SyspropiedadService) { 

  }

  ngOnInit() {
    this.syspropiedadService.getAll().subscribe(
      syspropiedades => this.syspropiedades = syspropiedades
    );
  }

  delete(syspropiedad: Syspropiedad): void {
    swal.fire(Lang.Swal.confirmDelete).then((result) => {
      if (result.value) {
        this.syspropiedadService.delete(syspropiedad.idProp).subscribe(
          response => {
            swal.fire(Lang.messages.register_delete, Lang.messages.register_delete, 'success');
            this.ngOnInit();
          }
        )
      }
    })
  }


}


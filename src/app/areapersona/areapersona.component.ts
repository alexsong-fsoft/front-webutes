import { Component, OnInit } from '@angular/core';
import { Areapersona } from './areapersona';
import { AreapersonaService } from './areapersona.service';
import swal from 'sweetalert2'
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-areapersona',
  templateUrl: './areapersona.component.html'
})
export class AreapersonaComponent implements OnInit {

  titulo: string = "Listado de Area Personas";
  areapersonas : Areapersona[];

  constructor(private areapersonaService: AreapersonaService) { 

  }

  ngOnInit() {
    this.areapersonaService.getAll().subscribe(
      areapersonas => this.areapersonas = areapersonas
    );
  }

  delete(areapersona: Areapersona): void {
    swal.fire(Lang.Swal.confirmDelete).then((result) => {
      if (result.value) {
        this.areapersonaService.delete(areapersona.idArPer).subscribe(
          response => {
            swal.fire(Lang.messages.register_delete, Lang.messages.register_delete, 'success');
            this.ngOnInit();
          }
        )
      }
    })
  }

}

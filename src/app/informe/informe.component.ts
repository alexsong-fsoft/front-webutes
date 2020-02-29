import { Component, OnInit } from '@angular/core';
import { Informe } from './informe';
import { InformeService } from './informe.service';
import swal from 'sweetalert2'
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html'
})
export class InformeComponent implements OnInit {

  titulo: string = "Listado de Informes";
  informes : Informe[];

  constructor(private informeService: InformeService) { 

  }

  ngOnInit() {
    this.informeService.getAll().subscribe(
      informes => this.informes = informes
    );
  }

  delete(informe: Informe): void {
    swal.fire(Lang.Swal.confirmDelete).then((result) => {
      if (result.value) {
        this.informeService.delete(informe.idInf).subscribe(
          response => {
            swal.fire(Lang.messages.register_delete, Lang.messages.register_delete, 'success');
            this.ngOnInit();
          }
        )
      }
    })
  }


}

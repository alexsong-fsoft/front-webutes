import { Component, OnInit } from '@angular/core';
import { Tema } from './tema';
import { TemaService } from './tema.service';
import swal from 'sweetalert2'
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html'
})
export class TemaComponent implements OnInit {

  titulo: string = "Listado de Temas";
  temas : Tema[];

  constructor(private temaService: TemaService) { 

  }

  ngOnInit() {
    this.temaService.getAll().subscribe(
      temas => this.temas = temas
    );
  }

  delete(tema: Tema): void {
    swal.fire(Lang.Swal.confirmDelete).then((result) => {
      if (result.value) {
        this.temaService.delete(tema.idTem).subscribe(
          response => {
            swal.fire(Lang.messages.register_delete, Lang.messages.register_delete, 'success');
            this.ngOnInit();
          }
        )
      }
    })  
  }
}


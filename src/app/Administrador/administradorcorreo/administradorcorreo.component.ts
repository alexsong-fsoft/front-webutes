import { Component, OnInit } from '@angular/core';
import { Area } from 'src/app/area/area';
import { Sysconfiguracion } from 'src/app/sysconfiguracion/sysconfiguracion';
import { SysconfiguracionService } from 'src/app/sysconfiguracion/sysconfiguracion.service';

@Component({
  selector: 'app-administradorcorreo',
  templateUrl: './administradorcorreo.component.html'
})
export class AdministradorcorreoComponent implements OnInit {
  titulo: string = "Correo";
  sysconfiguraciones : Sysconfiguracion[];

  constructor(private sysconfiguracionService: SysconfiguracionService) { }

  ngOnInit() {
    this.sysconfiguracionService.getAllByTipo("MAIL").subscribe(
      sysconfiguraciones => this.sysconfiguraciones = sysconfiguraciones
    );
  }

}

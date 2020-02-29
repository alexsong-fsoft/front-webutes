import { Component, OnInit } from '@angular/core';
import { Sysusuario } from 'src/app/sysusuario/sysusuario';
import { SysusuarioService } from 'src/app/sysusuario/sysusuario.service';

@Component({
  selector: 'app-administradorconfiguracion',
  templateUrl: './administradorconfiguracion.component.html'
})
export class AdministradorconfiguracionComponent implements OnInit {
  titulo: string = "Usuarios";
  sysusuarios : Sysusuario[];

  constructor(private sysusuarioService: SysusuarioService) { }

  ngOnInit() {
    this.sysusuarioService.getAll().subscribe(
      sysusuarios => this.sysusuarios = sysusuarios
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { Asignado } from './asignado';
import { AsignadoService } from './asignado.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-formasignado',
  templateUrl: './formasignado.component.html'
})
export class FormasignadoComponent implements OnInit {

  private asignado: Asignado = new Asignado();
  private titulo: string = "Formulario Asignado";

  constructor(private asignadoService: AsignadoService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.load();
  }

  public load(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.asignadoService.getById(id).subscribe((asignado) => this.asignado = asignado)
      }
    })
  }

  public create(): void {
    this.asignadoService.create(this.asignado).subscribe(
      response => {
        this.router.navigate(['/asignado'])
        swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'success')
      }
    )
  }

  public update():void{
    this.asignadoService.update(this.asignado).subscribe( 
      response => {
        this.router.navigate(['/asignado'])
        swal.fire(Lang.messages.register_update, Lang.messages.register_updated, 'success')
      }
    )
  }

}

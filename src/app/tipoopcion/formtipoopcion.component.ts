import { Component, OnInit } from '@angular/core';
import { Tipoopcion } from './tipoopcion';
import { TipoopcionService } from './tipoopcion.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-formtipoopcion',
  templateUrl: './formtipoopcion.component.html'
})
export class FormtipoopcionComponent implements OnInit {

  private tipoopcion: Tipoopcion = new Tipoopcion();
  private titulo: string = "Formulario Tipo opcion";

  constructor(private tipoopcionService: TipoopcionService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.load();
  }

  public load(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.tipoopcionService.getById(id).subscribe((tipoopcion) => this.tipoopcion = tipoopcion)
      }
    })
  }

  public create(): void {
    this.tipoopcionService.create(this.tipoopcion).subscribe(
      response => {
        this.router.navigate(['/tipoopcion'])
        swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'success')
      }
    )
  }

  public update():void{
    this.tipoopcionService.update(this.tipoopcion).subscribe( 
      response => {
        this.router.navigate(['/tipoopcion'])
        swal.fire(Lang.messages.register_update, Lang.messages.register_updated, 'success')
      }
    )
  }

}


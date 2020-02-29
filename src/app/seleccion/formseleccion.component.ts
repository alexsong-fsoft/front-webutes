import { Component, OnInit } from '@angular/core';
import { Seleccion } from './seleccion';
import { SeleccionService } from './seleccion.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-formseleccion',
  templateUrl: './formseleccion.component.html'
})
export class FormseleccionComponent implements OnInit {

  private seleccion: Seleccion = new Seleccion();
  private titulo: string = "Formulario Seleccion";

  constructor(private seleccionService: SeleccionService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.load();
  }

  public load(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.seleccionService.getById(id).subscribe((seleccion) => this.seleccion = seleccion)
      }
    })
  }

  public create(): void {
    this.seleccionService.create(this.seleccion).subscribe(
      response => {
        this.router.navigate(['/seleccion'])
        swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'success')
      }
    )
  }

  public update():void{
    this.seleccionService.update(this.seleccion).subscribe( 
      response => {
        this.router.navigate(['/seleccion'])
        swal.fire(Lang.messages.register_update, Lang.messages.register_updated, 'success')
      }
    )
  }


}

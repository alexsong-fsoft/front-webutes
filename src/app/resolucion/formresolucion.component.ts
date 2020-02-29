import { Component, OnInit } from '@angular/core';
import { Resolucion } from './resolucion';
import { ResolucionService } from './resolucion.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import Lang from '../../assets/app.lang.json';


@Component({
  selector: 'app-formresolucion',
  templateUrl: './formresolucion.component.html'
})
export class FormresolucionComponent implements OnInit {

  private resolucion: Resolucion = new Resolucion();
  private titulo: string = "Formulario Resolucion";

  constructor(private resolucionService: ResolucionService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.load();
  }

  public load(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.resolucionService.getById(id).subscribe((resolucion) => this.resolucion = resolucion)
      }
    })
  }

  public create(): void {
    this.resolucionService.create(this.resolucion).subscribe(
      response => {
        this.router.navigate(['/resolucion'])
        swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'success')
      }
    )
  }

  public update():void{
    this.resolucionService.update(this.resolucion).subscribe( 
      response => {
        this.router.navigate(['/resolucion'])
        swal.fire(Lang.messages.register_update, Lang.messages.register_updated, 'success')
      }
    )
  }

}


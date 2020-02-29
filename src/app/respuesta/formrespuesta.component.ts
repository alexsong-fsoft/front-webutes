import { Component, OnInit } from '@angular/core';
import { Respuesta } from './respuesta';
import { RespuestaService } from './respuesta.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-formrespuesta',
  templateUrl: './formrespuesta.component.html'
})
export class FormrespuestaComponent implements OnInit {

  private respuesta: Respuesta = new Respuesta();
  private titulo: string = "Formulario Respuesta";

  constructor(private respuestaService: RespuestaService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.load();
  }

  public load(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.respuestaService.getById(id).subscribe((respuesta) => this.respuesta = respuesta)
      }
    })
  }

  public create(): void {
    this.respuestaService.create(this.respuesta).subscribe(
      response => {
        this.router.navigate(['/respuesta'])
        swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'success')
      }
    )
  }

  public update():void{
    this.respuestaService.update(this.respuesta).subscribe( 
      response => {
        this.router.navigate(['/respuesta'])
        swal.fire(Lang.messages.register_update, Lang.messages.register_updated, 'success')
      }
    )
  }

}


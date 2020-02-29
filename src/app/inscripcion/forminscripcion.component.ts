import { Component, OnInit } from '@angular/core';
import { Inscripcion } from './inscripcion';
import { InscripcionService } from './inscripcion.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-forminscripcion',
  templateUrl: './forminscripcion.component.html'
})
export class ForminscripcionComponent implements OnInit {

  private inscripcion: Inscripcion = new Inscripcion();
  private titulo: string = "Formulario Inscripcion";

  constructor(private inscripcionService: InscripcionService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.load();
  }

  public load(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.inscripcionService.getById(id).subscribe((inscripcion) => this.inscripcion = inscripcion)
      }
    })
  }

  public create(): void {
    this.inscripcionService.create(this.inscripcion).subscribe(
      response => {
        this.router.navigate(['/inscripcion'])
        swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'success')
      }
    )
  }

  public update():void{
    this.inscripcionService.update(this.inscripcion).subscribe( 
      response => {
        this.router.navigate(['/inscripcion'])
        swal.fire(Lang.messages.register_update, Lang.messages.register_updated, 'success')
      }
    )
  }

}


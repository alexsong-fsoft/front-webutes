import { Component, OnInit } from '@angular/core';
import { Tiporesolucion } from './tiporesolucion';
import { TiporesolucionService } from './tiporesolucion.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-formtiporesolucion',
  templateUrl: './formtiporesolucion.component.html'
})
export class FormtiporesolucionComponent implements OnInit {

  private tiporesolucion: Tiporesolucion = new Tiporesolucion();
  private titulo: string = "Formulario Tipo resolucion";

  constructor(private tiporesolucionService: TiporesolucionService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.load();
  }

  public load(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.tiporesolucionService.getById(id).subscribe((tiporesolucion) => this.tiporesolucion = tiporesolucion)
      }
    })
  }

  public create(): void {
    this.tiporesolucionService.create(this.tiporesolucion).subscribe(
      response => {
        this.router.navigate(['/tiporesolucion'])
        swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'success')
      }
    )
  }

  public update():void{
    this.tiporesolucionService.update(this.tiporesolucion).subscribe( 
      response => {
        this.router.navigate(['/tiporesolucion'])
        swal.fire(Lang.messages.register_update, Lang.messages.register_updated, 'success')
      }
    )
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Evolucion } from './evolucion';
import { EvolucionService } from './evolucion.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import Lang from '../../assets/app.lang.json';
import { AdComponent } from '../Estudiante/estudiantetema/ad.component';

@Component({
  //selector: 'app-formevolucion',
  templateUrl: './formevolucion.component.html'
})
export class FormevolucionComponent implements AdComponent {
  @Input() data: any;
  private evolucion: Evolucion = new Evolucion();
  private titulo: string = "Evolución de Trabajo";

  constructor(private evolucionService: EvolucionService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.load();
  }

  public load(): void {
    let id = this.data.idEvl;
    if (id) {
      this.evolucionService.getById(id).subscribe((evolucion) => this.evolucion = evolucion);
    }
    // this.activatedRoute.params.subscribe(params => {
    //   let id = params['id']
    //   if (id) {
    //     this.evolucionService.getById(id).subscribe((evolucion) => this.evolucion = evolucion)
    //   }
    // })
  }

  public create(): void {
    this.evolucionService.create(this.evolucion).subscribe(
      response => {
        this.router.navigate(['/evolucion'])
        swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'success')
      }
    )
  }

  public update():void{
    this.evolucionService.update(this.evolucion).subscribe( 
      response => {
        this.router.navigate(['/evolucion'])
        swal.fire(Lang.messages.register_update, Lang.messages.register_updated, 'success')
      }
    )
  }


}

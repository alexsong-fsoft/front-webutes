import { Component, OnInit } from '@angular/core';
import { Presolicitud } from './presolicitud';
import { PresolicitudService } from './presolicitud.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-formpresolicitud',
  templateUrl: './formpresolicitud.component.html'
})
export class FormpresolicitudComponent implements OnInit {

  private presolicitud: Presolicitud = new Presolicitud();
  private titulo: string = "Formulario Presolicitud";

  constructor(private presolicitudService: PresolicitudService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.load();
  }

  public load(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.presolicitudService.getById(id).subscribe((presolicitud) => this.presolicitud = presolicitud)
      }
    })
  }

  public create(): void {
    this.presolicitudService.create(this.presolicitud).subscribe(
      response => {
        this.router.navigate(['/presolicitud'])
        swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'success')
      }
    )
  }

  public update():void{
    this.presolicitudService.update(this.presolicitud).subscribe( 
      response => {
        this.router.navigate(['/presolicitud'])
        swal.fire(Lang.messages.register_update, Lang.messages.register_updated, 'success')
      }
    )
  }

}

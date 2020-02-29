import { Component, OnInit } from '@angular/core';
import { Correo } from './correo';
import { CorreoService } from './correo.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-formcorreo',
  templateUrl: './formcorreo.component.html'
})
export class FormcorreoComponent implements OnInit {

  private correo: Correo = new Correo();
  private titulo: string = "Formulario Correo";

  constructor(private correoService: CorreoService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.load();
  }

  public load(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.correoService.getById(id).subscribe((correo) => this.correo = correo)
      }
    })
  }

  public create(): void {
    this.correoService.create(this.correo).subscribe(
      response => {
        this.router.navigate(['/correo'])
        swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'success')
      }
    )
  }

  public update():void{
    this.correoService.update(this.correo).subscribe( 
      response => {
        this.router.navigate(['/correo'])
        swal.fire(Lang.messages.register_update, Lang.messages.register_updated, 'success')
      }
    )
  }
}

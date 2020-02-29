import { Component, OnInit } from '@angular/core';
import { Areapersona } from './areapersona';
import { AreapersonaService } from './areapersona.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-formareapersona',
  templateUrl: './formareapersona.component.html'
})
export class FormareapersonaComponent implements OnInit {

  private areapersona: Areapersona = new Areapersona();
  private titulo: string = "Formulario Area Persona";

  constructor(private areapersonaService: AreapersonaService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.load();
  }

  public load(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.areapersonaService.getById(id).subscribe((areapersona) => this.areapersona = areapersona)
      }
    })
  }

  public create(): void {
    this.areapersonaService.create(this.areapersona).subscribe(
      response => {
        this.router.navigate(['/areapersona'])
        swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'success')
      }
    )
  }

  public update():void{
    this.areapersonaService.update(this.areapersona).subscribe( 
      response => {
        this.router.navigate(['/areapersona'])
        swal.fire(Lang.messages.register_update, Lang.messages.register_updated, 'success')
      }
    )
  }

}

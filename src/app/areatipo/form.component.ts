import { Component, OnInit } from '@angular/core';
import { Areatipo } from './areatipo';
import { AreatipoService } from './areatipo.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  private areatipo: Areatipo = new Areatipo();
  private titulo: string = "Formulario Tipo de Area";

  constructor(private areatipoService: AreatipoService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.load();
  }

  public load(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.areatipoService.getById(id).subscribe((areatipo) => this.areatipo = areatipo)
      }
    })
  }

  public create(): void {
    this.areatipoService.create(this.areatipo).subscribe(
      response => {
        this.router.navigate(['/areatipo'])
        swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'success')
      }
    )
  }

  public update():void{
    this.areatipoService.update(this.areatipo).subscribe( 
      response => {
        this.router.navigate(['/areatipo'])
        swal.fire(Lang.messages.register_update, Lang.messages.register_updated, 'success')
      }
    )
  }
}

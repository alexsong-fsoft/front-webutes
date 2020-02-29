import { Component, OnInit } from '@angular/core';
import { Syspropiedad } from './syspropiedad';
import { SyspropiedadService } from './syspropiedad.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-formsyspropiedad',
  templateUrl: './formsyspropiedad.component.html'
})
export class FormsyspropiedadComponent implements OnInit {

  private syspropiedad: Syspropiedad = new Syspropiedad();
  private titulo: string = "Formulario propiedad";

  constructor(private syspropiedadService: SyspropiedadService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.load();
  }

  public load(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.syspropiedadService.getById(id).subscribe((syspropiedad) => this.syspropiedad = syspropiedad)
      }
    })
  }

  public create(): void {
    this.syspropiedadService.create(this.syspropiedad).subscribe(
      response => {
        this.router.navigate(['/syspropiedad'])
        swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'success')
      }
    )
  }

  public update():void{
    this.syspropiedadService.update(this.syspropiedad).subscribe( 
      response => {
        this.router.navigate(['/syspropiedad'])
        swal.fire(Lang.messages.register_update, Lang.messages.register_updated, 'success')
      }
    )
  }

}

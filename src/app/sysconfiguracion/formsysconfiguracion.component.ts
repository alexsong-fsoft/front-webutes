import { Component, OnInit } from '@angular/core';
import { Sysconfiguracion } from './sysconfiguracion';
import { SysconfiguracionService } from './sysconfiguracion.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-formsysconfiguracion',
  templateUrl: './formsysconfiguracion.component.html'
})
export class FormsysconfiguracionComponent implements OnInit {

  private sysconfiguracion: Sysconfiguracion = new Sysconfiguracion();
  private titulo: string = "Formulario Configuracion";

  constructor(private sysconfiguracionService: SysconfiguracionService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.load();
  }

  public load(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.sysconfiguracionService.getById(id).subscribe((sysconfiguracion) => this.sysconfiguracion = sysconfiguracion)
      }
    })
  }

  public create(): void {
    this.sysconfiguracionService.create(this.sysconfiguracion).subscribe(
      response => {
        this.router.navigate(['/sysconfiguracion'])
        swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'success')
      }
    )
  }

  public update():void{
    this.sysconfiguracionService.update(this.sysconfiguracion).subscribe( 
      response => {
        this.router.navigate(['/sysconfiguracion'])
        swal.fire(Lang.messages.register_update, Lang.messages.register_updated, 'success')
      }
    )
  }


}

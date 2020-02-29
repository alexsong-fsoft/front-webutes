import { Component, OnInit } from '@angular/core';
import { Sysusuario } from './sysusuario';
import { SysusuarioService } from './sysusuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-formsysusuario',
  templateUrl: './formsysusuario.component.html'
})
export class FormsysusuarioComponent implements OnInit {

  private sysusuario: Sysusuario = new Sysusuario();
  private titulo: string = "Formulario usuario";

  constructor(private sysusuarioService: SysusuarioService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.load();
  }

  public load(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.sysusuarioService.getById(id).subscribe((sysusuario) => this.sysusuario = sysusuario)
      }
    })
  }

  public create(): void {
    this.sysusuarioService.create(this.sysusuario).subscribe(
      response => {
        this.router.navigate(['/sysusuario'])
        swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'success')
      }
    )
  }

  public update():void{
    this.sysusuarioService.update(this.sysusuario).subscribe( 
      response => {
        this.router.navigate(['/sysusuario'])
        swal.fire(Lang.messages.register_update, Lang.messages.register_updated, 'success')
      }
    )
  }

}

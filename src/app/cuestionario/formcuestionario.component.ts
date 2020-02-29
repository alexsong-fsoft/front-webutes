import { Component, OnInit } from '@angular/core';
import { Cuestionario } from './cuestionario';
import { CuestionarioService } from './cuestionario.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-formcuestionario',
  templateUrl: './formcuestionario.component.html'
})
export class FormcuestionarioComponent implements OnInit {

  private cuestionario: Cuestionario = new Cuestionario();
  private titulo: string = "Formulario Cuestionario";

  constructor(private cuestionarioService: CuestionarioService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.load();
  }

  public load(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.cuestionarioService.getById(id).subscribe((cuestionario) => this.cuestionario = cuestionario)
      }
    })
  }

  public create(): void {
    this.cuestionarioService.create(this.cuestionario).subscribe(
      response => {
        this.router.navigate(['/cuestionario'])
        swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'success')
      }
    )
  }

  public update():void{
    this.cuestionarioService.update(this.cuestionario).subscribe( 
      response => {
        this.router.navigate(['/cuestionario'])
        swal.fire(Lang.messages.register_update, Lang.messages.register_updated, 'success')
      }
    )
  }


}

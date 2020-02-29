import { Component, OnInit } from '@angular/core';
import { Convocatoria } from './convocatoria';
import { ConvocatoriaService } from './convocatoria.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-formconvocatoria',
  templateUrl: './formconvocatoria.component.html'
})
export class FormconvocatoriaComponent implements OnInit {

  private convocatoria: Convocatoria = new Convocatoria();
  private titulo: string = "Formulario Convocatoria";

  constructor(private convocatoriaService: ConvocatoriaService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.load();
  }

  public load(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.convocatoriaService.getById(id).subscribe((convocatoria) => this.convocatoria = convocatoria)
      }
    })
  }

  public create(): void {
    this.convocatoriaService.create(this.convocatoria).subscribe(
      response => {
        this.router.navigate(['/convocatoria'])
        swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'success')
      }
    )
  }

  public update():void{
    this.convocatoriaService.update(this.convocatoria).subscribe( 
      response => {
        this.router.navigate(['/convocatoria'])
        swal.fire(Lang.messages.register_update, Lang.messages.register_updated, 'success')
      }
    )
  }
}

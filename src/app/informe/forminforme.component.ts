import { Component, OnInit } from '@angular/core';
import { Informe } from './informe';
import { InformeService } from './informe.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-forminforme',
  templateUrl: './forminforme.component.html'
})
export class ForminformeComponent implements OnInit {

  private informe: Informe = new Informe();
  private titulo: string = "Formulario Informe";

  constructor(private informeService: InformeService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.load();
  }

  public load(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.informeService.getById(id).subscribe((informe) => this.informe = informe)
      }
    })
  }

  public create(): void {
    this.informeService.create(this.informe).subscribe(
      response => {
        this.router.navigate(['/informe'])
        swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'success')
      }
    )
  }

  public update():void{
    this.informeService.update(this.informe).subscribe( 
      response => {
        this.router.navigate(['/informe'])
        swal.fire(Lang.messages.register_update, Lang.messages.register_updated, 'success')
      }
    )
  }

}

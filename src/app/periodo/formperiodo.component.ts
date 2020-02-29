import { Component, OnInit } from '@angular/core';
import { Periodo } from './periodo';
import { PeriodoService } from './periodo.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-formperiodo',
  templateUrl: './formperiodo.component.html'
})
export class FormperiodoComponent implements OnInit {

  private periodo: Periodo = new Periodo();
  private titulo: string = "Formulario Periodo";

  constructor(private periodoService: PeriodoService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.load();
  }

  public load(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.periodoService.getById(id).subscribe((periodo) => this.periodo = periodo)
      }
    })
  }

  public create(): void {
    this.periodoService.create(this.periodo).subscribe(
      response => {
        this.router.navigate(['/periodo'])
        swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'success')
      }
    )
  }

  public update():void{
    this.periodoService.update(this.periodo).subscribe( 
      response => {
        this.router.navigate(['/periodo'])
        swal.fire(Lang.messages.register_update, Lang.messages.register_updated, 'success')
      }
    )
  }

}


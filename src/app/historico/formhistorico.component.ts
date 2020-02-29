import { Component, OnInit } from '@angular/core';
import { Historico } from './historico';
import { HistoricoService } from './historico.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import Lang from '../../assets/app.lang.json';



@Component({
  selector: 'app-formhistorico',
  templateUrl: './formhistorico.component.html'
})
export class FormhistoricoComponent implements OnInit {

  private historico: Historico = new Historico();
  private titulo: string = "Formulario Historico";

  constructor(private historicoService: HistoricoService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.load();
  }

  public load(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.historicoService.getById(id).subscribe((historico) => this.historico = historico)
      }
    })
  }

  public create(): void {
    this.historicoService.create(this.historico).subscribe(
      response => {
        this.router.navigate(['/historico'])
        swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'success')
      }
    )
  }

  public update():void{
    this.historicoService.update(this.historico).subscribe( 
      response => {
        this.router.navigate(['/historico'])
        swal.fire(Lang.messages.register_update, Lang.messages.register_updated, 'success')
      }
    )
  }


}

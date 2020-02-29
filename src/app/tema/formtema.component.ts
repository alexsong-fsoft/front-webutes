import { Component, OnInit } from '@angular/core';
import { Tema } from './tema';
import { TemaService } from './tema.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-formtema',
  templateUrl: './formtema.component.html'
})
export class FormtemaComponent implements OnInit {

  private tema: Tema = new Tema();
  private titulo: string = "Formulario Tema";

  constructor(private temaService: TemaService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.load();
  }

  public load(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.temaService.getById(id).subscribe((tema) => this.tema = tema)
      }
    })
  }

  public create(): void {
    this.temaService.create(this.tema).subscribe(
      response => {
        this.router.navigate(['/tema'])
        swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'success')
      }
    )
  }

  public update():void{
    this.temaService.update(this.tema).subscribe( 
      response => {
        this.router.navigate(['/tema'])
        swal.fire(Lang.messages.register_update, Lang.messages.register_updated, 'success')
      }
    )
  }

}

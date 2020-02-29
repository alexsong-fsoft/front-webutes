import { Component, OnInit } from '@angular/core';
import { Hito } from './hito';
import { HitoService } from './hito.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import Lang from '../../assets/app.lang.json';


@Component({
  selector: 'app-formhito',
  templateUrl: './formhito.component.html'
})
export class FormhitoComponent implements OnInit {

  private hito: Hito = new Hito();
  private titulo: string = "Formulario Hito";

  constructor(private hitoService: HitoService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.load();
  }

  public load(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.hitoService.getById(id).subscribe((hito) => this.hito = hito)
      }
    })
  }

  public create(): void {
    this.hitoService.create(this.hito).subscribe(
      response => {
        this.router.navigate(['/hito'])
        swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'success')
      }
    )
  }

  public update():void{
    this.hitoService.update(this.hito).subscribe( 
      response => {
        this.router.navigate(['/hito'])
        swal.fire(Lang.messages.register_update, Lang.messages.register_updated, 'success')
      }
    )
  }

}

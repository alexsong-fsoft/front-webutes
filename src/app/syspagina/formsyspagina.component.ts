import { Component, OnInit } from '@angular/core';
import { Syspagina } from './syspagina';
import { SyspaginaService } from './syspagina.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-formsyspagina',
  templateUrl: './formsyspagina.component.html'
})
export class FormsyspaginaComponent implements OnInit {

  private syspagina: Syspagina = new Syspagina();
  private titulo: string = "Formulario Pagina";

  constructor(private syspaginaService: SyspaginaService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.load();
  }

  public load(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.syspaginaService.getById(id).subscribe((syspagina) => this.syspagina = syspagina)
      }
    })
  }

  public create(): void {
    this.syspaginaService.create(this.syspagina).subscribe(
      response => {
        this.router.navigate(['/syspagina'])
        swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'success')
      }
    )
  }

  public update():void{
    this.syspaginaService.update(this.syspagina).subscribe( 
      response => {
        this.router.navigate(['/syspagina'])
        swal.fire(Lang.messages.register_update, Lang.messages.register_updated, 'success')
      }
    )
  }

}


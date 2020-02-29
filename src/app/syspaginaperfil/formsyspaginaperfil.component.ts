import { Component, OnInit } from '@angular/core';
import { Syspaginaperfil } from './syspaginaperfil';
import { SyspaginaperfilService } from './syspaginaperfil.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-formsyspaginaperfil',
  templateUrl: './formsyspaginaperfil.component.html'
})
export class FormsyspaginaperfilComponent implements OnInit {

  private syspaginaperfil: Syspaginaperfil = new Syspaginaperfil();
  private titulo: string = "Formulario pagina perfil";

  constructor(private syspaginaperfilService: SyspaginaperfilService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.load();
  }

  public load(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.syspaginaperfilService.getById(id).subscribe((syspaginaperfil) => this.syspaginaperfil = syspaginaperfil)
      }
    })
  }

  public create(): void {
    this.syspaginaperfilService.create(this.syspaginaperfil).subscribe(
      response => {
        this.router.navigate(['/syspaginaperfil'])
        swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'success')
      }
    )
  }

  public update():void{
    this.syspaginaperfilService.update(this.syspaginaperfil).subscribe( 
      response => {
        this.router.navigate(['/syspaginaperfil'])
        swal.fire(Lang.messages.register_update, Lang.messages.register_updated, 'success')
      }
    )
  }

}

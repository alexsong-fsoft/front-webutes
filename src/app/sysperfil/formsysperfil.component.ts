import { Component, OnInit } from '@angular/core';
import { Sysperfil } from './sysperfil';
import { SysperfilService } from './sysperfil.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-formsysperfil',
  templateUrl: './formsysperfil.component.html'
})
export class FormsysperfilComponent implements OnInit {

  private sysperfil: Sysperfil = new Sysperfil();
  private titulo: string = "Formulario perfil";

  constructor(private sysperfilService: SysperfilService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.load();
  }

  public load(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.sysperfilService.getById(id).subscribe((sysperfil) => this.sysperfil = sysperfil)
      }
    })
  }

  public create(): void {
    this.sysperfilService.create(this.sysperfil).subscribe(
      response => {
        this.router.navigate(['/sysperfil'])
        swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'success')
      }
    )
  }

  public update():void{
    this.sysperfilService.update(this.sysperfil).subscribe( 
      response => {
        this.router.navigate(['/sysperfil'])
        swal.fire(Lang.messages.register_update, Lang.messages.register_updated, 'success')
      }
    )
  }

}

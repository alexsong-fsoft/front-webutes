import { Component, OnInit } from '@angular/core';
import { Syspermiso } from './syspermiso';
import { SyspermisoService } from './syspermiso.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-formsyspermiso',
  templateUrl: './formsyspermiso.component.html'
})
export class FormsyspermisoComponent implements OnInit {

  private syspermiso: Syspermiso = new Syspermiso();
  private titulo: string = "Formulario permiso";

  constructor(private syspermisoService: SyspermisoService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.load();
  }

  public load(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.syspermisoService.getById(id).subscribe((syspermiso) => this.syspermiso = syspermiso)
      }
    })
  }

  public create(): void {
    this.syspermisoService.create(this.syspermiso).subscribe(
      response => {
        this.router.navigate(['/syspermiso'])
        swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'success')
      }
    )
  }

  public update():void{
    this.syspermisoService.update(this.syspermiso).subscribe( 
      response => {
        this.router.navigate(['/syspermiso'])
        swal.fire(Lang.messages.register_update, Lang.messages.register_updated, 'success')
      }
    )
  }

}

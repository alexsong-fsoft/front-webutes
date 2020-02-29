import { Component, OnInit } from '@angular/core';
import { Area } from './area';
import { AreaService } from './area.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-formarea',
  templateUrl: './formarea.component.html'
})
export class FormareaComponent implements OnInit {
  private area: Area = new Area();
  private titulo: string = "Formulario Area";

  constructor(private areaService: AreaService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.load();
  }

  public load(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.areaService.getById(id).subscribe((area) => this.area = area)
      }
    })
  }

  public create(): void {
    this.areaService.create(this.area).subscribe(
      response => {
        this.router.navigate(['/area'])
        swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'success')
      }
    )
  }

  public update():void{
    this.areaService.update(this.area).subscribe( 
      response => {
        this.router.navigate(['/area'])
        swal.fire(Lang.messages.register_update, Lang.messages.register_updated, 'success')
      }
    )
  }

}

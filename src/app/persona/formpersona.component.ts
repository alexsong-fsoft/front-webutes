import { Component, OnInit } from '@angular/core';
import { Persona } from './persona';
import { PersonaService } from './persona.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-formpersona',
  templateUrl: './formpersona.component.html'
})
export class FormpersonaComponent implements OnInit {

  private persona: Persona = new Persona();
  private titulo: string = "Formulario Persona";

  constructor(private personaService: PersonaService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.load();
  }

  public load(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.personaService.getById(id).subscribe((persona) => this.persona = persona)
      }
    })
  }

  public create(): void {
    this.personaService.create(this.persona).subscribe(
      response => {
        this.router.navigate(['/persona'])
        swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'success')
      }
    )
  }

  public update():void{
    this.personaService.update(this.persona).subscribe( 
      response => {
        this.router.navigate(['/persona'])
        swal.fire(Lang.messages.register_update, Lang.messages.register_updated, 'success')
      }
    )
  }

}

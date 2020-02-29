import { Component, OnInit } from '@angular/core';
import { Persona } from './persona';
import { PersonaService } from './persona.service';
import swal from 'sweetalert2'
import Lang from '../../assets/app.lang.json';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html'
})
export class PersonaComponent implements OnInit {

  titulo: string = "Listado de Personas";
  personas : Persona[];

  constructor(private personaService: PersonaService) { 

  }

  ngOnInit() {
    this.personaService.getAll().subscribe(
      personas => this.personas = personas
    );
  }

  delete(persona: Persona): void {
    swal.fire(Lang.Swal.confirmDelete).then((result) => {
      if (result.value) {
        this.personaService.delete(persona.idPer).subscribe(
          response => {
            swal.fire(Lang.messages.register_delete, Lang.messages.register_delete, 'success');
            this.ngOnInit();
          }
        )
      }
    })
  }


}

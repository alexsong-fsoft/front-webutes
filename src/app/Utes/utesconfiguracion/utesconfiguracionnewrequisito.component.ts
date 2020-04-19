import { Component, OnInit, Input } from '@angular/core';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { Cuestionario } from 'src/app/cuestionario/cuestionario';
import { CuestionarioService } from 'src/app/cuestionario/cuestionario.service';
import { Router } from '@angular/router';
import { Tipo } from 'src/app/tipo/Tipo';
import { Inscripcion } from 'src/app/inscripcion/inscripcion';
import { InscripcionService } from 'src/app/inscripcion/inscripcion.service';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-utesconfiguracionnewrequisito',
  templateUrl: './utesconfiguracionnewrequisito.component.html'
})
export class UtesconfiguracionnewrequisitoComponent implements AdComponent {
  @Input() data: any;
  private cuestionario: Cuestionario = new Cuestionario();
  private listTipoRequisito: Tipo[] = [];
  private listInscripcion: Inscripcion[] = [];

  constructor(private cuestionarioService: CuestionarioService,
    private inscripcionService: InscripcionService,
    private router: Router) { }

  ngOnInit() {
    this.load();
    this.listTipoRequisito = Tipo.loadCuestionario();
    setTimeout(function () {
      Gestor.fn.initForms();
    }, 300);
  }

  public load(): void {
    this.cuestionario = new Cuestionario();
    let id = this.data.idCue;
    if (id) {
      this.cuestionarioService.getById(id).subscribe(
        (cuestionario) => {
          if (cuestionario != null) {
            this.cuestionario = cuestionario; 
          } 
        }
      )
    }
  }

  public loadListInscripcion(): void {
    this.inscripcionService.getAllByEstado().subscribe(
      (inscripciones) => {
        if (inscripciones != null) {
          this.listInscripcion = inscripciones; 
        } 
      }
    )
  }


}

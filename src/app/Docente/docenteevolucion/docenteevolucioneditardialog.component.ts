import { Component, OnInit, Input } from '@angular/core';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { Router } from '@angular/router';
import { Evolucion } from 'src/app/evolucion/evolucion';
import { EvolucionService } from 'src/app/evolucion/evolucion.service';
import swal from 'sweetalert2';
import Lang from '../../../assets/app.lang.json';
import { Estado } from 'src/app/estado/Estado.js';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-docenteevolucioneditardialog',
  templateUrl: './docenteevolucioneditardialog.component.html'
})
export class DocenteevolucioneditardialogComponent implements AdComponent {
  @Input() data: any;
  private evolucion: Evolucion = new Evolucion();
  private titulo: string = "Evolución del Trabajo";
  private listEstadoEvolucionAccion: Estado[];

  constructor(private evolucionService: EvolucionService,
    private router: Router) { }

  ngOnInit() {
    this.load();
  }

  public load(): void {
    this.listEstadoEvolucionAccion = Estado.loadEvolucionAccion();
    let id = this.data.idEvl;
    if (id) {
      this.evolucionService.getById(id).subscribe((evolucion) => this.evolucion = evolucion)
    }
  }

  public updateTemaEvolucionEstudiante(): void {
    let utilfecha = new Date();
    this.evolucion.evlValida = true;
    this.evolucion.evlFechaValida = utilfecha;
    this.evolucionService.update(this.evolucion).subscribe(
      response => {
        this.router.navigate(['/dashboard/docenteevoluciondesarrollo']);
        $('#dialog2').dialog('close');
        swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'success');
      }
    )
  }

  closeDialog(): void {
    $('#dialog2').dialog('close');
  }
}

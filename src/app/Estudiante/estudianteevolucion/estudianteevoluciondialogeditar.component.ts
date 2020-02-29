import { Component, Input } from '@angular/core';
import { AdComponent } from '../estudiantetema/ad.component';
import { Evolucion } from 'src/app/evolucion/evolucion';
import { EvolucionService } from 'src/app/evolucion/evolucion.service';
import swal from 'sweetalert2';
import Lang from '../../../assets/app.lang.json';
import { Router } from '@angular/router';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
    templateUrl: './estudianteevoluciondialogeditar.component.html'
})
export class EstudianteevoluciondialogeditarComponent implements AdComponent {
    @Input() data: any;
    private evolucion: Evolucion = new Evolucion();
    private titulo: string = "Evolución del Trabajo";

    constructor(private evolucionService: EvolucionService,
        private router: Router) { }

    ngOnInit() {
        this.load();
    }

    public load(): void {
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
                $('#dialog2').dialog('close');
                swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'success');
                this.router.navigate([`/dashboard/estudianteevoluciondesarrollo/${this.evolucion.tema.idTem}`]);
            }
        )
    }

    closeDialog(): void {
        $('#dialog2').dialog('close'); 
    }
}
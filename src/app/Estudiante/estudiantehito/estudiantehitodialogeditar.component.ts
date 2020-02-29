import { Component, Input } from '@angular/core';
import { AdComponent } from '../estudiantetema/ad.component';
import { Evolucion } from 'src/app/evolucion/evolucion';
import { EvolucionService } from 'src/app/evolucion/evolucion.service';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
    templateUrl: './estudiantehitodialogeditar.component.html'
})
export class EstudiantehitodialogeditarComponent implements AdComponent {
    @Input() data: any;
    private evolucion: Evolucion = new Evolucion();
    private titulo: string = "Hito del Trabajo";

    constructor(private evolucionService: EvolucionService) { }

    ngOnInit() {
        this.load();
    }

    public load(): void {
        let id = this.data.idEvl;
        if (id) {
            this.evolucionService.getById(id).subscribe((evolucion) => this.evolucion = evolucion)
        }
    }
    
    closeDialog(): void {
        $('#dialog2').dialog('close');
      }
}
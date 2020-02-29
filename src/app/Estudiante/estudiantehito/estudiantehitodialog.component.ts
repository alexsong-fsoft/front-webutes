import { Component, Input } from '@angular/core';
import { AdComponent } from '../estudiantetema/ad.component';
import { HitoService } from 'src/app/hito/hito.service';
import { Hito } from 'src/app/hito/hito';

@Component({
    templateUrl: './estudiantehitodialog.component.html'
})
export class EstudiantehitodialogComponent implements AdComponent {
    @Input() data: any;
    private hito: Hito = new Hito();
    private titulo: string = "Hito";

    constructor(private hitoService: HitoService) { }

    ngOnInit() {
        this.load();
    }

    public load(): void {
        let id = this.data.idHit;
        if (id) {
            this.hitoService.getById(id).subscribe((hito) => this.hito = hito)
        }
    }

}
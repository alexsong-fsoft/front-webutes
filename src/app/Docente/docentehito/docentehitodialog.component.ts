import { Component, OnInit, Input } from '@angular/core';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { Hito } from 'src/app/hito/hito';
import { HitoService } from 'src/app/hito/hito.service';
import { Estado } from 'src/app/estado/Estado';
import { DatePipe } from '@angular/common';
import { Estaticos } from 'src/app/app.constants';

@Component({
  templateUrl: './docentehitodialog.component.html'
})
export class DocentehitodialogComponent implements AdComponent {
  @Input() data: any;
  private hito: Hito = new Hito();
  private listEstadoHito: Estado[] = [];

  constructor(private hitoService: HitoService,
    private datepipe: DatePipe) { }

  ngOnInit() {
    this.load();
    this.listEstadoHito = Estado.loadHito();
  }

  public load(): void {
    let id = this.data.idHit;
    if (id) {
      this.hitoService.getById(id).subscribe((hito) => this.hito = hito)
    }
  }

  public getNombreEstadoPorLista(idEstado: number): String {
    return Estado.getNombreEstadoPorLista(idEstado, this.listEstadoHito);
  }

  public parseDateToString(date: Date): String{
    return this.datepipe.transform(date, Estaticos.FORMAT_DATE);
  }


}

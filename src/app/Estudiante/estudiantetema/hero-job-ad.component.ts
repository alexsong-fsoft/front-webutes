import { Component, Input } from '@angular/core';

import { AdComponent }      from './ad.component';
import { Tema } from 'src/app/tema/tema';
import { TemaService } from 'src/app/tema/tema.service';

@Component({
  //selector: 'app-formtema',
  templateUrl: './formestudiantetema.component.html'
})
export class HeroJobAdComponent implements AdComponent {
  @Input() data: any;
  private tema: Tema = new Tema();
  private titulo: string = "Tema";
  
  constructor(private temaService: TemaService) { }

  ngOnInit() {
    this.load();
  }

  public load(): void {
    let id = this.data.idTema;
    if (id) {
      this.temaService.getById(id).subscribe((tema) => this.tema = tema)
    }
  }
  
}

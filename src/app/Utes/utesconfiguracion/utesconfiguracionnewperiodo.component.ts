import { Component, OnInit, Input } from '@angular/core';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { Periodo } from 'src/app/periodo/periodo';
import { PeriodoService } from 'src/app/periodo/periodo.service';
import swal from 'sweetalert2';
import Lang from '../../../assets/app.lang.json';
import { Estaticos } from 'src/app/app.constants';
import { Router } from '@angular/router';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-utesconfiguracionnewperiodo',
  templateUrl: './utesconfiguracionnewperiodo.component.html'
})
export class UtesconfiguracionnewperiodoComponent implements AdComponent {
  @Input() data: any;
  private periodo: Periodo = new Periodo();

  constructor(private periodoService: PeriodoService,
    private router: Router) { }

  ngOnInit() {
    this.periodo = new Periodo();
    this.load();
    setTimeout(function () {
      Gestor.fn.initForms();
    }, 300);
  }

  public load(): void {
    let id = this.data.idPrd;
    if (id) {
      this.periodoService.getById(id).subscribe(
        (periodo) => {
          if (periodo != null) {
            this.periodo = periodo; 
          } 
        }
      )
    }
  }

  public create(): boolean {
    let validacion:boolean = false;
    try {
      console.log(this.periodo);
      if (this.periodo.prdNumero != null && this.periodo.prdNumero != 0) {
        this.periodoService.getAllByNumero(this.periodo.prdNumero).subscribe(
          (periodos) => {
            if (periodos == null || periodos.length == 0) {
              this.periodoService.create(this.periodo).subscribe( 
                response => {
                  if(response){
                    $('#dialog').dialog('close');
                    swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_OK_REGISTRA, 'success');
                    this.router.navigate(['/dashboard/utesconfiguracion']);
                    validacion = true;
                  } else {
                    swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_ERROR_REGISTRA, 'warning');
                  }
                }
              );
            }
            else {
              swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_ERROR_EXISTE, 'warning');
            }
          }
        );        
      } else {
        swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_ERROR_REGISTRA_CERO, 'warning');
      }
    } catch (error) {
      console.error('Here is the error message', error);
      return false;
    }
    return validacion;
  }

  public update(): boolean {
    let validacion:boolean = false;
    try {
      console.log(this.periodo);
      this.periodoService.update(this.periodo).subscribe( 
        response => {
          if(response){
            $('#dialog').dialog('close');
            swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_OK_ACTUALIZA, 'success');
            this.router.navigate(['/dashboard/utesconfiguracion']);
            validacion = true;
          } else {
            swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_ERROR_ACTUALIZA, 'warning');
          }
        }
      );
    } catch (error) {
      console.error('Here is the error message', error);
      return false;
    }
    return validacion;
  }
}

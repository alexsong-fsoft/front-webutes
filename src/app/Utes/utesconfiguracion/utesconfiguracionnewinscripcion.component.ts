import { Component, OnInit, Input } from '@angular/core';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { Inscripcion } from 'src/app/inscripcion/inscripcion';
import { InscripcionService } from 'src/app/inscripcion/inscripcion.service';
import { Router } from '@angular/router';
import { Periodo } from 'src/app/periodo/periodo';
import { PeriodoService } from 'src/app/periodo/periodo.service';
import { Estaticos } from 'src/app/app.constants';

import swal from 'sweetalert2';
import Lang from '../../../assets/app.lang.json';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-utesconfiguracionnewinscripcion',
  templateUrl: './utesconfiguracionnewinscripcion.component.html'
})
export class UtesconfiguracionnewinscripcionComponent implements AdComponent {
  @Input() data: any;
  private inscripcion: Inscripcion = new Inscripcion();
  private PRE_SEC: String = "INSCRI";
  private listPeriodo: Periodo[];
  
  constructor(private inscripcionService: InscripcionService,
    private periodoService: PeriodoService,
    private router: Router) { }

  ngOnInit() {
    this.inscripcion = new Inscripcion();
    this.loadPeriodo();
    this.load();
    setTimeout(function () {
      Gestor.fn.initForms();
    }, 300);
  }

  public load(): void {
    let id = this.data.idIns;
    if (id) {
      this.inscripcionService.getById(id).subscribe(
        (inscripcion) => {
          if (inscripcion != null) {
            this.inscripcion = inscripcion; 
          } 
        }
      )
    } else {
      this.getCodeVal();
    }
  }

  public loadPeriodo(): void {
    this.listPeriodo = [];
    this.periodoService.getAll().subscribe(
      (periodos) => {
        if (periodos != null) {
          this.listPeriodo = periodos; 
        } 
      }
    ) 
  }


  public getCodeVal(): void {
    let valnom: String = "";
    this.inscripcionService.getSecuencialInscripcion().subscribe(
      (valorseq) => {
        if (valorseq != null) {
          valnom = this.PRE_SEC + "" + valorseq;
          this.inscripcion.insSecuencia = valorseq; 
          this.inscripcion.insNombre = valnom;
        } 
      }
    )
  }


  public createInscripcion(): boolean {
    let validacion:boolean = false;
    try {
      if (this.inscripcion.insFechaFin != null && this.inscripcion.insFechaInicio != null) {
          
          this.inscripcionService.create(this.inscripcion).subscribe( 
            response => {
              if(response){
                $('#dialogUtesConfiguracion').dialog('close');
                swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_OK_REGISTRA, 'success');
                this.router.navigate(['/dashboard/utesconfiguracion']);
                validacion = true;
              } else {
                swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_ERROR_SELECCION, 'warning');
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

}

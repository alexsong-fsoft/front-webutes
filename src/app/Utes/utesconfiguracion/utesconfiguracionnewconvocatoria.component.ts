import { Component, OnInit, Input } from '@angular/core';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { Convocatoria } from 'src/app/convocatoria/convocatoria';
import { ConvocatoriaService } from 'src/app/convocatoria/convocatoria.service';
import { Estaticos } from 'src/app/app.constants';
import { Periodo } from 'src/app/periodo/periodo';
import { PeriodoService } from 'src/app/periodo/periodo.service';

import swal from 'sweetalert2';
import Lang from '../../../assets/app.lang.json';
import { Sysconfiguracion } from 'src/app/sysconfiguracion/sysconfiguracion';
import { SysconfiguracionService } from 'src/app/sysconfiguracion/sysconfiguracion.service';
import { Router } from '@angular/router';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-utesconfiguracionnewconvocatoria',
  templateUrl: './utesconfiguracionnewconvocatoria.component.html'
})
export class UtesconfiguracionnewconvocatoriaComponent implements AdComponent {
  @Input() data: any;
  private convocatoria: Convocatoria = new Convocatoria();
  private enconfigura: Sysconfiguracion = new Sysconfiguracion();
  private PARTE_CONFIG: String = "PKCONV";
  private CONFIG_TIPO: String = "BOTON";
  private PARTE_CONV: String = "CONV";
  private listPeriodo: Periodo[];


  constructor(private convocatoriaService: ConvocatoriaService,
    private periodoService: PeriodoService,
    private sysconfiguracionService: SysconfiguracionService,
    private router: Router) { }

  ngOnInit() {
    this.convocatoria = new Convocatoria();
    this.loadPeriodo();
    this.load();
    setTimeout(function () {
      Gestor.fn.initForms();
    }, 300);
  }

  public load(): void {
    let id = this.data.idCon;
    if (id) {
      this.convocatoriaService.getById(id).subscribe(
        (convocatoria) => {
          if (convocatoria != null) {
            this.convocatoria = convocatoria; 
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
    this.convocatoriaService.getSecuencialConvocatoria().subscribe(
      (valorseq) => {
        if (valorseq != null) {
          valnom = this.PARTE_CONV + "" + valorseq;
          this.convocatoria.conSecuencia = valorseq; 
          this.convocatoria.conNombre = valnom;
        } 
      }
    )
  }

  public createConvocatoria(): boolean {
    let validacion:boolean = false;
    try {
      if (this.convocatoria.conNombre != null && this.convocatoria.conNombre != "") {
        if(this.convocatoria.conNumeroTema == null || this.convocatoria.conNumeroTema <= 0){
          
          this.convocatoriaService.create(this.convocatoria).subscribe( 
            response => {
              if(response){
                if (this.convocatoria.conActivo == true) {
                  //notificacionGlobal("Notificaciones", "Se habilito una convocatoria para registrar temas.", "/convocatoriatema");
                }
                // this.enconfigura = new Sysconfiguracion();
                // this.enconfigura.confEstado = this.convocatoria.conActivo
                // let pkconv:String = "" + this.convocatoria.idCon;
                // this.enconfigura.confCampo = this.PARTE_CONV + "" + pkconv;
                // this.enconfigura.confValor = pkconv;
                // this.enconfigura.confTipo = this.CONFIG_TIPO;
                // this.enconfigura.confActivo = true;
                // this.sysconfiguracionService.create(this.enconfigura).subscribe( 
                //   response2 => {
                //     if(response2){
                //     }
                //   }
                // );
                $('#dialogUtesConfiguracion').dialog('close');
                swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_OK_REGISTRA, 'success');
                this.router.navigate(['/dashboard/utesconfiguracion']);
                validacion = true;
              } else {
                swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_ERROR_REGISTRA, 'warning');
              }
            }
          );
        } else {
          swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_ERROR_REGISTRA_CERO, 'warning');
        }        
      } 
    } catch (error) {
      console.error('Here is the error message', error);
      return false;
    }
    return validacion;
  }

}

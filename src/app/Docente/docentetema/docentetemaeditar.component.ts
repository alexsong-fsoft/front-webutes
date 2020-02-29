import { Component, OnInit, Input } from '@angular/core';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { UserService } from 'src/app/login/user.service';
import { Router } from '@angular/router';
import { Sysusuario } from 'src/app/sysusuario/sysusuario';
import { TemaService } from 'src/app/tema/tema.service';
import { Tema } from 'src/app/tema/tema';
import { Tipo } from 'src/app/tipo/Tipo';
import { Estaticos } from 'src/app/app.constants';
import swal from 'sweetalert2';
import Lang from '../../../assets/app.lang.json';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  //selector: 'app-docentetemaeditar',
  templateUrl: './docentetemaeditar.component.html'
})
export class DocentetemaeditarComponent implements AdComponent {
  @Input() data: any;
  public usserLogged: Sysusuario = null;
  private tema: Tema = new Tema();
  private listTipoTema: Tipo[];

  constructor(private userService: UserService,
    private temaService: TemaService, 
    private router: Router) { }

  ngOnInit() {
    this.usserLogged = this.userService.getUserLoggedIn();
    this.load();
  }

  public load(): void {
    this.listTipoTema = Tipo.getListTipoTema();
    let id = this.data.idTema;
    if (id) {
      this.temaService.getById(id).subscribe(
        (tema) => {
          if (tema != null) {
            this.tema = tema; 
          } 
        }
      )
    }
  }

  public create(): boolean {
    let validacion:boolean = false;
    try {
      if (this.tema.temNumEst != null && this.tema.temNumEst != 0) {
        this.temaService.getByNombreTema(this.tema.temNombre).subscribe(
          (auxtema) => {
            if (auxtema != null) {
              swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_ERROR_EXISTE, 'error');
            }else{
              let utilfecha = new Date();
              let nuevotema = new Tema();
              nuevotema.idPersona = this.usserLogged.persona.idPer; //(daopersona.obtenerPersonaPorCedula(enpersonasesion.getPerCedula()));
              nuevotema.temNombre = this.tema.temNombre.toUpperCase().trim();
              nuevotema.temDescripcion = this.tema.temDescripcion.toUpperCase().trim();
              nuevotema.temNumEst = this.tema.temNumEst;
              nuevotema.temFechaCreado = utilfecha;
              nuevotema.temIdTipo = this.tema.temIdTipo;
              nuevotema.temIdEstado = Estaticos.ESTADO_TEMA_PRE_CREADO;
              nuevotema.temActivo = true;
              nuevotema.temAuspiciante = this.tema.temAuspiciante.toUpperCase().trim();
              nuevotema.temObservacion =this.tema.temObservacion.toUpperCase().trim();
              nuevotema.temFechaEditado = utilfecha;
              this.temaService.create(nuevotema).subscribe( 
                response => {
                  if(response){
                    $('#dialog').dialog('close');
                    swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'success');
                    this.router.navigate(['/dashboard/docentetema'])
                    this.tema = null;
                    validacion = true;
                  }else{
                    swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'error');
                  }
                }
              )
            }
          }
        );       
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
      this.temaService.getById(this.tema.idTem).subscribe(
        (auxtema) => {
          if (auxtema != null) {
            auxtema.temIdTipo = this.tema.temIdTipo;
            auxtema.temNombre = this.tema.temNombre;
            auxtema.temDescripcion = this.tema.temDescripcion;
            auxtema.temAuspiciante = this.tema.temAuspiciante;
            auxtema.temObservacion = this.tema.temObservacion;
            auxtema.temNumEst = this.tema.temNumEst;
            this.temaService.update(auxtema).subscribe( 
              response => {
                if(response){
                  $('#dialog').dialog('close');
                  swal.fire(Lang.messages.register_update, Lang.messages.register_updated, 'success');
                  this.router.navigate(['/dashboard/docentetema'])
                  this.tema = null;
                  validacion = true;
                }else{
                  swal.fire(Lang.messages.register_update, Lang.messages.register_not_saved, 'error');
                }
              }
            )
          } else {
            swal.fire(Lang.messages.register_update, Lang.messages.register_not_saved, 'error');
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

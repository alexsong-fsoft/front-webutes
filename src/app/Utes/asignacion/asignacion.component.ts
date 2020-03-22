import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { AdDirective } from 'src/app/Estudiante/estudiantetema/ad.directive';
import { Sysusuario } from 'src/app/sysusuario/sysusuario';
import { Tema } from 'src/app/tema/tema';
import { AsignadoService } from 'src/app/asignado/asignado.service';
import { TemaService } from 'src/app/tema/tema.service';
import { UserService } from 'src/app/login/user.service';
import { AdItem } from 'src/app/Estudiante/estudiantetema/ad-item';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { Estaticos } from 'src/app/app.constants';
import { AsignaciondetalleComponent } from './asignaciondetalle.component';
import { PageRender } from 'src/app/Page/pagerender';
import { UtesasignacionrevisordialogComponent } from './utesasignacionrevisordialog.component';
import swal from 'sweetalert2';
import Lang from '../../../assets/app.lang.json';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html'
})
export class AsignacionComponent implements OnInit {
  private titulo: string = "Gestión de Temas";
  public usserLogged: Sysusuario = null;
  listUtesEnviados: Tema[];
  listComisionPublicado: Tema[];
  listUtesAprobados: Tema[];
  listUtesEnviadosSeleccion: number[] = [];
  pageRender: PageRender<Tema>;
  pageRender2: PageRender<Tema>;
  pageRender3: PageRender<Tema>;

  @ViewChild(AdDirective, {static: true}) adHost: AdDirective;

  constructor(private userService: UserService,
    private temaService: TemaService, 
    private componentFactoryResolver: ComponentFactoryResolver,
    private asignadoService: AsignadoService) { }

  ngOnInit() {
    this.usserLogged = this.userService.getUserLoggedIn();
    this.getListUtesEnviados(0);
    this.getListComisionPublicado(0);
    this.getListUtesAprobados(0);
    $("#tabs_docentetema").tabs();
    this.showTab('tab-mistemas');
    setTimeout(function () {
      Gestor.fn.initForms();
    }, 1000);
  }

  getListUtesEnviados(page:number): Tema[] {
    let estadoslst: string = Estaticos.ESTADO_TEMA_PRE_ENVIADO + "," + Estaticos.ESTADO_TEMA_PRE_ASIGNAREVISOR + "," + Estaticos.ESTADO_TEMA_PRE_REVISION + "," + Estaticos.ESTADO_TEMA_PRE_REVISADO;
    //let page:number = 0;
    this.temaService.getAllByEstadoPageable(estadoslst, page).subscribe(
      response => {
        this.listUtesEnviados = response.content;
        this.pageRender = new PageRender("/dashboard/utespresolicitud", response);          
      }
    );
    return this.listUtesEnviados;
  }

  getListComisionPublicado(page:number): Tema[] {
    let estadoslst: string = Estaticos.ESTADO_TEMA_PRE_PUBLICADO.toString();
    this.temaService.getAllByEstadoPageable(estadoslst, page).subscribe(
      response => {
        this.listComisionPublicado = response.content;
        this.pageRender2 = new PageRender("/dashboard/utespresolicitud", response);          
      }
    );
    return this.listComisionPublicado;
  }

  getListUtesAprobados(page:number): Tema[] {
    let estadoslst: string = Estaticos.ESTADO_TEMA_PRE_ASIGNAESTUDIANTE + "," + Estaticos.ESTADO_TEMA_PRE_ASIGNALECTOR;
    this.temaService.getAllByEstadoPageable(estadoslst, page).subscribe(
      response => {
        this.listUtesAprobados = response.content;
        this.pageRender3 = new PageRender("/dashboard/utespresolicitud", response);          
      }
    );
    return this.listUtesAprobados;
  }
  
  public showTab(tabid: String){
    $('#tabs_docentetema .tab-pane').hide();
    $('#'+tabid).show();
  }

  habilitaBotonAsignarRevisor(idestado: number): boolean{
    try {
     if (idestado != Estaticos.ESTADO_TEMA_PRE_ENVIADO) {
      return true;
     }   
    } catch (error) {
      console.error('Here is the error message', error);
    }  
    return false;
   }

  loadComponent(idTema: number) {
    const adItem = new AdItem(AsignaciondetalleComponent, { idTema: idTema });
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }

  loadComponent2(idTema: number) {
    const adItem = new AdItem(UtesasignacionrevisordialogComponent, { idTema: idTema });
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }

  openDialog(tema: Tema): void {
    this.loadComponent(tema.idTem);
    $('#dialog').dialog({
      modal: true,
      minWidth: 800,
      resizable: false
    });
    Gestor.fn.positionDialog();
  }

  openDialog2(tema: Tema): void {
    this.loadComponent2(tema.idTem);
    $('#dialog').dialog({
      tittle: 'Asignación de revisor de tema',
      modal: true,
      minWidth: 800,
      resizable: false
    });
    Gestor.fn.positionDialog();
  }

  onChange(idTema: number, isChecked: boolean) {
    let selectedTema = this.listUtesEnviadosSeleccion;
    if (isChecked) {
      selectedTema.push(idTema);
    } else {
      selectedTema = this.listUtesEnviadosSeleccion.filter(item => item !== idTema);
    }
    this.listUtesEnviadosSeleccion = selectedTema;
  }


  updateTemaEstado() {
    let errores: String[] = [];
    let tematexto: String[] = [];     ;
    try {
      if(this.listUtesEnviadosSeleccion != null && this.listUtesEnviadosSeleccion.length > 0){
        this.listUtesEnviadosSeleccion.forEach(idTem => {
          this.temaService.getById(idTem).subscribe(
            (objtem) => {
              if (objtem != null) {
                if (objtem.temIdEstado == Estaticos.ESTADO_TEMA_PRE_REVISADO) {
                  let utilfecha = new Date();
                  objtem.temIdEstado = Estaticos.ESTADO_TEMA_PRE_PUBLICADO;
                  objtem.temFechaEnviado = utilfecha;
                  this.temaService.update(objtem).subscribe(
                    (response2) => {
                      if (response2) {
                        //notificacionGlobal("Notificaciones", "Tema publicado", "/temapublicado");
                        // if (daoconfigura.activaProcesoByCampo(CONFIG_TEMA_PUBLICACIONAUTOR)) {
                        //   SysUsuario auxus = daousuario.obtenerUsuarioPorPersonaId(objtema.getPersona().getIdPer());
                        //   utilcorreo.setDataUsuario(auxus, "Publicación tema", "Se ha publicado el tema:", objtema.getTemNombre());
                        //   utilcorreo.sendNotificaNuevo();
                        // }
                        tematexto.push("   " + objtem.temNombre + "\n");                                      
                      } else {
                        errores.push("" + objtem.idTem);
                      }
                    }
                  );
                  
                }
              } 
            }                
          )
        });
        
        if (errores.length == 0) {
          swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_OK_ACTUALIZA, 'success');
          //this.router.navigate(['/dashboard/docentetema'])
          // if (daoconfigura.activaProcesoByCampo(CONFIG_TEMA_ENVIADO)) {
          //   utilcorreo.setDataUsuario(enusuariosesion, "Envio de temas", "Se ha enviado los siguiente(s) tema(s) para su revisión:", tematexto.toString().replace('[', ' ').replace(']', ' '));
          //   utilcorreo.sendNotificaNuevo();
          // }
        } else {
          swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_ERROR_REGISTRA, 'error');
        }

      } else {
        swal.fire("", Estaticos.MENSAJE_ERROR_SELECCION, 'error');
      }
    } catch (error) {
      console.error('Here is the error message', error);
    }
  }
}

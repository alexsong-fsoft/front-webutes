import { Component, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, RouterEvent, NavigationEnd } from '@angular/router';
import { AdDirective } from 'src/app/Estudiante/estudiantetema/ad.directive';
import { TemaService } from 'src/app/tema/tema.service';
import { Tema } from 'src/app/tema/tema';
import { AsignadoService } from 'src/app/asignado/asignado.service';
import { Sysusuario } from 'src/app/sysusuario/sysusuario';
import { UserService } from 'src/app/login/user.service';
import { Asignado } from 'src/app/asignado/asignado';
import { Estaticos } from 'src/app/app.constants';
import { Estado } from 'src/app/estado/Estado';
import { AdItem } from 'src/app/Estudiante/estudiantetema/ad-item';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { DocentetemadetalleComponent } from './docentetemadetalle.component';
import { DocentetemaeditarComponent } from './docentetemaeditar.component';
import { Subject } from 'rxjs';
import { filter, pairwise, startWith, takeUntil } from 'rxjs/operators';
import { ConvocatoriaService } from 'src/app/convocatoria/convocatoria.service';
import swal from 'sweetalert2';
import Lang from '../../../assets/app.lang.json';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-docentetema',
  templateUrl: './docentetema.component.html'
})
export class DocentetemaComponent implements OnInit, OnDestroy {
  private tema: Tema = new Tema();
  private titulo: string = "Gestión de Temas";
  listDocente: Tema[];
  listTemaPost: Tema[];
  listTemaAsignaRevisar: Tema[];
  auxent: Asignado[];  
  private listTemaSeleccion: number[] = [];
  public usserLogged: Sysusuario = null;
  public destroyed = new Subject<any>();

  @ViewChild(AdDirective, {static: true}) adHost: AdDirective;
  
  constructor(private userService: UserService,
    private temaService: TemaService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private asignadoService: AsignadoService,
    private convocatoriaService: ConvocatoriaService) { }

  ngOnInit() {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      pairwise(),
      filter((events: RouterEvent[]) => events[0].url === events[1].url),
      startWith('initial call'),
      takeUntil(this.destroyed)
    ).subscribe(() => {
      this.usserLogged = this.userService.getUserLoggedIn();
      this.getListDocente();
      this.getListTemaPost();
      this.getListTemaAsignaRevisar();
      $("#tabs_docentetema").tabs();
      this.showTab('tab-mistemas');
      setTimeout(function () {
        Gestor.fn.initForms();
      }, 1000);
    })
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  onChange(idTema: number, isChecked: boolean) {
    let selectedTema = this.listTemaSeleccion;
    if (isChecked) {
      selectedTema.push(idTema);
    } else {
      selectedTema = this.listTemaSeleccion.filter(item => item !== idTema);
    }
    this.listTemaSeleccion = selectedTema;
  }

  getListDocente(): Tema[] {
    let estados: Estado[] = Estado.loadPreTema();
    let estadoslst: String = Estado.listaCedena(estados);
    this.temaService.getAllByUsuarioEstados(this.usserLogged.usrUsuario, estadoslst).subscribe(
      (temas: Tema[]) => {
        this.listDocente = temas;
      }
    );
    return this.listDocente;
  }

  getListTemaPost(): Tema[] {
    let estados: Estado[] = Estado.loadPostTema();
    let estadoslst: String = Estado.listaCedena(estados);
    this.temaService.getAllByUsuarioEstados(this.usserLogged.usrUsuario, estadoslst).subscribe(
      (temas: Tema[]) => {
        this.listTemaPost = temas;
      }
    );
    return this.listTemaPost;
  }

  getListTemaAsignaRevisar(): Tema[] {
    let codigos: String = "";
    let c: number = 0;
    this.asignadoService.getByIdPersonaAsgIdTipoList(this.usserLogged.idPersona, Estaticos.TIPO_ID_ASIGNACION_REVISOR).subscribe(
      (asignado) => {
        this.auxent = asignado;
        if (this.auxent != null && this.auxent.length > 0) {
          for (let obja of this.auxent) {
            if (obja != null) {
              codigos = codigos + obja.tema.idTem.toString();
              c++;
              if (c < this.auxent.length) {
                codigos = codigos + ",";
              }
            }
          }
          if (codigos.length != 0) {
            this.temaService.getByTemasPk2(codigos).subscribe(
              (temas: Tema[]) => {
                this.listTemaAsignaRevisar = temas;
              }
            );
          }
        } 
      }
    );
    return this.listTemaAsignaRevisar;
  }
  
  public showTab(tabid: String){
    $('#tabs_docentetema .tab-pane').hide();
    $('#tabs_docentetema #'+tabid).show();
  }

  loadComponent(idTema: number) {
    const adItem = new AdItem(DocentetemadetalleComponent, { idTema: idTema });
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }

  loadComponent2(idTema: number) {
    const adItem = new AdItem(DocentetemaeditarComponent, { idTema: idTema });
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }

  updateTemaAddConvocatoria() {
    let errores: String[] = [];
    let tematexto: String[] = [];     ;
    try {
      this.convocatoriaService.getUltimoRegistroConvocatoria().subscribe(
        (idlastconv) => {
          if (idlastconv != null) {
            this.convocatoriaService.getByIdActivo(idlastconv).subscribe(
              (enconvocatoriaseleccion) => {
                if (enconvocatoriaseleccion != null) {
                  if(this.listTemaSeleccion != null && this.listTemaSeleccion.length > 0){
                    this.listTemaSeleccion.forEach(idTem => {
                      this.temaService.getById(idTem).subscribe(
                        (objtem) => {
                          if (objtem != null) {
                            if (objtem.temIdEstado == Estaticos.ESTADO_TEMA_PRE_CREADO || objtem.temIdEstado == Estaticos.ESTADO_TEMA_PRE_REVISION) {
                              if (objtem.convocatoria == null) {
                                let utilfecha = new Date();
                                objtem.convocatoria = enconvocatoriaseleccion;
                                objtem.temIdEstado = Estaticos.ESTADO_TEMA_PRE_ENVIADO;
                                objtem.temFechaEnviado = utilfecha;
                                this.temaService.update(objtem).subscribe(
                                  (response2) => {
                                    if (response2) {
                                      //notificacionGlobal("Notificaciones", "Temas registrados en convocatoria actual", "/temaconvocatoria");
                                      //notificacionGlobal("Notificaciones", "Existen nuevos temas enviados", "/temaenviado");
                                      tematexto.push("   " + objtem.temNombre + "\n");                                      
                                    } else {
                                      errores.push("" + objtem.idTem);
                                    }
                                  }
                                );
                              }
                            }
                          } 
                        }                
                      )
                    });
                    
                    if (errores.length == 0) {
                      swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_OK_ACTUALIZA, 'success');
                      this.router.navigate(['/dashboard/docentetema'])
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
                } else {
                  swal.fire("", Estaticos.MENSAJE_ERROR_EXISTE_CONVOCATORIA, 'error');
                }
              }
            )
          } 
        }
      )

      
        
          
    } catch (error) {
      console.error('Here is the error message', error);
    }
  }

  openDialog(tema: Tema): void {
    this.loadComponent(tema.idTem);
    $('#dialog').dialog({
      modal: true,
      minWidth: 1000,
      resizable: false
    });
    Gestor.fn.positionDialog();
  }

  openDialog2(tema: Tema): void {
    this.loadComponent2(tema.idTem);
    $('#dialog').dialog({
      title: 'Datos Tema', 
      modal: true,
      minWidth: 800,
      resizable: false
    });
    Gestor.fn.positionDialog();
  }

  openDialog3(): void {
    this.loadComponent2(null);
    $('#dialog').dialog({
      title: 'Registrar Tema', 
      modal: true,
      minWidth: 800,
      resizable: false
    });
    Gestor.fn.positionDialog();
  }

  habilitaBotonActualiza (estado: number): boolean {
    if (estado == Estaticos.ESTADO_TEMA_PRE_CREADO || estado == Estaticos.ESTADO_TEMA_PRE_REVISION) {
      return false;
    }
    return true;
  }

}

import { Component, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { Sysusuario } from 'src/app/sysusuario/sysusuario';
import { AdDirective } from 'src/app/Estudiante/estudiantetema/ad.directive';
import { Presolicitud } from 'src/app/presolicitud/presolicitud';
import { UserService } from 'src/app/login/user.service';
import { PresolicitudService } from 'src/app/presolicitud/presolicitud.service';
import { AdItem } from 'src/app/Estudiante/estudiantetema/ad-item';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { UtespresolicitudvalidarespuestadialogComponent } from './utespresolicitudvalidarespuestadialog.component';
import { Estaticos } from 'src/app/app.constants';
import { UtespresolicituddetalledialogComponent } from './utespresolicituddetalledialog.component';
import { AdDirectivePaginator } from 'src/app/Estudiante/estudiantetema/ad.directivepaginator';
import { PageRender } from 'src/app/Page/pagerender';
import { PaginatorComponent } from 'src/app/paginator/paginator.component';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, pairwise, startWith, takeUntil } from 'rxjs/operators';
import { Respuesta } from 'src/app/respuesta/respuesta';
import { Estado } from 'src/app/estado/Estado';
import { Cuestionario } from 'src/app/cuestionario/cuestionario';
import { RespuestaService } from 'src/app/respuesta/respuesta.service';
import swal from 'sweetalert2';
import Lang from '../../../assets/app.lang.json';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-utespresolicitud',
  templateUrl: './utespresolicitud.component.html'
})
export class UtespresolicitudComponent implements OnInit, OnDestroy {
  private listPresolicitud: Presolicitud[] = [];
  private pageRender: PageRender<Presolicitud>;
  private presolicitud: Presolicitud = new Presolicitud();
  private presolicitudRespuestas: Respuesta[] = null;
  private listEstadoPresolicitudAccion: Estado[];
  private listCuestionarioSeleccion: number[] = [];
  private listCuestionario: Cuestionario[];


  public usserLogged: Sysusuario = null;
  public destroyed = new Subject<any>();
  
  @ViewChild(AdDirective, {static: true}) adHost: AdDirective;
  @ViewChild(AdDirectivePaginator, {static: true}) adHostPag: AdDirectivePaginator;

  constructor(private presolicitudService: PresolicitudService, 
    private respuestaService: RespuestaService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router) { }

  ngOnInit() {
    this.listPresolicitud = [];
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      pairwise(),
      filter((events: RouterEvent[]) => events[0].url === events[1].url),
      startWith('initial call'),
      takeUntil(this.destroyed)
    ).subscribe(() => {
      console.log('reinicia.....');
      this.usserLogged = this.userService.getUserLoggedIn();
      this.loadPresolicitudes();
      setTimeout(function () {
        Gestor.fn.initForms();
      }, 300);
    })    
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  loadPresolicitudes(): void {
    this.activatedRoute.params.subscribe(params => {
      let page = params['page']
      page = page ? page : 0;
      this.presolicitudService.getAllPageable(page).subscribe(
        response => {
          this.listPresolicitud = response.content;
          this.pageRender = new PageRender("/dashboard/utespresolicitud", response);
          const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PaginatorComponent);
          const viewContainerRef = this.adHostPag.viewContainerRef;
          viewContainerRef.clear();
          const componentRef = viewContainerRef.createComponent(componentFactory);
          (componentRef.instance).pageRender = this.pageRender;
        }
      );
    });
  }

  loadComponent(idPsl: number) {
    const adItem = new AdItem(UtespresolicituddetalledialogComponent, { idPsl: idPsl });
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }
  
  nuevaPresolicitud(idPsl: number): void {
    Gestor.fn.destroyDialog('dialogUtesPresolicitud');
    this.loadComponent(idPsl);
    $('#dialogUtesPresolicitud').dialog({
      title: 'Detalle', 
      modal: true,
      minWidth: 800,
      resizable: false
    });
    Gestor.fn.positionDialog();
  }

  loadComponent2(idPsl: number) {
    // const adItem = new AdItem(UtespresolicitudvalidarespuestadialogComponent, { idPsl: idPsl });
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    // const viewContainerRef = this.adHost.viewContainerRef;
    // viewContainerRef.clear();
    // const componentRef = viewContainerRef.createComponent(componentFactory);
    // (<AdComponent>componentRef.instance).data = adItem.data;
    this.presolicitud = new Presolicitud();
    this.listCuestionarioSeleccion = [];
    if (idPsl) {
      this.presolicitudService.getById(idPsl).subscribe((presolicitud) => this.presolicitud = presolicitud)
      this.respuestaService.getAllByIdPresolicitud(idPsl).subscribe((respuestas) => this.presolicitudRespuestas = respuestas)
    }
    this.listEstadoPresolicitudAccion = Estado.loadInscripcionAccion();
  }
  
  validarRespuesta(idPsl: number): void {
    Gestor.fn.destroyDialog('dialogUtesValidar');
    this.loadComponent2(idPsl);
    $('#dialogUtesValidar').dialog({
      title: 'Validación de inscripción', 
      modal: true,
      minWidth: 800,
      resizable: false
    });
    Gestor.fn.positionDialog();
    $('#dialogUtesValidar div.dialog-content').show();
  }

  habilitaBotonEditaPresolicitud(idestado: number): boolean{
    try {
     if (idestado != Estaticos.ESTADO_PRESOLICITUD_ENVIADO) {
      //deshabilito boton
      return true;
     }   
    } catch (error) {
      console.error('Here is the error message', error);
    }  
    return false;
   }

   onChange(idcue: number, isChecked: boolean) {
    let selectedCuestionario = this.listCuestionarioSeleccion;
    if (isChecked) {
      selectedCuestionario.push(idcue);
    } else {
      selectedCuestionario = this.listCuestionarioSeleccion.filter(item => item !== idcue);
    }
    this.listCuestionarioSeleccion = selectedCuestionario;
    console.log(selectedCuestionario);
  }

  public verificaSeleccionRequisitos(): boolean {
    let valida: boolean = true;
    try {
      if (this.presolicitud.pslIdOpcion == null || this.presolicitud.pslIdOpcion == 0) {
        swal.fire("Campos imcompletos", "Seleccione una Opción de Titulación", 'warning');
        return false;
      }
      if (this.listCuestionario != null && this.listCuestionarioSeleccion != null) {
        if (this.listCuestionario.length != this.listCuestionarioSeleccion.length) {
          swal.fire("Campos imcompletos", "No puede seguir con el proceso de inscripción debido a que es necesario cumplir con todos los requisitos", 'warning');
          return false;
        }
      }
    } catch (error) {
      console.error('Here is the error message', error);
      return false;
    }
    return valida;
  }

  public updateRespuesta(): void {
    let validacion: boolean = false;
    try {
      if (this.presolicitud != null) {
        let errores: String[] = [];
        this.presolicitudService.getById(this.presolicitud.idPsl).subscribe(
          (presolicitudResp) => {
            let auxpresolicitud = presolicitudResp;
            auxpresolicitud.pslIdEstado = this.presolicitud.pslIdEstado;
            auxpresolicitud.pslObservacion = this.presolicitud.pslObservacion;
            this.presolicitudService.update(auxpresolicitud).subscribe(
              (response) => {
                if (response) {
                  if (this.presolicitudRespuestas != null) {
                    this.presolicitudRespuestas.forEach(objres => {
                      objres.resValidacion = true;
                      this.respuestaService.update(objres).subscribe(
                        (response2) => {
                          if (response2) {
                          } else {
                            errores.push("Error" + objres);
                          }
                        }
                      );
                    });
                  }
                  if (errores.length == 0) {
                    $('#dialogUtesValidar').dialog('close');
                    swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_OK_ACTUALIZA, 'success');
                    //this.router.navigate(['/dashboard/utespresolicitud']);
                    this.ngOnInit();
                  } else {
                    swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_ERROR_ACTUALIZA, 'error');
                  }                 
                } else {
                  swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_ERROR_ACTUALIZA, 'error');
                }
              }
            );
          }
        );
      } else {
        swal.fire(Lang.messages.register_new, Estaticos.MENSAJE_ERROR_SELECCION, 'error');
      }
    } catch (error) {
      console.error('Here is the error message', error);
    }
  }
}

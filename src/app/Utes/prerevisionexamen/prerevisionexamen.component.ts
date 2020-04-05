import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Sysusuario } from 'src/app/sysusuario/sysusuario';
import { AdDirective } from 'src/app/Estudiante/estudiantetema/ad.directive';
import { UserService } from 'src/app/login/user.service';
import { Estaticos } from 'src/app/app.constants';
import { Presolicitud } from 'src/app/presolicitud/presolicitud';
import { PresolicitudService } from 'src/app/presolicitud/presolicitud.service';
import { PersonaService } from 'src/app/persona/persona.service';
import { AdItem } from 'src/app/Estudiante/estudiantetema/ad-item';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { PrerevisionexamendetalleComponent } from './prerevisionexamendetalle.component';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-prerevisionexamen',
  templateUrl: './prerevisionexamen.component.html'
})
export class PrerevisionexamenComponent implements OnInit {
  titulo: string = "Revisión Previa";
  listEstudiantesExamen: Presolicitud[];
  public usserLogged: Sysusuario = null;
  
  @ViewChild(AdDirective, {static: true}) adHost: AdDirective;

  constructor(private presolicitudService: PresolicitudService, 
    private personaService: PersonaService,
    private userService: UserService,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.usserLogged = this.userService.getUserLoggedIn();
    this.getListEstudiantesExamen();
  }

  getListEstudiantesExamen(): Presolicitud[] {
    this.presolicitudService.getAllByOpcionEstado(Estaticos.TIPO_ID_OPCIONTITULACION_EXAMEN, Estaticos.ESTADO_PRESOLICITUD_APROBADO + "," + Estaticos.ESTADO_PRESOLICITUD_ENLISTAESPERA).subscribe(
      (presolicituds: Presolicitud[]) => {
        this.listEstudiantesExamen = presolicituds;
      }
    );
    return this.listEstudiantesExamen;
  }

  loadComponent(idPsl: number) {
    const adItem = new AdItem(PrerevisionexamendetalleComponent, { idPsl: idPsl });
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }
  
  openDialog(idPsl: number): void {
    this.loadComponent(idPsl);
    $('#dialog').dialog({
      title: 'Detalle', 
      modal: true,
      minWidth: 800,
      resizable: false
    });
    Gestor.fn.positionDialog();
  }

  habilitaBotonEditaPresolicitudExamen(idestado: number): boolean{
    try {
     if (idestado == Estaticos.ESTADO_PRESOLICITUD_APROBADO || idestado == Estaticos.ESTADO_PRESOLICITUD_ENLISTAESPERA) {
      return false;
     } else {
       return true;
     }
    } catch (error) {
      console.error('Here is the error message', error);
    }  
    return false;
   }
}

import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { AdDirective } from 'src/app/Estudiante/estudiantetema/ad.directive';
import { Tema } from 'src/app/tema/tema';
import { Sysusuario } from 'src/app/sysusuario/sysusuario';
import { UserService } from 'src/app/login/user.service';
import { TemaService } from 'src/app/tema/tema.service';
import { Estado } from 'src/app/estado/Estado';
import { AdItem } from 'src/app/Estudiante/estudiantetema/ad-item';
import { AdComponent } from 'src/app/Estudiante/estudiantetema/ad.component';
import { DocentetemadetalleComponent } from 'src/app/Docente/docentetema/docentetemadetalle.component';
import { AdministradorpermisodetalleComponent } from './administradorpermisodetalle.component';
import { Sysperfil } from 'src/app/sysperfil/sysperfil';
import { SysperfilService } from 'src/app/sysperfil/sysperfil.service';
import { Syspagina } from 'src/app/syspagina/syspagina';
import { SyspaginaService } from 'src/app/syspagina/syspagina.service';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-administradorpermiso',
  templateUrl: './administradorpermiso.component.html'
})
export class AdministradorpermisoComponent implements OnInit {
  private titulo: string = "Gestión de Temas";
  sysperfiles : Sysperfil[];
  syspaginas : Syspagina[];
  public usserLogged: Sysusuario = null;

  @ViewChild(AdDirective, {static: true}) adHost: AdDirective;

  constructor(private userService: UserService,
    private sysperfilService: SysperfilService,
    private syspaginaService: SyspaginaService,
    private componentFactoryResolver: ComponentFactoryResolver) { }
  
  ngOnInit() {
    this.usserLogged = this.userService.getUserLoggedIn();
    this.onLoad();
    $("#tabs_docentetema").tabs();
    this.showTab('tab-perfil');
  }

  onLoad(): void {
    this.sysperfilService.getAll().subscribe(
      sysperfiles => this.sysperfiles = sysperfiles
    );
    this.syspaginaService.getAll().subscribe(
      syspaginas => this.syspaginas = syspaginas
    );
  }

  public showTab(tabid: String){
    $('#tabs_docentetema .tab-pane').hide();
    $('#'+tabid).show();
  }

  loadComponent(idTema: number) {
    const adItem = new AdItem(AdministradorpermisodetalleComponent, { idTema: idTema });
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
      minWidth: 1000,
      resizable: false
    });
    Gestor.fn.positionDialog();
  }
}

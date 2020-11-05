import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { AreatipoComponent } from './areatipo/areatipo.component';
import { AreatipoService } from './areatipo/areatipo.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './areatipo/form.component';
import { FormsModule } from '@angular/forms';
import { AreaComponent } from './area/area.component';
import { FormareaComponent } from './area/formarea.component';
import { AreaService } from './area/area.service';
import { AreapersonaComponent } from './areapersona/areapersona.component';
import { FormareapersonaComponent } from './areapersona/formareapersona.component';
import { AreapersonaService } from './areapersona/areapersona.service';
import { AsignadoComponent } from './asignado/asignado.component';
import { FormasignadoComponent } from './asignado/formasignado.component';
import { TemaComponent } from './tema/tema.component';
import { FormtemaComponent } from './tema/formtema.component';
import { ConvocatoriaComponent } from './convocatoria/convocatoria.component';
import { FormconvocatoriaComponent } from './convocatoria/formconvocatoria.component';
import { PersonaComponent } from './persona/persona.component';
import { FormpersonaComponent } from './persona/formpersona.component';
import { AsignadoService } from './asignado/asignado.service';
import { ConvocatoriaService } from './convocatoria/convocatoria.service';
import { CorreoComponent } from './correo/correo.component';
import { FormcorreoComponent } from './correo/formcorreo.component';
import { CorreoService } from './correo/correo.service';
import { CuestionarioComponent } from './cuestionario/cuestionario.component';
import { FormcuestionarioComponent } from './cuestionario/formcuestionario.component';
import { RespuestaComponent } from './respuesta/respuesta.component';
import { FormrespuestaComponent } from './respuesta/formrespuesta.component';
import { PresolicitudComponent } from './presolicitud/presolicitud.component';
import { FormpresolicitudComponent } from './presolicitud/formpresolicitud.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { ForminscripcionComponent } from './inscripcion/forminscripcion.component';
import { CuestionarioService } from './cuestionario/cuestionario.service';
import { EvolucionComponent } from './evolucion/evolucion.component';
import { FormevolucionComponent } from './evolucion/formevolucion.component';
import { EvolucionService } from './evolucion/evolucion.service';
import { InformeComponent } from './informe/informe.component';
import { ForminformeComponent } from './informe/forminforme.component';
import { HitoComponent } from './hito/hito.component';
import { FormhitoComponent } from './hito/formhito.component';
import { ResolucionComponent } from './resolucion/resolucion.component';
import { FormresolucionComponent } from './resolucion/formresolucion.component';
import { TiporesolucionComponent } from './tiporesolucion/tiporesolucion.component';
import { FormtiporesolucionComponent } from './tiporesolucion/formtiporesolucion.component';
import { SeleccionComponent } from './seleccion/seleccion.component';
import { FormseleccionComponent } from './seleccion/formseleccion.component';
import { PeriodoComponent } from './periodo/periodo.component';
import { FormperiodoComponent } from './periodo/formperiodo.component';
import { SysusuarioComponent } from './sysusuario/sysusuario.component';
import { FormsysusuarioComponent } from './sysusuario/formsysusuario.component';
import { SysperfilComponent } from './sysperfil/sysperfil.component';
import { FormsysperfilComponent } from './sysperfil/formsysperfil.component';
import { SyspaginaperfilComponent } from './syspaginaperfil/syspaginaperfil.component';
import { FormsyspaginaperfilComponent } from './syspaginaperfil/formsyspaginaperfil.component';
import { SyspaginaComponent } from './syspagina/syspagina.component';
import { FormsyspaginaComponent } from './syspagina/formsyspagina.component';
import { SyspermisoComponent } from './syspermiso/syspermiso.component';
import { FormsyspermisoComponent } from './syspermiso/formsyspermiso.component';
import { HistoricoComponent } from './historico/historico.component';
import { FormhistoricoComponent } from './historico/formhistorico.component';
import { SysconfiguracionComponent } from './sysconfiguracion/sysconfiguracion.component';
import { FormsysconfiguracionComponent } from './sysconfiguracion/formsysconfiguracion.component';
import { SyspropiedadComponent } from './syspropiedad/syspropiedad.component';
import { FormsyspropiedadComponent } from './syspropiedad/formsyspropiedad.component';
import { TipoopcionComponent } from './tipoopcion/tipoopcion.component';
import { FormtipoopcionComponent } from './tipoopcion/formtipoopcion.component';
import { HistoricoService } from './historico/historico.service';
import { HitoService } from './hito/hito.service';
import { InformeService } from './informe/informe.service';
import { InscripcionService } from './inscripcion/inscripcion.service';
import { PeriodoService } from './periodo/periodo.service';
import { PresolicitudService } from './presolicitud/presolicitud.service';
import { PersonaService } from './persona/persona.service';
import { ResolucionService } from './resolucion/resolucion.service';
import { RespuestaService } from './respuesta/respuesta.service';
import { SeleccionService } from './seleccion/seleccion.service';
import { SysconfiguracionService } from './sysconfiguracion/sysconfiguracion.service';
import { SyspaginaperfilService } from './syspaginaperfil/syspaginaperfil.service';
import { SyspaginaService } from './syspagina/syspagina.service';
import { SysperfilService } from './sysperfil/sysperfil.service';
import { SyspermisoService } from './syspermiso/syspermiso.service';
import { SyspropiedadService } from './syspropiedad/syspropiedad.service';
import { SysusuarioService } from './sysusuario/sysusuario.service';
import { TemaService } from './tema/tema.service';
import { TipoopcionService } from './tipoopcion/tipoopcion.service';
import { TiporesolucionService } from './tiporesolucion/tiporesolucion.service';
import { EstudiantetemaComponent } from './Estudiante/estudiantetema/estudiantetema.component';
import { FormestudiantetemaComponent } from './Estudiante/estudiantetema/formestudiantetema.component';
import { LoginComponent } from './login/login.component';
import { CommonModule, DatePipe } from '@angular/common';
import { HeroJobAdComponent } from './Estudiante/estudiantetema/hero-job-ad.component';
import { HeroProfileComponent } from './Estudiante/estudiantetema/hero-profile.component';
import { AdDirective } from './Estudiante/estudiantetema/ad.directive';
import { AdService } from './Estudiante/estudiantetema/ad.service';
import { AdBannerComponent } from './Estudiante/estudiantetema/ad-banner.component';
import { EstudianteinscripcionComponent } from './Estudiante/estudianteinscripcion/estudianteinscripcion.component';
import { EstudianteinscripcionDialogComponent } from './Estudiante/estudianteinscripcion/estudianteinscripciondialog.component';
import { EstudianteevolucionComponent } from './Estudiante/estudianteevolucion/estudianteevolucion.component';
import { EstudianteevolucionDialogComponent } from './Estudiante/estudianteevolucion/estudianteevoluciondialog.component';
import { EstudianteevolucionDetalleComponent } from './Estudiante/estudianteevolucion/estudianteevoluciondetalle.component';
import { EstudianteevolucionDesarrolloComponent } from './Estudiante/estudianteevolucion/estudianteevoluciondesarrollo.component';
import { Estudianteevoluciondialog2Component } from './Estudiante/estudianteevolucion/estudianteevoluciondialog2.component';
import { EstudianteevoluciondialogeditarComponent } from './Estudiante/estudianteevolucion/estudianteevoluciondialogeditar.component';
import { EstudiantehitoComponent } from './Estudiante/estudiantehito/estudiantehito.component';
import { EstudiantehitoDesarrolloComponent } from './Estudiante/estudiantehito/estudiantehitodesarrollo.component';
import { EstudiantehitodialogComponent } from './Estudiante/estudiantehito/estudiantehitodialog.component';
import { EstudiantehitodialogeditarComponent } from './Estudiante/estudiantehito/estudiantehitodialogeditar.component';
import { LoginService } from './login/login.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserService } from './login/user.service';
import { PaginatorComponent } from './paginator/paginator.component';
import { DocenteasignacionComponent } from './Docente/docenteasignacion/docenteasignacion.component';
import { DocenteevolucionComponent } from './Docente/docenteevolucion/docenteevolucion.component';
import { DocentehitoComponent } from './Docente/docentehito/docentehito.component';
import { DocentetemaComponent } from './Docente/docentetema/docentetema.component';
import { DocentetemadetalleComponent } from './Docente/docentetema/docentetemadetalle.component';
import { AdministradorcorreoComponent } from './Administrador/administradorcorreo/administradorcorreo.component';
import { AdministradorpermisoComponent } from './Administrador/administradorpermiso/administradorpermiso.component';
import { AdministradorconfiguracionComponent } from './Administrador/administradorconfiguracion/administradorconfiguracion.component';
import { AdministradorpermisodetalleComponent } from './Administrador/administradorpermiso/administradorpermisodetalle.component';
import { UtespresolicitudComponent } from './Utes/utespresolicitud/utespresolicitud.component';
import { AsignacionComponent } from './Utes/asignacion/asignacion.component';
import { PrerevisionComponent } from './Utes/prerevision/prerevision.component';
import { AprobarComponent } from './Utes/aprobar/aprobar.component';
import { UtesresolucionComponent } from './Utes/utesresolucion/utesresolucion.component';
import { PrerevisionexamenComponent } from './Utes/prerevisionexamen/prerevisionexamen.component';
import { UtesconfiguracionComponent } from './Utes/utesconfiguracion/utesconfiguracion.component';
import { UtesconsultaComponent } from './Utes/utesconsulta/utesconsulta.component';
import { UteshistoricoComponent } from './Utes/uteshistorico/uteshistorico.component';
import { AsignaciondetalleComponent } from './Utes/asignacion/asignaciondetalle.component';
import { DocentetemaeditarComponent } from './Docente/docentetema/docentetemaeditar.component';
import { DocenteevoluciondetalleComponent } from './Docente/docenteevolucion/docenteevoluciondetalle.component';
import { DocenteevolucionresoluciondialogComponent } from './Docente/docenteevolucion/docenteevolucionresoluciondialog.component';
import { DocenteevoluciondesarrolloComponent } from './Docente/docenteevolucion/docenteevoluciondesarrollo.component';
import { DocenteevoluciondialogComponent } from './Docente/docenteevolucion/docenteevoluciondialog.component';
import { DocenteevolucioneditardialogComponent } from './Docente/docenteevolucion/docenteevolucioneditardialog.component';
import { DocentehitodesarrolloComponent } from './Docente/docentehito/docentehitodesarrollo.component';
import { DocentehitodetalleComponent } from './Docente/docentehito/docentehitodetalle.component';
import { DocentehitoresoluciondialogComponent } from './Docente/docentehito/docentehitoresoluciondialog.component';
import { DocentehitodialogComponent } from './Docente/docentehito/docentehitodialog.component';
import { UtespresolicituddetalledialogComponent } from './Utes/utespresolicitud/utespresolicituddetalledialog.component';
import { UtespresolicitudvalidarespuestadialogComponent } from './Utes/utespresolicitud/utespresolicitudvalidarespuestadialog.component';
import { UtesasignacionrevisordialogComponent } from './Utes/asignacion/utesasignacionrevisordialog.component';
import { UtesresoluciondetalleComponent } from './Utes/utesresolucion/utesresoluciondetalle.component';
import { PrerevisionexamendetalleComponent } from './Utes/prerevisionexamen/prerevisionexamendetalle.component';
import { AdDirectivePaginator } from './Estudiante/estudiantetema/ad.directivepaginator';
import { EstudiantehitoDetalleComponent } from './Estudiante/estudiantehito/estudiantehitodetalle.component';
import { EstudiantehitodesarrolloDialogComponent } from './Estudiante/estudiantehito/estudiantehitodetalledialog.component';
import { UtesresoluciondesarrolloComponent } from './Utes/utesresolucion/utesresoluciondesarrollo.component';
import { UtesresoluciondialogComponentComponent } from './Utes/utesresolucion/utesresoluciondialog-component.component';
import { UtesresolucionnuevodialogComponent } from './Utes/utesresolucion/utesresolucionnuevodialog.component';
import { UtesconfiguracionnewperiodoComponent } from './Utes/utesconfiguracion/utesconfiguracionnewperiodo.component';
import { UtesconfiguracionnewconvocatoriaComponent } from './Utes/utesconfiguracion/utesconfiguracionnewconvocatoria.component';
import { UtesconfiguracionnewinscripcionComponent } from './Utes/utesconfiguracion/utesconfiguracionnewinscripcion.component';
import { UtesconfiguracionnewrequisitoComponent } from './Utes/utesconfiguracion/utesconfiguracionnewrequisito.component';
import { ReporteService } from './reporte/reporte.service';
import { LoginregisterComponent } from './login/loginregister.component';
import { TableModule } from 'primeng/table'

const routes: Routes = [
  //{path: '', redirectTo: '/login', pathMatch: 'full'},
  //{path: 'login', component: LoginComponent,  pathMatch: 'full'},
  { path: '', component: LoginComponent },
  { path: 'loginregister', component: LoginregisterComponent, pathMatch: 'full' },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'area', component: AreaComponent },
      { path: 'area/:page', component: AreaComponent },
      { path: 'area/form', component: FormareaComponent },
      { path: 'area/form/:id', component: FormareaComponent },
      { path: 'areapersona', component: AreapersonaComponent },
      { path: 'areapersona/form', component: FormareapersonaComponent },
      { path: 'areapersona/form/:id', component: FormareapersonaComponent },
      { path: 'areatipo', component: AreatipoComponent },
      { path: 'areatipo/form', component: FormComponent },
      { path: 'areatipo/form/:id', component: FormComponent },
      { path: 'asignado', component: AsignadoComponent },
      { path: 'asignado/form', component: FormasignadoComponent },
      { path: 'asignado/form/:id', component: FormasignadoComponent },
      { path: 'convocatoria', component: ConvocatoriaComponent },
      { path: 'convocatoria/form', component: FormconvocatoriaComponent },
      { path: 'convocatoria/form/:id', component: FormconvocatoriaComponent },
      { path: 'correo', component: CorreoComponent },
      { path: 'correo/form', component: FormcorreoComponent },
      { path: 'correo/form/:id', component: FormcorreoComponent },
      { path: 'cuestionario', component: CuestionarioComponent },
      { path: 'cuestionario/form', component: FormcuestionarioComponent },
      { path: 'cuestionario/form/:id', component: FormcuestionarioComponent },
      { path: 'evolucion', component: EvolucionComponent },
      { path: 'evolucion/form', component: FormevolucionComponent },
      { path: 'evolucion/form/:id', component: FormevolucionComponent },
      { path: 'historico', component: HistoricoComponent },
      { path: 'historico/form', component: FormhistoricoComponent },
      { path: 'historico/form/:id', component: FormhistoricoComponent },
      { path: 'hito', component: HitoComponent },
      { path: 'hito/form', component: FormhitoComponent },
      { path: 'hito/form/:id', component: FormhitoComponent },
      { path: 'informe', component: InformeComponent },
      { path: 'informe/form', component: ForminformeComponent },
      { path: 'informe/form/:id', component: ForminformeComponent },
      { path: 'inscripcion', component: InscripcionComponent },
      { path: 'inscripcion/form', component: ForminscripcionComponent },
      { path: 'inscripcion/form/:id', component: ForminscripcionComponent },
      { path: 'periodo', component: PeriodoComponent },
      { path: 'periodo/form', component: FormperiodoComponent },
      { path: 'periodo/form/:id', component: FormperiodoComponent },
      { path: 'persona', component: PersonaComponent },
      { path: 'persona/form', component: FormpersonaComponent },
      { path: 'persona/form/:id', component: FormpersonaComponent },
      { path: 'presolicitud', component: PresolicitudComponent },
      { path: 'presolicitud/form', component: FormpresolicitudComponent },
      { path: 'presolicitud/form/:id', component: FormpresolicitudComponent },
      { path: 'resolucion', component: ResolucionComponent },
      { path: 'resolucion/form', component: FormresolucionComponent },
      { path: 'resolucion/form/:id', component: FormresolucionComponent },
      { path: 'respuesta', component: RespuestaComponent },
      { path: 'respuesta/form', component: FormrespuestaComponent },
      { path: 'respuesta/form/:id', component: FormrespuestaComponent },
      { path: 'seleccion', component: SeleccionComponent },
      { path: 'seleccion/form', component: FormseleccionComponent },
      { path: 'seleccion/form/:id', component: FormseleccionComponent },
      { path: 'sysconfiguracion', component: SysconfiguracionComponent },
      { path: 'sysconfiguracion/form', component: FormsysconfiguracionComponent },
      { path: 'sysconfiguracion/form/:id', component: FormsysconfiguracionComponent },
      { path: 'syspaginaperfil', component: SyspaginaperfilComponent },
      { path: 'syspaginaperfil/form', component: FormsyspaginaperfilComponent },
      { path: 'syspaginaperfil/form/:id', component: FormsyspaginaperfilComponent },
      { path: 'syspagina', component: SyspaginaComponent },
      { path: 'syspagina/form', component: FormsyspaginaComponent },
      { path: 'syspagina/form/:id', component: FormsyspaginaComponent },
      { path: 'sysperfil', component: SysperfilComponent },
      { path: 'sysperfil/form', component: FormsysperfilComponent },
      { path: 'sysperfil/form/:id', component: FormsysperfilComponent },
      { path: 'syspermiso', component: SyspermisoComponent },
      { path: 'syspermiso/form', component: FormsyspermisoComponent },
      { path: 'syspermiso/form/:id', component: FormsyspermisoComponent },
      { path: 'syspropiedad', component: SyspropiedadComponent },
      { path: 'syspropiedad/form', component: FormsyspropiedadComponent },
      { path: 'syspropiedad/form/:id', component: FormsyspropiedadComponent },
      { path: 'sysusuario', component: SysusuarioComponent },
      { path: 'sysusuario/form', component: FormsysusuarioComponent },
      { path: 'sysusuario/form/:id', component: FormsysusuarioComponent },
      { path: 'tema', component: TemaComponent },
      { path: 'tema/form', component: FormtemaComponent },
      { path: 'tema/form/:id', component: FormtemaComponent },
      { path: 'tipoopcion', component: TipoopcionComponent },
      { path: 'tipoopcion/form', component: FormtipoopcionComponent },
      { path: 'tipoopcion/form/:id', component: FormtipoopcionComponent },
      { path: 'tiporesolucion', component: TiporesolucionComponent },
      { path: 'tiporesolucion/form', component: FormtiporesolucionComponent },
      { path: 'tiporesolucion/form/:id', component: FormtiporesolucionComponent },
      { path: 'estudiantetema', component: EstudiantetemaComponent },
      { path: 'estudiantetema/:page', component: EstudiantetemaComponent },
      { path: 'estudiantetema/form', component: FormestudiantetemaComponent },
      { path: 'estudianteinscripcion', component: EstudianteinscripcionComponent },
      { path: 'estudianteevolucion', component: EstudianteevolucionComponent },
      { path: 'estudianteevoluciondetalle/:id', component: EstudianteevolucionDetalleComponent },
      { path: 'estudianteevoluciondesarrollo/:id', component: EstudianteevolucionDesarrolloComponent },
      { path: 'estudiantehito', component: EstudiantehitoComponent },
      { path: 'estudiantehitodetalle/:id', component: EstudiantehitoDetalleComponent },
      { path: 'estudiantehitodesarrollo/:id', component: EstudiantehitoDesarrolloComponent },
      { path: 'docentetema', component: DocentetemaComponent },
      { path: 'docenteasignacion', component: DocenteasignacionComponent },
      { path: 'docenteevolucion', component: DocenteevolucionComponent },
      { path: 'docenteevoluciondetalle/:id', component: DocenteevoluciondetalleComponent },
      { path: 'docenteevoluciondesarrollo/:id', component: DocenteevoluciondesarrolloComponent },
      { path: 'docentehitodetalle/:id', component: DocentehitodetalleComponent },
      { path: 'docentehitodesarrollo/:id', component: DocentehitodesarrolloComponent },
      { path: 'docentehito', component: DocentehitoComponent },
      { path: 'administradorcorreo', component: AdministradorcorreoComponent },
      { path: 'administradorpermiso', component: AdministradorpermisoComponent },
      { path: 'administradorconfiguracion', component: AdministradorconfiguracionComponent },
      { path: 'utespresolicitud', component: UtespresolicitudComponent },
      { path: 'utespresolicitud/:page', component: UtespresolicitudComponent },
      { path: 'utesasignacion', component: AsignacionComponent },
      { path: 'utesprerevision', component: PrerevisionComponent },
      { path: 'utesaprobar', component: AprobarComponent },
      { path: 'utesresolucion', component: UtesresolucionComponent },
      { path: 'utesresoluciondesarrollo/:id', component: UtesresoluciondesarrolloComponent },
      { path: 'utesprerevisionexamen', component: PrerevisionexamenComponent },
      { path: 'utesconfiguracion', component: UtesconfiguracionComponent },
      { path: 'utesconsulta', component: UtesconsultaComponent },
      { path: 'uteshistorico', component: UteshistoricoComponent }
    ]
  }

];

@NgModule({
  declarations: [
    AppComponent, HeaderComponent,
    LoginComponent, DashboardComponent,
    MenuComponent, FooterComponent,
    AreaComponent, FormareaComponent,
    AreapersonaComponent, FormareapersonaComponent,
    AreatipoComponent, FormComponent,
    AsignadoComponent, FormasignadoComponent,
    ConvocatoriaComponent, FormconvocatoriaComponent,
    CorreoComponent, FormcorreoComponent,
    CuestionarioComponent, FormcuestionarioComponent,
    EvolucionComponent, FormevolucionComponent,
    HistoricoComponent, FormhistoricoComponent,
    HitoComponent, FormhitoComponent,
    InformeComponent, ForminformeComponent,
    InscripcionComponent, ForminscripcionComponent,
    PeriodoComponent, FormperiodoComponent,
    PersonaComponent, FormpersonaComponent,
    PresolicitudComponent, FormpresolicitudComponent,
    ResolucionComponent, FormresolucionComponent,
    RespuestaComponent, FormrespuestaComponent,
    SeleccionComponent, FormseleccionComponent,
    SysconfiguracionComponent, FormsysconfiguracionComponent,
    SyspaginaComponent, FormsyspaginaComponent,
    SyspaginaperfilComponent, FormsyspaginaperfilComponent,
    SysperfilComponent, FormsysperfilComponent,
    SyspermisoComponent, FormsyspermisoComponent,
    SyspropiedadComponent, FormsyspropiedadComponent,
    SysusuarioComponent, FormsysusuarioComponent,
    TemaComponent, FormtemaComponent,
    TipoopcionComponent, FormtipoopcionComponent,
    TiporesolucionComponent, FormtiporesolucionComponent,
    EstudiantetemaComponent, FormestudiantetemaComponent,
    HeroJobAdComponent, HeroProfileComponent, AdDirective, AdDirectivePaginator, AdBannerComponent,
    EstudianteinscripcionComponent, EstudianteinscripcionDialogComponent,
    EstudianteevolucionComponent, EstudianteevolucionDialogComponent,
    EstudianteevolucionDetalleComponent, EstudianteevolucionDesarrolloComponent,
    Estudianteevoluciondialog2Component, EstudianteevoluciondialogeditarComponent,
    EstudiantehitoComponent, EstudiantehitodesarrolloDialogComponent, 
    EstudiantehitoDetalleComponent, EstudiantehitoDesarrolloComponent,
    EstudiantehitodialogComponent, EstudiantehitodialogeditarComponent, 
    PaginatorComponent, 
    DocentetemaComponent, 
    DocenteasignacionComponent, 
    DocenteevolucionComponent, 
    DocentehitoComponent, DocentetemadetalleComponent, 
    AdministradorcorreoComponent, 
    AdministradorpermisoComponent, 
    AdministradorconfiguracionComponent, 
    AdministradorpermisodetalleComponent, 
    UtespresolicitudComponent, 
    AsignacionComponent, 
    PrerevisionComponent, 
    AprobarComponent, 
    PrerevisionexamenComponent, 
    UtesconfiguracionComponent, 
    UtesconsultaComponent, 
    UteshistoricoComponent, 
    UtesresolucionComponent, 
    AsignaciondetalleComponent, 
    DocentetemaeditarComponent, DocenteevoluciondetalleComponent, 
    DocenteevolucionresoluciondialogComponent, 
    DocenteevoluciondesarrolloComponent, 
    DocenteevoluciondialogComponent, 
    DocenteevolucioneditardialogComponent, 
    DocentehitodesarrolloComponent, 
    DocentehitodetalleComponent, 
    DocentehitoresoluciondialogComponent, 
    DocentehitodialogComponent, UtespresolicituddetalledialogComponent, 
    UtespresolicitudvalidarespuestadialogComponent, UtesasignacionrevisordialogComponent, 
    UtesresoluciondetalleComponent, PrerevisionexamendetalleComponent, 
    UtesresoluciondesarrolloComponent, UtesresoluciondialogComponentComponent, 
    UtesresolucionnuevodialogComponent, UtesconfiguracionnewperiodoComponent, 
    UtesconfiguracionnewconvocatoriaComponent, UtesconfiguracionnewinscripcionComponent, UtesconfiguracionnewrequisitoComponent,
    LoginregisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    TableModule,
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload'
    })
  ],
  providers: [
    LoginService,
    UserService,
    AreatipoService,
    AreaService,
    AreapersonaService,
    AsignadoService,
    ConvocatoriaService,
    CorreoService,
    CuestionarioService,
    EvolucionService,
    HistoricoService,
    HitoService,
    InformeService,
    InscripcionService,
    PeriodoService,
    PersonaService,
    PresolicitudService,
    ResolucionService,
    RespuestaService,
    SeleccionService,
    SysconfiguracionService,
    SyspaginaperfilService,
    SyspaginaService,
    SysperfilService,
    SyspermisoService,
    SyspropiedadService,
    SysusuarioService,
    TemaService,
    TipoopcionService,
    TiporesolucionService,
    ReporteService,
    AdService,
    DatePipe
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    PaginatorComponent,
    HeroJobAdComponent,
    HeroProfileComponent,
    EstudianteinscripcionDialogComponent,
    EstudianteevolucionDialogComponent,
    Estudianteevoluciondialog2Component,
    EstudianteevoluciondialogeditarComponent,
    EstudiantehitodialogComponent,
    EstudiantehitodialogeditarComponent,
    EstudiantehitodesarrolloDialogComponent,
    DocentetemadetalleComponent,
    DocentetemaeditarComponent,
    DocenteevolucionresoluciondialogComponent,
    DocenteevoluciondialogComponent,
    DocenteevolucioneditardialogComponent, 
    DocentehitoresoluciondialogComponent, 
    DocentehitodialogComponent,
    AdministradorpermisodetalleComponent,
    UtespresolicitudvalidarespuestadialogComponent,
    UtespresolicituddetalledialogComponent,
    AsignaciondetalleComponent,
    UtesresoluciondetalleComponent,
    PrerevisionexamendetalleComponent,
    UtesasignacionrevisordialogComponent,
    UtesresoluciondialogComponentComponent,
    UtesresolucionnuevodialogComponent,
    UtesconfiguracionnewperiodoComponent,
    UtesconfiguracionnewconvocatoriaComponent,
    UtesconfiguracionnewinscripcionComponent,
    UtesconfiguracionnewrequisitoComponent
  ]
})
export class AppModule { }

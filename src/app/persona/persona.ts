import { Areapersona } from '../areapersona/areapersona';
import { Asignado } from '../asignado/asignado';
import { Tema } from '../tema/tema';
import { Presolicitud } from '../presolicitud/presolicitud';
import { Informe } from '../informe/informe';
import { Resolucion } from '../resolucion/resolucion';
import { Seleccion } from '../seleccion/seleccion';
import { Sysusuario } from '../sysusuario/sysusuario';

export class Persona {
    idPer: number;
    perCedula: String;
    perNombre: String;
    perApellido: String;
    perDireccion: String;
    perTelefono: String;
    perCelular: String;
    perSexo: String;
    perFechaCreado: Date;
    perFechaEditado: Date;

    areaPersonas: Areapersona[];
    asignados: Asignado[];
    temas: Tema[];
    presolicitudes: Presolicitud[];
    informes: Informe[];
    selecciones: Seleccion[];
    resoluciones: Resolucion[];
    sysUsuarios: Sysusuario[];
}
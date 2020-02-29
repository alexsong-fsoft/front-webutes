import { Presolicitud } from '../presolicitud/presolicitud';

export class Inscripcion {
    idIns: number;
    insNombre: String;
    insPeriodo: number;
    insFechaInicio: Date;
    insFechaFin: Date;
    insActivo: Boolean;
    insSecuencia: number;
    file: any;
    presolicitudes: Presolicitud[];
}
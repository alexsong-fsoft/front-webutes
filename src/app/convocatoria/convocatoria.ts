import { Tema } from '../tema/tema';

export class Convocatoria{
    idCon: number;
    conNombre: String;
    conNumeroTema: number;
    conPeriodo: number;
    conFechaInicio: Date;
    conFechaFin: Date;
    conActivo: Boolean;
    conDescripcion: String;
    conSecuencia: number;
    temas: Tema[];
}
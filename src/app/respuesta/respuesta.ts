import { Cuestionario } from '../cuestionario/cuestionario';
import { Presolicitud } from '../presolicitud/presolicitud';

export class Respuesta{
    idRes: number;
    presolicitud: Presolicitud;
    cuestionario: Cuestionario;
    resValor: Boolean;
    resValidacion: Boolean;
    resPrerevision: Boolean;
    
    idPresolicitud: number;
    idCuestionario: number;
}
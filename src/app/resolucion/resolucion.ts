import { Persona } from '../persona/persona';
import { Tema } from '../tema/tema';
import { Tiporesolucion } from '../tiporesolucion/tiporesolucion';

export class Resolucion{
    idRsl: number;
    tipoResolucion: Tiporesolucion;
    persona: Persona;
    tema: Tema;
    rslNumero: String;
    rslFechaResolucion: Date;
    rslFechaInicio: Date;
    rslFechaEntrega: Date;
    rslActivo: Boolean;
    rslObservacion: String;
    rslIdEstado: number;
    idTipoResolucion: number;
    idPersona: number;
    idTema: number;
}
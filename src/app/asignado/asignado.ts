import { Persona } from '../persona/persona';
import { Tema } from '../tema/tema';

export class Asignado {
    idAsg: number;
    persona: Persona;
    tema: Tema;
    asgIdTipo: number;
    asgFechaRegistro: Date;
    asgActivo: Boolean;
    asgIdEstadoTema: number;
    idPersona: number;
    idTema: number;
}
import { Persona } from '../persona/persona';
import { Tema } from '../tema/tema';

export class Informe{
    idInf: number;
    persona: Persona;
    tema: Tema;
    infIdEstado: number;
    infFecha: Date;
    infInforme: String;
    infTema: String;
    infObservacion: String;
    infActivo: Boolean;
    infFechaPlazo: Date;
    idPersona: number;
    idTema: number;
}
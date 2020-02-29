import { Persona } from '../persona/persona';
import { Periodo } from '../periodo/periodo';

export class Seleccion{
    idSel: number;
    persona: Persona;
    periodo: Periodo;
    selHoraAsignada: number;
    selHoraVigente: number;
    selHoraLectura: number;
    idPersona: number;
    IdPeriodo: number;
}
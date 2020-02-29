import { Persona } from '../persona/persona';
import { Respuesta } from '../respuesta/respuesta';
import { Inscripcion } from '../inscripcion/inscripcion';

export class Presolicitud{
    idPsl: number;
    persona: Persona;
    inscripcion: Inscripcion;
    pslIdEstado: number;
    pslIdOpcion: number;
    pslFecha: Date;
    pslMensaje: String;
    pslFechaRevision: Date;
    pslObservacion: String;
    pslPrerevision: String;
    pslFechaPrerevision: Date;
    pslIdEstadoAnterior: number;
    pslActivo: Boolean;
    pslFiles: String;

    idPersona: number;
    idInscripcion: number;
    nombreEstado: String;
    nombreTipo: String;
    
    respuestas: Respuesta[];
}
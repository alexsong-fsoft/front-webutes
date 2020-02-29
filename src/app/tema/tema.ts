import { Persona } from '../persona/persona';
import { Convocatoria } from '../convocatoria/convocatoria';
import { Asignado } from '../asignado/asignado';
import { Evolucion } from '../evolucion/evolucion';
import { Informe } from '../informe/informe';
import { Hito } from '../hito/hito';
import { Resolucion } from '../resolucion/resolucion';

export class Tema{
    idTem: number;
    persona: Persona;
    convocatoria: Convocatoria;
    temIdTipo: number;
    temIdEstado: number;
    temNombre: String;
    temDescripcion: String;
    temTema: String;
    temNumEst: number;
    temAutorA: String;
    temAutorB: String;
    temFechaPublicado: Date;
    temAuspiciante: String;
    temLectorPlan: String;
    temLectorProyecto: String;
    temActivo: Boolean;
    temFechaCreado: Date;
    temFechaEditado: Date;
    temPorcAvance: number;
    temAprobado: Boolean;
    temAlcance: String;
    temObjetivo: String;
    temFechaEnviado: Date;
    temNota: number;
    temObservacion: String;
    temFechaInicio: Date;
    temFechaEntrega: Date;
    temIdPeriodo: number;
    temFechaResolucion: Date;

    idPersona: number;
    idConvocatoria: number;
    nombreEstado: String;
    nombreTipo: String;

    asignados: Asignado[];
    evoluciones: Evolucion[];
    informes: Informe[];
    hitos: Hito[];
    resoluciones: Resolucion[];
}
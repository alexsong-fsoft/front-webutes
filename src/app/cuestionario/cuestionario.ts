import { Respuesta } from '../respuesta/respuesta';

export class Cuestionario{
    idCue: number;
    cueIdTipo: number;
    cueIdInscripcion: number;
    cuePregunta: String;
    cueActivo: Boolean;
    respuestas: Respuesta[];
}
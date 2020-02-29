import { Estaticos } from '../app.constants';

export class Estado {
    id: number;
    titulo: String;
    fase: String;

    constructor(id: number, titulo: String, fase: String) {
        this.id = id;
        this.titulo = titulo;
        this.fase = fase;
    }

    static loadPreTema(): Estado[] {
        return [
            new Estado(Estaticos.ESTADO_TEMA_PRE_CREADO, Estaticos.ESTADO_LABEL_TEMA_CREADO, Estaticos.ESTADO_FASE_PRERESOLUCION),
            new Estado(Estaticos.ESTADO_TEMA_PRE_ENVIADO, Estaticos.ESTADO_LABEL_TEMA_ENVIADO, Estaticos.ESTADO_FASE_PRERESOLUCION),
            new Estado(Estaticos.ESTADO_TEMA_PRE_ASIGNAREVISOR, Estaticos.ESTADO_LABEL_TEMA_ASIGNAREVISOR, Estaticos.ESTADO_FASE_PRERESOLUCION),
            new Estado(Estaticos.ESTADO_TEMA_PRE_REVISION, Estaticos.ESTADO_LABEL_TEMA_ENREVISION, Estaticos.ESTADO_FASE_PRERESOLUCION),
            new Estado(Estaticos.ESTADO_TEMA_PRE_REVISADO, Estaticos.ESTADO_LABEL_TEMA_REVISADO, Estaticos.ESTADO_FASE_PRERESOLUCION),
            new Estado(Estaticos.ESTADO_TEMA_PRE_PUBLICADO, Estaticos.ESTADO_LABEL_TEMA_PUBLICADO, Estaticos.ESTADO_FASE_PRERESOLUCION),
            new Estado(Estaticos.ESTADO_TEMA_PRE_ASIGNAESTUDIANTE, Estaticos.ESTADO_LABEL_TEMA_ASIGNAESTUDIANTE, Estaticos.ESTADO_FASE_PRERESOLUCION),
            new Estado(Estaticos.ESTADO_TEMA_PRE_ASIGNALECTOR, Estaticos.ESTADO_LABEL_TEMA_ASIGNALECTOR, Estaticos.ESTADO_FASE_PRERESOLUCION),
            new Estado(Estaticos.ESTADO_TEMA_PRE_TERMINALECTOR, Estaticos.ESTADO_LABEL_TEMA_TERMINALECTOR, Estaticos.ESTADO_FASE_PRERESOLUCION)
        ];
    }

    static loadPostTema(): Estado[] {
        return [
            new Estado(Estaticos.ESTADO_TEMA_POST_APROBADO, Estaticos.ESTADO_LABEL_TEMA_APROBADO, Estaticos.ESTADO_FASE_POSTRESOLUCION),
            new Estado(Estaticos.ESTADO_TEMA_POST_CERRADO, Estaticos.ESTADO_LABEL_TEMA_CERRADO, Estaticos.ESTADO_FASE_POSTRESOLUCION),
            new Estado(Estaticos.ESTADO_TEMA_POST_ANULADO, Estaticos.ESTADO_LABEL_TEMA_ANULADO, Estaticos.ESTADO_FASE_POSTRESOLUCION),
            new Estado(Estaticos.ESTADO_TEMA_POST_PRORROGA, Estaticos.ESTADO_LABEL_TEMA_PRORROGA, Estaticos.ESTADO_FASE_POSTRESOLUCION),
            new Estado(Estaticos.ESTADO_TEMA_POST_LECTORPROYECTO, Estaticos.ESTADO_LABEL_TEMA_LECTORPROYECTO, Estaticos.ESTADO_FASE_POSTRESOLUCION),
            new Estado(Estaticos.ESTADO_TEMA_POST_CAMBIOTUTOR, Estaticos.ESTADO_LABEL_TEMA_CAMBIOTUTOR, Estaticos.ESTADO_FASE_POSTRESOLUCION),
            new Estado(Estaticos.ESTADO_TEMA_POST_CAMBIOTEMA, Estaticos.ESTADO_LABEL_TEMA_CAMBIOTEMA, Estaticos.ESTADO_FASE_POSTRESOLUCION),
            new Estado(Estaticos.ESTADO_TEMA_POST_RENUNCIAESTUDIANTE, Estaticos.ESTADO_LABEL_TEMA_RENUNCIAESTUDIANTE, Estaticos.ESTADO_FASE_POSTRESOLUCION)
        ];
    }

    static loadPostTemaAccion(): Estado[] {
        return [
            new Estado(Estaticos.ESTADO_TEMA_POST_CERRADO, Estaticos.ESTADO_LABEL_TEMA_CERRADO, Estaticos.ESTADO_FASE_POSTRESOLUCION),
            new Estado(Estaticos.ESTADO_TEMA_POST_ANULADO, Estaticos.ESTADO_LABEL_TEMA_ANULADO, Estaticos.ESTADO_FASE_POSTRESOLUCION),
            new Estado(Estaticos.ESTADO_TEMA_POST_PRORROGA, Estaticos.ESTADO_LABEL_TEMA_PRORROGA, Estaticos.ESTADO_FASE_POSTRESOLUCION),
        ];
    }

    static loadInscripcion(): Estado[] {
        return [
            new Estado(Estaticos.ESTADO_PRESOLICITUD_ENVIADO, Estaticos.ESTADO_LABEL_PRESOLICITUD_ENVIADO, Estaticos.ESTADO_FASE_PRESOLICITUD),
            new Estado(Estaticos.ESTADO_PRESOLICITUD_APROBADO, Estaticos.ESTADO_LABEL_PRESOLICITUD_APROBADO, Estaticos.ESTADO_FASE_PRESOLICITUD),
            new Estado(Estaticos.ESTADO_PRESOLICITUD_ENLISTAESPERA, Estaticos.ESTADO_LABEL_PRESOLICITUD_LISTAESPERA, Estaticos.ESTADO_FASE_PRESOLICITUD),
            new Estado(Estaticos.ESTADO_PRESOLICITUD_NEGADO, Estaticos.ESTADO_LABEL_PRESOLICITUD_NEGADO, Estaticos.ESTADO_FASE_PRESOLICITUD),
            new Estado(Estaticos.ESTADO_PRESOLICITUD_PREREVISADO, Estaticos.ESTADO_LABEL_PRESOLICITUD_REVISIONPREVIA, Estaticos.ESTADO_FASE_PRESOLICITUD),
            new Estado(Estaticos.ESTADO_PRESOLICITUD_FALTA, Estaticos.ESTADO_LABEL_PRESOLICITUD_FALTA, Estaticos.ESTADO_FASE_PRESOLICITUD),
            new Estado(Estaticos.ESTADO_PRESOLICITUD_RENUNCIA, Estaticos.ESTADO_LABEL_PRESOLICITUD_RENUNCIA, Estaticos.ESTADO_FASE_PRESOLICITUD)
        ];
    }

    static loadInscripcionAccion(): Estado[] {
        return [
            new Estado(Estaticos.ESTADO_PRESOLICITUD_APROBADO, Estaticos.ESTADO_LABEL_PRESOLICITUD_APROBADO, Estaticos.ESTADO_FASE_PRESOLICITUD),
            new Estado(Estaticos.ESTADO_PRESOLICITUD_ENLISTAESPERA, Estaticos.ESTADO_LABEL_PRESOLICITUD_LISTAESPERA, Estaticos.ESTADO_FASE_PRESOLICITUD),
            new Estado(Estaticos.ESTADO_PRESOLICITUD_NEGADO, Estaticos.ESTADO_LABEL_PRESOLICITUD_NEGADO, Estaticos.ESTADO_FASE_PRESOLICITUD)
        ];
    }

    static loadInscripcionRevision(): Estado[] {
        return [
            new Estado(Estaticos.ESTADO_PRESOLICITUD_PREREVISADO, Estaticos.ESTADO_LABEL_PRESOLICITUD_REVISIONPREVIA, Estaticos.ESTADO_FASE_PRESOLICITUD),
            new Estado(Estaticos.ESTADO_PRESOLICITUD_FALTA, Estaticos.ESTADO_LABEL_PRESOLICITUD_FALTA, Estaticos.ESTADO_FASE_PRESOLICITUD),
        ];
    }

    static loadEvolucion(): Estado[] {
        return [
            new Estado(Estaticos.ESTADO_EVOLUCION_CREADO, Estaticos.ESTADO_LABEL_EVOLUCION_CREADO, Estaticos.ESTADO_FASE_EVOLUCION),
            new Estado(Estaticos.ESTADO_EVOLUCION_ASISTENCIA, Estaticos.ESTADO_LABEL_EVOLUCION_ASISTENCIA, Estaticos.ESTADO_FASE_EVOLUCION),
            new Estado(Estaticos.ESTADO_EVOLUCION_NOASISTENCIA, Estaticos.ESTADO_LABEL_EVOLUCION_NOASISTENCIA, Estaticos.ESTADO_FASE_EVOLUCION),
            new Estado(Estaticos.ESTADO_EVOLUCION_REAGENDA, Estaticos.ESTADO_LABEL_EVOLUCION_REAGENDA, Estaticos.ESTADO_FASE_EVOLUCION),
        ];
    }

    static loadEvolucionAccion(): Estado[] {
        return [
            new Estado(Estaticos.ESTADO_EVOLUCION_ASISTENCIA, Estaticos.ESTADO_LABEL_EVOLUCION_ASISTENCIA, Estaticos.ESTADO_FASE_EVOLUCION),
            new Estado(Estaticos.ESTADO_EVOLUCION_NOASISTENCIA, Estaticos.ESTADO_LABEL_EVOLUCION_NOASISTENCIA, Estaticos.ESTADO_FASE_EVOLUCION),
            new Estado(Estaticos.ESTADO_EVOLUCION_REAGENDA, Estaticos.ESTADO_LABEL_EVOLUCION_REAGENDA, Estaticos.ESTADO_FASE_EVOLUCION),
        ];
    }

    static loadHito(): Estado[] {
        return [
            new Estado(Estaticos.ESTADO_HITO_CREADO, Estaticos.ESTADO_LABEL_HITO_CREADO, Estaticos.ESTADO_FASE_HITO),
            new Estado(Estaticos.ESTADO_HITO_CUMPLE, Estaticos.ESTADO_LABEL_HITO_CUMPLIDO, Estaticos.ESTADO_FASE_HITO),
            new Estado(Estaticos.ESTADO_HITO_NOCUMPLE, Estaticos.ESTADO_LABEL_HITO_NOCUMPLIDO, Estaticos.ESTADO_FASE_HITO)
        ];
    }

    static loadHitoAccion(): Estado[] {
        return [
            new Estado(Estaticos.ESTADO_HITO_CUMPLE, Estaticos.ESTADO_LABEL_HITO_CUMPLIDO, Estaticos.ESTADO_FASE_HITO),
            new Estado(Estaticos.ESTADO_HITO_NOCUMPLE, Estaticos.ESTADO_LABEL_HITO_NOCUMPLIDO, Estaticos.ESTADO_FASE_HITO)
        ];
    }

    static loadAsignaLector(): Estado[] {
        return [
            new Estado(Estaticos.ESTADO_ID_TEMA_LECTOR_PROCESO, Estaticos.ESTADO_LABEL_TEMA_LECTOR_PROCESO, Estaticos.ESTADO_FASE_ASIGNACION),
            new Estado(Estaticos.ESTADO_ID_TEMA_LECTOR_TERMINADO, Estaticos.ESTADO_LABEL_TEMA_LECTOR_TERMINADO, Estaticos.ESTADO_FASE_ASIGNACION)
        ];
    }

    static loadAsignaRevisor(): Estado[] {
        return [
            new Estado(Estaticos.ESTADO_ID_TEMA_REVISA_PROCESO, Estaticos.ESTADO_LABEL_TEMA_REVISA_PROCESO, Estaticos.ESTADO_FASE_ASIGNACION),
            new Estado(Estaticos.ESTADO_ID_TEMA_REVISA_REVISADO, Estaticos.ESTADO_LABEL_TEMA_REVISA_REVISADO, Estaticos.ESTADO_FASE_ASIGNACION),
            new Estado(Estaticos.ESTADO_ID_TEMA_REVISA_TERMINADO, Estaticos.ESTADO_LABEL_TEMA_REVISA_TERMINADO, Estaticos.ESTADO_FASE_ASIGNACION)
        ];
    }

    static loadPrePostTema(): Estado[] {
        return this.loadPostTema().concat(this.loadPreTema());
    }


    static loadAsignaLectorRevisor(): Estado[] {
        return this.loadAsignaLector().concat(this.loadAsignaRevisor());
        // return [
        //     new Estado(Estaticos.ESTADO_ID_TEMA_LECTOR_PROCESO, Estaticos.ESTADO_LABEL_TEMA_LECTOR_PROCESO, Estaticos.ESTADO_FASE_ASIGNACION),
        //     new Estado(Estaticos.ESTADO_ID_TEMA_LECTOR_TERMINADO, Estaticos.ESTADO_LABEL_TEMA_LECTOR_TERMINADO, Estaticos.ESTADO_FASE_ASIGNACION),
        //     new Estado(Estaticos.ESTADO_ID_TEMA_REVISA_PROCESO, Estaticos.ESTADO_LABEL_TEMA_REVISA_PROCESO, Estaticos.ESTADO_FASE_ASIGNACION),
        //     new Estado(Estaticos.ESTADO_ID_TEMA_REVISA_REVISADO, Estaticos.ESTADO_LABEL_TEMA_REVISA_REVISADO, Estaticos.ESTADO_FASE_ASIGNACION),
        //     new Estado(Estaticos.ESTADO_ID_TEMA_REVISA_TERMINADO, Estaticos.ESTADO_LABEL_TEMA_REVISA_TERMINADO, Estaticos.ESTADO_FASE_ASIGNACION)
        // ];
    }

    static loadRevisorTema(): Estado[] {
        return [
            new Estado(Estaticos.ESTADO_TEMA_PRE_ENVIADO, Estaticos.ESTADO_LABEL_TEMA_ENVIADO, Estaticos.ESTADO_FASE_PRERESOLUCION),
            new Estado(Estaticos.ESTADO_TEMA_PRE_ASIGNAREVISOR, Estaticos.ESTADO_LABEL_TEMA_ASIGNAREVISOR, Estaticos.ESTADO_FASE_PRERESOLUCION),
            new Estado(Estaticos.ESTADO_TEMA_PRE_REVISION, Estaticos.ESTADO_LABEL_TEMA_ENREVISION, Estaticos.ESTADO_FASE_PRERESOLUCION),
            new Estado(Estaticos.ESTADO_TEMA_PRE_REVISADO, Estaticos.ESTADO_LABEL_TEMA_REVISADO, Estaticos.ESTADO_FASE_PRERESOLUCION),
            new Estado(Estaticos.ESTADO_TEMA_PRE_PUBLICADO, Estaticos.ESTADO_LABEL_TEMA_PUBLICADO, Estaticos.ESTADO_FASE_PRERESOLUCION)
        ];
    }

    static loadRevisorInforme(): Estado[] {
        return [
            new Estado(Estaticos.ESTADO_TEMA_PRE_REVISION, Estaticos.ESTADO_LABEL_TEMA_ENREVISION, Estaticos.ESTADO_FASE_PRERESOLUCION),
            new Estado(Estaticos.ESTADO_TEMA_PRE_REVISADO, Estaticos.ESTADO_LABEL_TEMA_REVISADO, Estaticos.ESTADO_FASE_PRERESOLUCION)
        ];
    }


    static listaCedena(listado: Estado[]): String {
        let stbcadena: String = "";
        let cont: number = 0;
        for (let obj of listado) {
            stbcadena = stbcadena + obj.id.toString();
            cont++;
            if (cont < listado.length) {
                stbcadena = stbcadena + ",";
            }
        }
        return stbcadena.toString();
    }

    static getNombreEstadoPorLista(id: number, listaestado: Estado[]): String {
        let data: String = "";
        if (id != 0) {
            for (let estado of listaestado) {
                if (estado.id == id) {
                    data = estado.titulo;
                    break;
                }
            }
        }
        return data;
    }
}
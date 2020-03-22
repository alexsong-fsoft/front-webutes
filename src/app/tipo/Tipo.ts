import { Estaticos } from '../app.constants';

export class Tipo {
    id: number;
    nombre: String;

    constructor(idTipo: number, nombreTipo: String) {
        this.id = idTipo;
        this.nombre = nombreTipo;
    }

    static loadDocumentoAll(): Tipo[] {
        return [
            new Tipo(Estaticos.TIPO_ID_OPCIONTITULACION_PROYECTO, Estaticos.TIPO_LABEL_TITULACION_PROYECTO),
            new Tipo(Estaticos.TIPO_ID_OPCIONTITULACION_ARTICULO, Estaticos.TIPO_LABEL_TITULACION_ARTICULO),
            new Tipo(Estaticos.TIPO_ID_OPCIONTITULACION_EXAMEN, Estaticos.TIPO_LABEL_TITULACION_EXAMEN)
        ];
    }

    static loadDocumento(): Tipo[] {
        return [
            new Tipo(Estaticos.TIPO_ID_OPCIONTITULACION_PROYECTO, Estaticos.TIPO_LABEL_TITULACION_PROYECTO),
            new Tipo(Estaticos.TIPO_ID_OPCIONTITULACION_ARTICULO, Estaticos.TIPO_LABEL_TITULACION_ARTICULO)
        ];
    }

    static getListTipoTema(): Tipo[] {
        return [
            new Tipo(Estaticos.TIPO_ID_OPCIONTITULACION_PROYECTO, Estaticos.TIPO_LABEL_TITULACION_PROYECTO),
            new Tipo(Estaticos.TIPO_ID_OPCIONTITULACION_ARTICULO, Estaticos.TIPO_LABEL_TITULACION_ARTICULO)
        ];
    }

    static loadCuestionario(): Tipo[] {
        return [
            new Tipo(Estaticos.TIPO_ID_CUESTIONARIO_INSCRIPCION, Estaticos.TIPO_LABEL_CUESTIONARIO_INSCRIPCION),
            new Tipo(Estaticos.TIPO_ID_CUESTIONARIO_PREREVISION, Estaticos.TIPO_LABEL_CUESTIONARIO_PREREVISION)
        ];
    }
    
    

    static loadAsignacion(): Tipo[] {
        return [
            new Tipo(Estaticos.TIPO_ID_ASIGNACION_REVISOR, Estaticos.TIPO_LABEL_ASIGNACION_REVISOR),
            new Tipo(Estaticos.TIPO_ID_ASIGNACION_ESTUDIANTE, Estaticos.TIPO_LABEL_ASIGNACION_ESTUDIANTE),
            new Tipo(Estaticos.TIPO_ID_ASIGNACION_LECTORPLAN, Estaticos.TIPO_LABEL_ASIGNACION_LECTORPLAN),
            new Tipo(Estaticos.TIPO_ID_ASIGNACION_LECTORPROYECTO, Estaticos.TIPO_LABEL_ASIGNACION_LECTORPROYECTO)
        ];
    }

    static getNombreTipoPorLista(id: number, listatipo: Tipo[]): String {
        let data: String = "";
        if (id != 0) {
            for (let estado of listatipo) {
                if (estado.id == id) {
                    data = estado.nombre;
                    break;
                }
            }
        }
        return data;
    }
}
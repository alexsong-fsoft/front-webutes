import { DatePipe } from '@angular/common';

export class Estaticos {
    static readonly UTES_SITIO_SIGLAS = 'CUTS';
    static readonly UTES_SITIO_TITULO = 'COORDINACI\u00d3N DE LA UNIDAD DE TITULACI\u00d3N INGENIER\u00cdA DE SISTEMAS QUITO';
    static readonly UTES_SITIO_PIE = 'Universidad Polit\u00e9cnica Salesiana \u00a9 2016 ';
    static readonly UTES_SITIO_MENU = 'Navegaci\u00f3n';
    static readonly UTES_SITIO_UNIVERSIDAD = 'UNIVERSIDAD POLIT\u00c9CNICA SALESIANA';
    static readonly MENSAJE_OK_REGISTRA = 'El registro se realiz\u00f3 correctamente.';
    static readonly MENSAJE_OK_ACTUALIZA = 'Los datos se han actualizado correctamente.';
    static readonly MENSAJE_OK_ELIMINA = 'Los datos se han eliminado correctamente.';
    static readonly MENSAJE_RESOLUCION_ANULA = 'Se ha realizado la anulaci\u00f3n del tema';
    static readonly MENSAJE_ERROR_REGISTRA = 'No se pudo realizar el registro.';
    static readonly MENSAJE_ERROR_ACTUALIZA = 'No se pudieron actualizar los datos.';
    static readonly MENSAJE_ERROR_ELIMINA = 'No se puede eliminar debido a que tiene relaci\u00f3n con otros datos.';
    static readonly MENSAJE_ERROR_EXISTE = 'El registro ya existe';
    static readonly MENSAJE_ERROR_EXISTE_CONVOCATORIA = 'No existe una convocatoria habilitada.';
    static readonly MENSAJE_ERROR_SELECCION = 'No se puede realizar el proceso debido que no se ha seleccionado un elemento.';
    static readonly MENSAJE_ERROR_REGISTRA_CERO = 'No se puede registrar valores en 0.';
    static readonly MENSAJE_ERROR_REGISTRA_BLANCO = 'No se puede registrar valores en blanco.';
    static readonly MENSAJE_ERROR_EXEDIDO = 'No se puede proceder, excedi\u00f3 el l\u00edmite.';
    static readonly MENSAJE_ERROR_NOMISMO = 'No se puede asignar debido a que es el tutor del tema.';
    static readonly MENSAJE_ERROR_DATORELACION = 'No se puede proceder, debido a a que el registro tiene relaci\u00f3n con otra tabla.';
    static readonly MENSAJE_ERROR_NOPERIODO = 'No existe un periodo habilitado.';
    static readonly MENSAJE_CONFIRMA_PREGUNTA = 'Seguro de seguir con el proceso?';
    static readonly MENSAJE_LOGIN_INICIO = 'Bienvenido';
    static readonly MENSAJE_LOGIN_TITULO = 'Logeo';
    static readonly MENSAJE_LOGIN_ERROR = 'Usuario y/o Clave es incorrecto.';
    static readonly MENSAJE_LOGIN_ERROR_CLAVE = 'Clave actual es incorrecta.';
    static readonly MENSAJE_CUENTA_TITULO = 'Cuenta';
    static readonly LABEL_TABLA_VACIA = 'Ning\u00fan dato encontrado con el criterio ingresado.';
    static readonly LABEL_SELECCIONE_VACIO = 'Seleccione';
    static readonly LABEL_SELECCIONE_TODOS = 'Todos';
    static readonly LABEL_SELECCIONE_FILTRO = 'Todos';
    static readonly MENSAJE_VALIDA_CUMPLE = 'Cumple con los requisitos';
    static readonly MENSAJE_VALIDA_NOCUMPLE = 'No cumple con los requisitos';
    static readonly TIPO_PRIMERO_LABEL = 'PRIMER NIVEL';
    static readonly TIPO_PRIMERO_LETRA = 'P';
    static readonly TIPO_SEGUNDO_LABEL = 'SEGUNDO NIVEL';
    static readonly TIPO_SEGUNDO_LETRA = 'S';
    static readonly TIPO_TERCERO_LABEL = 'TERCER NIVEL';
    static readonly TIPO_TERCERO_LETRA = 'T';
    static readonly TIPO_ID_CUESTIONARIO_INSCRIPCION = 220;
    static readonly TIPO_ID_CUESTIONARIO_PREREVISION = 221;
    static readonly TIPO_ID_ASIGNACION_REVISOR = 210;
    static readonly TIPO_ID_ASIGNACION_LECTORPLAN = 212;
    static readonly TIPO_ID_ASIGNACION_LECTORPROYECTO = 213;
    static readonly TIPO_ID_ASIGNACION_ESTUDIANTE = 211;
    static readonly TIPO_LABEL_ASIGNACION_REVISOR = 'REVISOR TEMA';
    static readonly TIPO_LABEL_ASIGNACION_LECTORPLAN = 'LECTOR PLAN';
    static readonly TIPO_LABEL_ASIGNACION_LECTORPROYECTO = 'LECTOR PROYECTO';
    static readonly TIPO_LABEL_ASIGNACION_ESTUDIANTE = 'ESTUDIANTE ASIGNADO';
    static readonly TIPO_LABEL_PERFIL_ESTUDIANTE = 'ESTUDIANTE';
    static readonly TIPO_LABEL_PERFIL_DOCENTE = 'DOCENTE';
    static readonly TIPO_LABEL_PERFIL_UNIDAD = 'CUTS';
    static readonly TIPO_ID_OPCIONTITULACION_PROYECTO = 300;
    static readonly TIPO_ID_OPCIONTITULACION_ARTICULO = 301;
    static readonly TIPO_ID_OPCIONTITULACION_EXAMEN = 302;
    static readonly ESTADO_PRESOLICITUD_ENVIADO = 1;
    static readonly ESTADO_PRESOLICITUD_APROBADO = 2;
    static readonly ESTADO_PRESOLICITUD_ENLISTAESPERA = 3;
    static readonly ESTADO_PRESOLICITUD_NEGADO = 4;
    static readonly ESTADO_PRESOLICITUD_PREREVISADO = 5;
    static readonly ESTADO_PRESOLICITUD_FALTA = 6;
    static readonly ESTADO_PRESOLICITUD_RENUNCIA = 7;
    static readonly ESTADO_TEMA_PRE_CREADO = 20;
    static readonly ESTADO_TEMA_PRE_ENVIADO = 21;
    static readonly ESTADO_TEMA_PRE_ASIGNAREVISOR = 22;
    static readonly ESTADO_TEMA_PRE_REVISION = 23;
    static readonly ESTADO_TEMA_PRE_REVISADO = 24;
    static readonly ESTADO_TEMA_PRE_PUBLICADO = 25;
    static readonly ESTADO_TEMA_PRE_ASIGNAESTUDIANTE = 26;
    static readonly ESTADO_TEMA_PRE_ASIGNALECTOR = 27;
    static readonly ESTADO_TEMA_PRE_TERMINALECTOR = 28;
    static readonly ESTADO_TEMA_PRE_ASIGNA_ESTUDIANTE = 110;
    static readonly ESTADO_TEMA_PRE_ASIGNA_LECTORPLAN = 111;
    static readonly ESTADO_TEMA_PRE_ASIGNA_LECTORPROYECTO = 112;
    static readonly ESTADO_ID_TEMA_LECTOR_PROCESO = 130;
    static readonly ESTADO_ID_TEMA_LECTOR_TERMINADO = 131;
    static readonly ESTADO_LABEL_TEMA_LECTOR_PROCESO = 'Asignado';
    static readonly ESTADO_LABEL_TEMA_LECTOR_TERMINADO = 'Terminado';
    static readonly ESTADO_ID_TEMA_REVISA_PROCESO = 140;
    static readonly ESTADO_ID_TEMA_REVISA_REVISADO = 141;
    static readonly ESTADO_ID_TEMA_REVISA_TERMINADO = 142;
    static readonly ESTADO_LABEL_TEMA_REVISA_PROCESO = 'En revisi\u00f3n';
    static readonly ESTADO_LABEL_TEMA_REVISA_REVISADO = 'Revisado';
    static readonly ESTADO_LABEL_TEMA_REVISA_TERMINADO = 'Terminado';
    static readonly ESTADO_TEMA_POST_APROBADO = 40;
    static readonly ESTADO_TEMA_POST_CERRADO = 41;
    static readonly ESTADO_TEMA_POST_ANULADO = 42;
    static readonly ESTADO_TEMA_POST_PRORROGA = 43;
    static readonly ESTADO_TEMA_POST_LECTORPROYECTO = 44;
    static readonly ESTADO_TEMA_POST_CAMBIOTUTOR = 45;
    static readonly ESTADO_TEMA_POST_CAMBIOTEMA = 46;
    static readonly ESTADO_TEMA_POST_RENUNCIAESTUDIANTE = 47;
    static readonly ESTADO_EVOLUCION_CREADO = 60;
    static readonly ESTADO_EVOLUCION_ASISTENCIA = 61;
    static readonly ESTADO_EVOLUCION_NOASISTENCIA = 62;
    static readonly ESTADO_EVOLUCION_REAGENDA = 63;
    static readonly ESTADO_LABEL_EVOLUCION_CREADO = 'Creado';
    static readonly ESTADO_LABEL_EVOLUCION_ASISTENCIA = 'Asistencia';
    static readonly ESTADO_LABEL_EVOLUCION_NOASISTENCIA = 'No asistencia';
    static readonly ESTADO_LABEL_EVOLUCION_REAGENDA = 'Agendar nueva cita';
    static readonly ESTADO_HITO_CREADO = 80;
    static readonly ESTADO_HITO_CUMPLE = 81;
    static readonly ESTADO_HITO_NOCUMPLE = 82;
    static readonly ESTADO_RESOLUCION_CREADO = 100;
    static readonly ESTADO_RESOLUCION_PROCESADO = 101;
    static readonly CONFIG_TEMA_ENVIADO = 'TEMA_ENVIADO';
    static readonly CONFIG_ASIGNA_TEMAREVISOR = 'ASIGNA_TEMAREVISOR';
    static readonly CONFIG_TEMA_INFORMEAUTOR = 'TEMA_INFORMEAUTORr';
    static readonly CONFIG_TEMA_PUBLICACIONAUTOR = 'TEMA_PUBLICACIONAUTOR';
    static readonly CONFIG_ASIGNA_TEMAESTUDIANTE = 'ASIGNA_TEMAESTUDIANTE';
    static readonly CONFIG_DESVINCULA_TEMAESTUDIANTE = 'DESVINCULA_TEMAESTUDIANTE';
    static readonly CONFIG_ASIGNA_LECTORPLANESTUDIANTE = 'ASIGNA_LECTORPLANESTUDIANTE';
    static readonly CONFIG_ASIGNA_LECTORPLANAUTOR = 'ASIGNA_LECTORPLANAUTOR';
    static readonly CONFIG_ASIGNA_LECTORPLANLECTOR = 'ASIGNA_LECTORPLANLECTOR';
    static readonly CONFIG_RESOLUCION_AUTOR = 'RESOLUCION_DOCENTE';
    static readonly CONFIG_RESOLUCION_ESTUDIANTE = 'RESOLUCION_ESTUDIANTE';
    static readonly CONFIG_RESOLUCION_LECTOR = 'RESOLUCION_LECTOR';
    static readonly CONFIG_RESOLUCION_NUEVOAUTOR = 'RESOLUCION_NUEVOAUTOR';
    static readonly ESTADO_LABEL_TEMA_CREADO = 'En Creación';
    static readonly ESTADO_LABEL_TEMA_ENVIADO = 'Enviado';
    static readonly ESTADO_LABEL_TEMA_ASIGNAREVISOR = 'Asignado';
    static readonly ESTADO_LABEL_TEMA_ENREVISION = 'En Revisión';
    static readonly ESTADO_LABEL_TEMA_REVISADO = 'Revisado';
    static readonly ESTADO_LABEL_TEMA_PUBLICADO = 'Publicado';
    static readonly ESTADO_LABEL_TEMA_ASIGNAESTUDIANTE = 'Asignado estudiante(s), Elaborar plan';
    static readonly ESTADO_LABEL_TEMA_ASIGNALECTOR = 'Asignado lector de plan';
    static readonly ESTADO_LABEL_TEMA_TERMINALECTOR = 'Lectura plan terminada';
    static readonly ESTADO_FASE_PRERESOLUCION = 'PRE RESOLUCIÓN';
    static readonly ESTADO_FASE_POSTRESOLUCION = 'POST RESOLUCIÓN';
    static readonly ESTADO_FASE_PRESOLICITUD = 'PRESOLICITUD';
    static readonly ESTADO_FASE_EVOLUCION = 'EVOLUCIÓN';
    static readonly ESTADO_FASE_HITO = 'HITO';
    static readonly ESTADO_FASE_ASIGNACION = 'ASIGNACIÓN';
    static readonly ESTADO_FASE_REVISOR = 'REVISIÓN';
    static readonly TIPO_LABEL_TITULACION_PROYECTO = 'Proyecto Técnico';
    static readonly TIPO_LABEL_TITULACION_ARTICULO = 'Artículo Académico';
    static readonly TIPO_LABEL_TITULACION_EXAMEN = 'Examen complexivo';
    static readonly ESTADO_LABEL_PRESOLICITUD_ENVIADO = 'En revisión';
    static readonly ESTADO_LABEL_PRESOLICITUD_APROBADO = 'Aprobado';
    static readonly ESTADO_LABEL_PRESOLICITUD_LISTAESPERA = 'Aprobado - Lista espera';
    static readonly ESTADO_LABEL_PRESOLICITUD_NEGADO = 'Negado';
    static readonly ESTADO_LABEL_PRESOLICITUD_REVISIONPREVIA = 'Revisión previa';
    static readonly ESTADO_LABEL_PRESOLICITUD_FALTA = 'Sin revisión previa';
    static readonly ESTADO_LABEL_PRESOLICITUD_RENUNCIA = 'Renuncia';
    static readonly ESTADO_LABEL_TEMA_APROBADO = 'Aprobado';
    static readonly ESTADO_LABEL_TEMA_CERRADO = 'Finalización de proyecto';
    static readonly ESTADO_LABEL_TEMA_ANULADO = 'Anulado';
    static readonly ESTADO_LABEL_TEMA_PRORROGA = 'Prórroga';
    static readonly ESTADO_LABEL_TEMA_LECTORPROYECTO = 'Asignado Lector Proyecto';
    static readonly ESTADO_LABEL_TEMA_CAMBIOTUTOR = 'Cambio tutor';
    static readonly ESTADO_LABEL_TEMA_CAMBIOTEMA = 'Cambio tema';
    static readonly ESTADO_LABEL_TEMA_RENUNCIAESTUDIANTE = 'Renuncia estudiante';
    static readonly ESTADO_LABEL_HITO_CREADO = 'Creado';
    static readonly ESTADO_LABEL_HITO_CUMPLIDO = 'Cumplido';
    static readonly ESTADO_LABEL_HITO_NOCUMPLIDO = 'Retraso';
    static readonly TIPO_LABEL_CUESTIONARIO_INSCRIPCION = 'INSCRIPCIÓN';
    static readonly TIPO_LABEL_CUESTIONARIO_PREREVISION = 'REVISIÓN PREVIA';

    static readonly PERSONAID_ESTUDIANTE = 161;  //42 tiene tema - 161 no tiene
    static readonly PERSONACEDULA_ESTUDIANTE = '1714075916'; //1802727485 tiene - 1714075916 no tiene
    static readonly FORMAT_DATE = 'dd-MM-yyyy';
    static readonly FORMAT_DATE_PATH = 'yyyy-MM-dd';
}

export function stringSplit(string: string, separator: string = '/'): any {
    return string.split(separator);
}

export function parseDate(dateString: string): Date {
    console.log(dateString);
    if (dateString) {
        var d = new Date(dateString);
        d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
        return d;
    }
    return null;
}

export function parseDateToString(date: Date): String{
    let datepipe: DatePipe;
    return datepipe.transform(date, 'dd/MM/yyyy');
}

export function reporteDownload(x: any, nameDocDownload: string): void {
    // It is necessary to create a new blob object with mime-type explicitly set
    // otherwise only Chrome works like it should
    var newBlob = new Blob([x], { type: "application/pdf" });

    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
    }

    // For other browsers: 
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(newBlob);

    var link = document.createElement('a');
    link.href = data;
    link.download = nameDocDownload;
    // this is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

    setTimeout(function () {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
        link.remove();
    }, 100);
}
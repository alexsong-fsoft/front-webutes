import { Persona } from '../persona/persona';
import { Sysperfil } from '../sysperfil/sysperfil';

export class Sysusuario{
    idUsr: number;
    persona: Persona;
    sysPerfil: Sysperfil;
    usrUsuario: String;
    usrClave: String;
    usrCorreo: String;
    usrActivo: Boolean;
    usrFechaCreado: Date;
    usrFechaEditado: Date;
    idPersona: number;
    idSysPerfil: number;
}
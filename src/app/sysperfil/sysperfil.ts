import { Sysusuario } from '../sysusuario/sysusuario';
import { Syspaginaperfil } from '../syspaginaperfil/syspaginaperfil';
import { Syspermiso } from '../syspermiso/syspermiso';

export class Sysperfil{
    idPrf: number;
    prfNombre: String;
    prfActivo: Boolean;
    sysPaginaPerfiles: Syspaginaperfil[];
    sysPermisos: Syspermiso[];
    sysUsuarios: Sysusuario[];
}
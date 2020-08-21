import { Component, OnInit } from '@angular/core';
import { Persona } from '../persona/persona';
import { Sysusuario } from '../sysusuario/sysusuario';
import { Sysperfil } from '../sysperfil/sysperfil';
import { Estaticos } from 'src/app/app.constants';
import swal from 'sweetalert2';
import Lang from '../../assets/app.lang.json';
import { SysperfilService } from '../sysperfil/sysperfil.service';
import { SysusuarioService } from '../sysusuario/sysusuario.service';
import { LoginRegister } from '../sysusuario/LoginRegister';

@Component({
  selector: 'app-loginregister',
  templateUrl: './loginregister.component.html'
})
export class LoginregisterComponent implements OnInit {
  private persona: Persona = new Persona();
  private sysusuario: Sysusuario = new Sysusuario();
  private confirmclave: string = "";
  private idperfil; string = null;

  constructor(private sysusuarioService: SysusuarioService) { }

  ngOnInit() {
  }

  public saveAll(): void {

    try {
      

      if (this.persona.perNombre == "" || this.persona.perApellido == "") {
        swal.fire(Lang.messages.register_new, "No se puede almacenar registro en blanco", 'error');
      } else {

        if (this.persona.perCedula != null) {
          let loginRegister = new LoginRegister();
          loginRegister.persona = this.persona;
          loginRegister.sysUsuario = this.sysusuario;
          this.sysusuarioService.loginRegisterUsuario(loginRegister).subscribe(
            (response) => {
              if (response) {
                swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'success');

              } else{
                swal.fire(Lang.messages.register_new, Lang.messages.register_created, 'error');
              }
            }
          )

        }
      }

    } catch (error) {
      console.error('Here is the error message', error);
    }

  }

}
